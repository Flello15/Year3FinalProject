'use client'
import { useState } from "react";
import addUserCalendar from "../eventManager/addUserCalendar";
import Cookies from "universal-cookie";
import { Calendar } from "../eventManager/eventType";
import getUserCalendars from "../eventManager/getUserCalendars";

interface csProps
{
    userID:string;
    closeFunction: ()=>void;
}
export default function CalAddPanel({userID,closeFunction}:csProps)
{
    const [calName,setName] = useState("");

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const cookies = new Cookies(null, { path: "/" });
        if(calName == undefined || calName == "")
        {
            closeFunction();
            return
        }
            let res = await addUserCalendar(userID,calName,3);
            //Update the stored cookie
            const newTable:Calendar[] = await getUserCalendars(userID);
            cookies.set("calendars",JSON.stringify(newTable));
        closeFunction();
    }
    return(<div id="calPanel">
            <form onSubmit={handleSubmit}>
                <h1 id="calTitle">Add calendar</h1>
                <label className="calHeader">Name:
                    <input type="text" className="calInput" value={calName} onChange={(e) => setName(e.target.value)} required/><br/>
                </label>
                <input type="submit" value="add" id="calSubmit"/><br/>
            </form></div>);
}