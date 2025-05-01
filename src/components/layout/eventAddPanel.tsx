'use client'
import { useState } from "react";
import addUserCalendar from "../eventManager/addUserCalendar";
import Cookies from "universal-cookie";
import { Calendar, calEvent } from "../eventManager/eventType";
import getUserCalendars from "../eventManager/getUserCalendars";
import getUserEvents from "../eventManager/getUserEvents";
import addUserEvent from "../eventManager/addUserEvent";

interface csProps
{
    userID:string;
    calList:Calendar[];
    closeFunction: ()=>void;
    refreshFunction: ()=>void;
}
export default function EventAddPanel({userID,calList,closeFunction, refreshFunction}:csProps)
{
    const [eventName,setName] = useState("");
    const [eventDay,setDay] = useState("");
    const [eventDuration,setDuration] = useState("");
    const [eventDescription,setDescription] = useState("");
    const [calId,setID] = useState(-1);
    const [repeat, setRepeat] = useState(-1);
    //Determine which calendars can be added to
    const addables:Calendar[] = [];
    const shareRadio = [];
    for(let i = 0; i < calList.length; i++)
    {
        //Check correct permissions
        if(calList[i].permissions >= 3)
        {
            addables.push(calList[i]);
            shareRadio.push(<div key={i}>{calList[i].name} <input type="radio" value={i} name="calSelect" 
                className="calSelect" onChange={(e) => setID(+e.target.value)} required/></div>);
        }
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        var eType = 0;
        if(repeat != 0)
        {
            eType = 1;
        }
        const date=createDate(eventDay);

        //create the event item
        const newEvent:calEvent=
        {
            eventID:-1,
            calendarID:addables[calId].calendarID,
            name:eventName,
            eventType:eType,
            startTime:date,
            duration:(eventDuration+":00"),
            description:eventDescription,
            repeatLength:repeat
        }
        const cookies = new Cookies(null, { path: "/" });
            let res = await addUserEvent(newEvent,true);
        //Update the stored cookie
        const newTable:calEvent[] = await getUserEvents(userID);
        cookies.set("events",JSON.stringify(newTable));
        refreshFunction();
        closeFunction();
    }
    return(<div id="eventAddPanel">
            <form onSubmit={handleSubmit} id="eventAddForm">
                <h1 id="eventAddTitle">Add event</h1>
                <label className="eventAddHeader">Name:
                    <input type="text" className="eventAddInput" value={eventName} onChange={(e) => setName(e.target.value)} required/><br/>
                </label>
                <label className="eventAddHeader">Calendar:
                    <span className="radioItem">
                        {shareRadio}
                    </span>
                </label>
                <label className="eventAddHeader">Date:
                    <input type="datetime-local" className="eventAddInput" value={eventDay} onChange={(e) => setDay(e.target.value)} required/><br/>
                </label>
                <label className="eventAddHeader">Duration (HH:MM):
                    <input type="time" className="eventAddInput" value={eventDuration} 
                    onChange={(e) => setDuration(e.target.value)} required/><br/>
                </label>
                <label className="eventAddHeader">Decscription:<br/>
                    <textarea className="eventAddInput" rows={5}cols={40}form="eventAddForm" value={eventDescription}
                    onChange={(e) => setDescription(e.target.value)}/><br/>
                </label>
                <label className="eventAddHeader">Repeat duration:<span className="radioItem">
                <div>Never <input type="radio" value={0} name="repSelect" 
                className="repSelect" key={"a"} onChange={(e) => setRepeat(+e.target.value)} required/></div>
                <div>Weekly <input type="radio" value={1} name="repSelect" 
                className="repSelect" key={"b"} onChange={(e) => setRepeat(+e.target.value)}/></div>
                <div>Monthly <input type="radio" value={2} name="repSelect" 
                className="repSelect" key={"c"} onChange={(e) => setRepeat(+e.target.value)}/></div></span>
                </label>
                <input type="submit" value="add" id="eventAddSubmit"/><br/>
            </form></div>);
}

function createDate(date:string)
{
    var newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes()-newDate.getTimezoneOffset())//Offset from the local time
    return newDate;
}