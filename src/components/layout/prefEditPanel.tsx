'use client'
import { useState } from "react";
import Cookies from "universal-cookie";
import {Preferences } from "../eventManager/eventType";
import getUserPreferences from "../eventManager/getUserPreferences";
import setUserPreferences from "../eventManager/setUserPreferences";

interface csProps
{
    userID:string;
    currentPref:Preferences;
    closeFunction: ()=>void;
}
export default function PrefEditPanel({userID,currentPref,closeFunction}:csProps)
{
    const [startPref,setStart] = useState(truncateTime(currentPref.startPref));
    const [endPref,setEnd] = useState(truncateTime(currentPref.endPref));
    const [lengthPref,setLength] = useState(truncateTime(currentPref.lengthPref));
    const [breakPref,setBreak] = useState(truncateTime(currentPref.breakPref));
    const [daySessions,setSessions] = useState(currentPref.daySessions);
    const cookies = new Cookies(null, { path: "/" });

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const newPref:Preferences=
        {
            startPref:startPref+":00",
            endPref:endPref+":00",
            dayPref:123,
            lengthPref:lengthPref+":00",
            breakPref:breakPref+":00",
            daySessions:daySessions
        }
        await setUserPreferences(userID, newPref);
        //Update the stored cookie
        const newCookie:Preferences = await getUserPreferences(userID);
        cookies.set("preferences",JSON.stringify(newCookie));
        closeFunction();
    }

    return(<div id="eventAddPanel">
            <form onSubmit={handleSubmit} id="eventAddForm">
                <h1 id="eventAddTitle">Edit preferences</h1>
                <label className="eventAddHeader">Start time:
                    <input type="time" className="eventAddInput" value={startPref} 
                    onChange={(e) => setStart(e.target.value)} required/><br/>
                </label>
                <label className="eventAddHeader">End time:
                    <input type="time" className="eventAddInput" value={endPref} 
                    onChange={(e) => setEnd(e.target.value)} required/><br/>
                </label>
                <label className="eventAddHeader">Length:
                    <input type="time" className="eventAddInput" value={lengthPref} 
                    onChange={(e) => setLength(e.target.value)} required/><br/>
                </label>
                <label className="eventAddHeader">Break length:
                    <input type="time" className="eventAddInput" value={breakPref} 
                    onChange={(e) => setBreak(e.target.value)} required/><br/>
                </label>
                <label className="eventAddHeader">Max sessions/day:
                    <input type="number" min={1} className="eventAddInput" value={daySessions} 
                    onChange={(e) => setSessions(+e.target.value)} required/><br/>
                </label>
                <input type="submit" value="update" id="eventAddSubmit"/><br/>
            </form></div>);
}

function truncateTime(time:string)
{
    return time.slice(0,5);
}