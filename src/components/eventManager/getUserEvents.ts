//Handles database calls for all calendars and events related to users
import getCalendars from "@/api/mysql/getters/getCalendars";
import getEvents from "@/api/mysql/getters/getEvents";
import { Calendar, calEvent } from "./eventType";

export default async function getUserEvents(userID:String)
{
    //Get all calendars associated with the user
    const calArr = await getUserCalendars(userID);
    const eventArr:calEvent[] = [];
    for(let i = 0; i < calArr.length; i++)
    {
        //Get all events associated with all calendars
        var eventRes = await(getEvents(calArr[i].calendarID))
        for(let j = 0; j < eventRes.length; j++)
        {
            eventArr.push(convertEvent(eventRes[j],calArr[i]))
        }
    }
    return eventArr;
}


async function getUserCalendars(userID:String)
{
    //Get JSON response
    var calRes = await getCalendars(userID)
    const calArr:Calendar[] =[]
    for(let i = 0; i < calRes.length; i++)
    {
        calArr.push(convertCalendar(calRes[i]))
    }
    return calArr;
}

function convertCalendar(calJSON: any)
{
    //Convert the JSON responce into a calendar type
    const cal:Calendar = 
    {
        calendarID: calJSON.calendarID,
        name:calJSON.calName,
        permissions:calJSON.permissions,
        visible:true
    };
    return cal;
}

function convertEvent(eventJSON: any, calendar:Calendar)
{
    const event:calEvent =
    {
        eventID:eventJSON.eventID,
        calendarID:calendar.calendarID,
        eventType:eventJSON.eventType,
        name:eventJSON.title,
        description:eventJSON.description,
        startTime:new Date(eventJSON.startTime),
        duration:eventJSON.duration,
        repeatLength:eventJSON.repeatLength
    }

    return event
}

//var events = await getUserEvents("testname")
//console.log(events[0].startTime.getDate());