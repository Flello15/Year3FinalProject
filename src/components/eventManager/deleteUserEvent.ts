import deleteEvent from "@/api/mysql/deleters/deleteEvent";
import {calEvent} from "./eventType";

export default async function deleteCalEvent(event:calEvent, eventList:calEvent[], destroyFlex:boolean)
{
    //Check if flex type, and not destroying full flex
    if(event.eventType == 2 && !destroyFlex)
    {
        //Call alter flex with the duration
    }

    //Delete the event from the database
    await deleteEvent(event.eventID);

    //delete the event from the event array
    const eventIndex = eventList.indexOf(event);
    if(eventIndex > -1)
    {
        eventList.splice(eventIndex,1);
    }

    return eventList;
}