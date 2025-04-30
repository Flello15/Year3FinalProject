'use server'
import deleteEvent from "@/api/mysql/deleters/deleteEvent";
import {calEvent} from "./eventType";
import { cookies } from "next/headers";

export default async function deleteCalEvent(event:calEvent, eventList:calEvent[], destroyFlex:boolean)
{
    const cookieStore = await cookies();
    //Check if flex type, and not destroying full flex
    if(event.eventType == 2 && !destroyFlex)
    {
        //Call alter flex with the duration
    }

    //Delete the event from the database
    await deleteEvent(event.eventID);

    //delete the event from the event array, and update the cookies
    const eventIndex = getIndex(event,eventList);
    if(eventIndex > -1)
    {
        eventList.splice(eventIndex,1);
        cookieStore.set({name:"events",value:JSON.stringify(eventList)});
    }
    return eventList;
}

function getIndex(event:calEvent, eventList:calEvent[])
{
    for(let i = 0; i < eventList.length; i++)
    {
        if(eventList[i].eventID == event.eventID)
        {
            return i;
        }
    }
    return -1;
}