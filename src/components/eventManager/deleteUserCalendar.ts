'use server'
import deleteCalendar from "@/api/mysql/deleters/deleteCalendar";
import deleteEventsByCal from "@/api/mysql/deleters/deleteEventsByCal";
import {Calendar, calEvent} from "./eventType";

export default async function deleteUserCalendar(calendar:Calendar, eventList:calEvent[], userID:string)
{
    //Delete all events associated with the calendar, then delete the calendar
    await deleteEventsByCal(calendar.calendarID);
    await deleteCalendar(calendar.calendarID, userID);
        //Delete all events from the calendar
        for(let i = 0; i < eventList.length; i++)
        {
            if(eventList[i].calendarID == calendar.calendarID)
            {
                eventList.splice(i,1);
            }
        }
        return eventList;
}