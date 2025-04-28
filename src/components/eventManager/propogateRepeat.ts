import addUserEvent from "./addUserEvent";
import { calEvent } from "./eventType";

export default function propogateRepeat(event:calEvent)
{
    const date = event.startTime;
    let workingDate = new Date(date.getFullYear(),date.getMonth(),date.getDate());
    //Loop for 90 days
    while(workingDate.getTime()/(1000*24*60*60)-workingDate.getTime()/(1000*24*60*60) < 90)
    {
        workingDate.setDate(workingDate.getDate()+event.repeatLength);
        var newEvent: calEvent=
        {
            calendarID:event.calendarID,
            eventID:-1,
            eventType:1,
            name:event.name,
            description:event.description,
            startTime:workingDate,
            duration:event.duration,
            repeatLength:event.repeatLength
        }
        addUserEvent(newEvent,false);
    }
}