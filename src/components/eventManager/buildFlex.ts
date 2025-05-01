import addUserEvent from "./addUserEvent";
import { Calendar, calEvent, Flex,Preferences } from "./eventType";

type Duration=
{
    startTime:number,
    endTime:number
}

export default function buildFlex(flex:Flex, preferences:Preferences, eventList:calEvent[], calendar:Calendar)
{
    const current = new Date();
    //Determine what days currently have events
    const usedDates = generateUsedDates(eventList);
    //Determine the number of days to complete a given task, and calculate the required sessions
    const daysRemaining = ((flex.deadline.getTime()-current.getTime())/(1000*60*60*24))-1;
    const requiredSessions = flex.timeToComplete/preferences.lengthPref;
    var sessionsPerDay = requiredSessions/daysRemaining;
    var assigned = 0;
    var nextEvent = 0;
    //Work starts on next available day
    current.setDate(current.getDate()+1);
    while(assigned < requiredSessions)
    {
        nextEvent+=sessionsPerDay;
        if(nextEvent > 0)
        {
            addFlexEvent(usedDates,preferences,current,nextEvent,flex,calendar);
            nextEvent = nextEvent%1;
        }
        current.setDate(current.getDate()+1);
    }
}


async function addFlexEvent(usedDates:Duration[], 
    preferences:Preferences, date:Date, requiredSessions:number, flex:Flex, calendar:Calendar)
{
    //Start at the preferred start time for the preferred duration
    var available = false;
    var timeArr = getTimeArray(preferences.startPref);
    date.setHours(timeArr[0]);
    date.setMinutes(timeArr[1]);
    date.setSeconds(timeArr[2]);
    var duration = preferences.lengthPref*60;
    var eventDuration:Duration = {startTime:date.getTime(),endTime:date.getTime()+duration};
    for(let i = 0; i < requiredSessions; i++)
    {
        available = false;
        while(available)
        {
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
                    startTime:date,
                    duration:calcDurationString(preferences.lengthPref),
                    repeatLength:0
                }
                await addUserEvent(event,false);
            }
            else
            {
                //Increment by 15 minutes and try again
                date.setMinutes(date.getMinutes()+15);
            }
        }
        //Increment by the duration and break amount
        date.setMinutes(date.getMinutes()+duration+preferences.breakPref);
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
    return (+durArray[0])*3600 + (+durArray[1])*60 + (+durArray[2]);//Hours,minutes,seconds, converted to seconds
}

function calcDurationString(duration:number)
{
    var mins = duration
    var hours = Math.floor(duration/60);
    mins = duration%60;
    return hours+":"+mins+":00";
}
function checkIfAvailable(usedDates:Duration[],testTime:Duration)
{
    for(let i = 0; i < usedDates.length; i++)
    {
        //Start time within another event
        if((testTime.startTime <= usedDates[i].startTime) && (testTime.startTime >= usedDates[i].endTime)) return false;
        //End time within another event
        if((testTime.endTime <= usedDates[i].startTime) && (testTime.endTime >= usedDates[i].endTime)) return false;
        //Event within tested time
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

export function partialBuild(flex:Flex, sessionsToAdd:number, eventList:calEvent[],preferences:Preferences, cal:Calendar)
{
    //add to day before deadline. can be improved
    const deadline = flex.deadline;
    const usedDates = generateUsedDates(eventList);
    const beforeDeadline = new Date(deadline.getFullYear(),deadline.getMonth(),deadline.getDate());
    addFlexEvent(usedDates,preferences,beforeDeadline,sessionsToAdd,flex,cal);
}