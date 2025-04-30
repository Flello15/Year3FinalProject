import { useEffect, useState } from "react";
import { Calendar, calEvent } from "../eventManager/eventType";
import EventViewPanel from "../layout/eventViewPanel";

interface eiProps
{
    event:calEvent;
    calendar:Calendar;
}
//Go through all events in the provided list, for now just output
export default function EventItem({event,calendar}:eiProps)
{
    //Set whether the event details should be displayed
    const [activeDetails, setActiveDetails] = useState(false);

    //functions to open and close the page
    function togglePage()
    {
        setActiveDetails(!activeDetails);
    }
    //To prevent hydration error
    const [isClient, setIsClient] = useState(false)
     
    useEffect(() => {
        setIsClient(true)
    }, [])
    const time = createTime(event.startTime);
    return(<>{isClient?<button onClick={togglePage} className="eventItem">{time}- {event.name} ({calendar.name})</button>:<></>}
    {activeDetails?<EventViewPanel event={event} calendar={calendar} pageExit={togglePage}/>:<></>}</>);
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