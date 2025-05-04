'use server'
import addUserEvent from "./addUserEvent";
import addFlex from "@/api/mysql/adders/addFlex"
import { Calendar, calEvent, Flex,Preferences } from "./eventType";

type Duration=
{
    startTime:number,
    endTime:number
}

export default async function buildFlex(userID:string, flex:Flex, preferences:Preferences, eventList:calEvent[], calendar:Calendar)
{
    
    const current = new Date();
    //Do not create an event if the deadline has already passed
    if(current.getTime() > flex.deadline.getTime()) return;
    //Determine what days currently have events
    const usedDates = generateUsedDates(eventList);
    //Determine the number of days to complete a given task, and calculate the required sessions
    const daysRemaining = Math.floor((flex.deadline.getTime()-current.getTime())/(1000*60*60*24))-1;
    const requiredSessions = (flex.timeToComplete*60*60)/generateDuration(preferences.lengthPref);
    var sessionsPerDay = requiredSessions/daysRemaining;
    var assigned = 0;
    var nextEvent = 0;
    
    //create a new flex event and get its ID
    const deadlineSQLDate = flex.deadline.toISOString().slice(0, 19).replace('T', ' ');
    const res = await addFlex(userID,flex.timeToComplete,deadlineSQLDate,flex.name);
    flex.flexID = res.insertId;
    //Work starts on next available day
    current.setDate(current.getDate()+1);
    do
    {
        nextEvent+=sessionsPerDay;
        if(nextEvent >= 1)
        {
            await addFlexEvent(usedDates,preferences,current,Math.floor(nextEvent),flex,calendar);
            //Add the number of added events to the total, and reset the count to next event
            assigned += Math.floor(nextEvent);
            nextEvent = nextEvent%1;
        }
        current.setDate(current.getDate()+1);
    }while(assigned < requiredSessions);
}


async function addFlexEvent(usedDates:Duration[], 
    preferences:Preferences, date:Date, requiredSessions:number, flex:Flex, calendar:Calendar)
{
    //Start at the preferred start time for the preferred duration
    var available = false;
    var timeArr = getTimeArray(preferences.startPref);
    var tempDate = new Date();
    tempDate.setDate(date.getDate());
    tempDate.setMonth(date.getMonth());
    tempDate.setFullYear(date.getFullYear());
    tempDate.setHours(timeArr[0]);
    tempDate.setMinutes(timeArr[1]-date.getTimezoneOffset());
    tempDate.setSeconds(timeArr[2]);
    var duration = generateDuration(preferences.lengthPref);
    var eventDuration:Duration;
    for(let i = 0; i < requiredSessions; i++)
    {
        available = false;
        while(!available)
        {
            eventDuration={startTime:tempDate.getTime(),endTime:tempDate.getTime()+duration}
            if(checkIfAvailable(usedDates,eventDuration))
            {
                available = true;
                //Add event
                var event:calEvent=
                {
                    eventID:-1,
                    calendarID:calendar.calendarID,
                    eventType:2,
                    name:flex.name,
                    description:"",
                    startTime:tempDate,
                    duration:preferences.lengthPref,
                    repeatLength:0
                }
                await addUserEvent(event,false, flex.flexID);
            }
            else
            {
                //Increment by 15 minutes and try again
                tempDate.setMinutes(tempDate.getMinutes()+15);
            }
        }
        //Increment by the duration and break amount
        tempDate.setMinutes(tempDate.getMinutes()+duration+generateDuration(preferences.breakPref));
    }
}

function generateUsedDates(eventList:calEvent[])
{
    var dateArray:Duration[] = [];

    for(var i = 0; i < eventList.length; i++)
    {
        const eventTime = eventList[i].startTime.getTime();
        dateArray.push({startTime:eventTime, endTime:(eventTime+generateDuration(eventList[i].duration))});
    }
    return dateArray;
}

function generateDuration(duration:String)
{
    var durArray = duration.split(":");
    return (+durArray[0])*3600 + (+durArray[1]*60*60) + (+durArray[2]*60);//Hours,minutes,seconds, converted to seconds
}

/*function calcDurationString(duration:number)
{
    var mins = duration
    var hours = Math.floor(duration/60);
    mins = duration%60;
    return hours+":"+mins+":00";
}*/
function checkIfAvailable(usedDates:Duration[],testTime:Duration)
{
    for(let i = 0; i < usedDates.length; i++)
    {
        //Start time within another event
        if((testTime.startTime >= usedDates[i].startTime) && (testTime.startTime <= usedDates[i].endTime)) return false;
        //End time within another event
        if((testTime.endTime >= usedDates[i].startTime) && (testTime.endTime <= usedDates[i].endTime)) return false;
        //Event within tested time
        if((testTime.startTime <= usedDates[i].startTime) && (testTime.endTime >= usedDates[i].endTime)) return false;
        if((testTime.startTime >= usedDates[i].startTime) && (testTime.endTime <= usedDates[i].endTime)) return false;
    }
    return true;
}

function getTimeArray(timeStr:String)
{
    var timeNumArr:number[] = [];
    const timeStrArr = timeStr.split(":");
    timeNumArr[0] = +timeStrArr[0];
    timeNumArr[1] = +timeStrArr[1];
    timeNumArr[2] = +timeStrArr[2];
    return timeNumArr;
}

export async function partialBuild(flex:Flex, sessionsToAdd:number, eventList:calEvent[],preferences:Preferences, cal:Calendar)
{
    console.log("Trying");
    //add to day before deadline. can be improved
    const deadline = flex.deadline;

    //Do not create a new event if after the deadline
    if((new Date()).getTime() > deadline.getTime())
    {
        return;
    }
    repairDates(eventList)
    const usedDates = generateUsedDates(eventList);
    const beforeDeadline = new Date(deadline.getFullYear(),deadline.getMonth(),deadline.getDate());
    addFlexEvent(usedDates,preferences,beforeDeadline,sessionsToAdd,flex,cal);
}

function repairDates(eventList:calEvent[])
{
    for(let i =0; i < eventList.length; i++)
    {
        eventList[i].startTime = new Date(eventList[i].startTime);
    }
}