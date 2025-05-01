import addUserEvent from "./addUserEvent";
import { calEvent } from "./eventType";

//Assumes first event already in place
export default function propogateRepeat(event:calEvent)
{
    //exit if an invalid range is used
    if(event.repeatLength < 1 || event.repeatLength > 2)
    {
        return;
    }
    const date = event.startTime;
    //Loop for 15 events
    for(let i = 1; i <= 5; i++)
    {
        var tempDate = new Date()
        //Weekly
        if(event.repeatLength == 1)
        {
            tempDate = new Date(date.getFullYear(),
            date.getMonth(), date.getDate()+(7*i))}
            tempDate.setHours(date.getHours());
            tempDate.setMinutes(date.getMinutes());
        //monthly
        if(event.repeatLength == 2){
            tempDate = new Date(date.getFullYear(),
            date.getMonth()+i, date.getDate())
            tempDate.setHours(date.getHours());
            tempDate.setMinutes(date.getMinutes());
        }
        var newEvent: calEvent=
        {
            calendarID:event.calendarID,
            eventID:-1,
            eventType:1,
            name:event.name,
            description:event.description,
            startTime:tempDate,
            duration:event.duration,
            repeatLength:event.repeatLength
        }
        addUserEvent(newEvent,false);
    }
}