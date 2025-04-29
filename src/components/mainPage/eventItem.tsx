import { useEffect, useState } from "react";
import { Calendar, calEvent } from "../eventManager/eventType";

interface eiProps
{
    event:calEvent;
    calendar:Calendar;
}
//Go through all events in the provided list, for now just output
export default function EventItem({event,calendar}:eiProps)
{
    //To prevent hydration error
    const [isClient, setIsClient] = useState(false)
     
    useEffect(() => {
        setIsClient(true)
    }, [])
    const time = createTime(event.startTime);
    return(<>{isClient?<div className="eventItem">{time}- {event.name} ({calendar.name})</div>:<></>}</>);
}
function createTime(date:Date)
{
    const mins = date.getMinutes();
    if(mins < 10)
    {    
        return(date.getHours() + ":0" + date.getMinutes());
    }
    return(date.getHours() + ":" + date.getMinutes());
}