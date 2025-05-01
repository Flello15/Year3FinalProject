'use client'
import { useState } from "react";
import addUserCalendar from "../eventManager/addUserCalendar";
import Cookies from "universal-cookie";
import { Calendar, calEvent, Flex,Preferences } from "../eventManager/eventType";
import getUserCalendars from "../eventManager/getUserCalendars";
import getUserEvents from "../eventManager/getUserEvents";
import addUserEvent from "../eventManager/addUserEvent";
import buildFlex from "../eventManager/buildFlex";

interface csProps
{
    userID:string;
    calList:Calendar[];
    preferences:Preferences;
    closeFunction: ()=>void;
    refreshFunction: ()=>void;
}
export default function FlexAddPanel({userID,calList,preferences,closeFunction, refreshFunction}:csProps)
{
    const [eventName,setName] = useState("");
    const [eventDay,setDay] = useState("");
    const [eventDuration,setDuration] = useState(0);
    const [calId,setID] = useState(-1);
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
        const date=createDate(eventDay);

        //create the event item
        const newFlex:Flex=
        {
            flexID:-1,
            name:eventName,
            deadline:createDate(eventDay),
            timeToComplete:eventDuration
        }
        const cookies = new Cookies(null, { path: "/" });
        const calEventsJS:calEvent[] = cookies.get("events");
        const calEvents:calEvent[] = []
        for(let i = 0; i < calEventsJS.length; i++)
        {
            calEvents.push(convertEvent(calEventsJS[i]))
        }
        let res = await buildFlex(userID,newFlex,preferences,calEvents,addables[calId]);
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
                <label className="eventAddHeader">Deadline:
                    <input type="datetime-local" className="eventAddInput" value={eventDay} onChange={(e) => setDay(e.target.value)} required/><br/>
                </label>
                <label className="eventAddHeader">Hours to complete:
                    <input type="number" className="eventAddInput" value={eventDuration} 
                    onChange={(e) => setDuration(+e.target.value)} required/><br/>
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

function convertEvent(eventJSON: any)
{
    const event:calEvent =
    {
        eventID:eventJSON.eventID,
        calendarID:eventJSON.calendarID,
        eventType:eventJSON.eventType,
        name:eventJSON.title,
        description:eventJSON.description,
        startTime:new Date(eventJSON.startTime),
        duration:eventJSON.duration,
        repeatLength:eventJSON.repeatLength
    }

    return event
}