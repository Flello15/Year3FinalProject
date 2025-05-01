'use server';
import addEvent from "@/api/mysql/adders/addEvent";
import {calEvent} from "./eventType";
import propogateRepeat from "./propogateRepeat";
export default async function addUserEvent(event:calEvent, propogate:boolean)
{
    const startSQLDate = event.startTime.toISOString().slice(0, 19).replace('T', ' ');
    const res = await addEvent(event.calendarID,event.eventType,startSQLDate,event.duration,event.name,event.description,
        event.repeatLength);
    //Propogate the event
    if(event.eventType == 1 && propogate)
    {
        await propogateRepeat(event);
    }

}