'use client'
import { useState } from "react";
import { Calendar } from "../eventManager/eventType";
import shareCalendar from "@/api/mysql/adders/shareCalendar";

interface csProps
{
    calList:Calendar[];
    closeFunction: ()=>void;
}
export default function CalSharePanel({calList,closeFunction}:csProps)
{
    const [sharID,setID] = useState(-1);
    const [userID,setUser] = useState("");
    const [perm,setPerm] = useState("");

    //Determine which calendars are shareable
    const sharables:Calendar[] = [];
    const shareRadio = [];
    for(let i = 0; i < calList.length; i++)
    {
        //Only share calendars with full permissions
        if(calList[i].permissions >= 3)
        {
            sharables.push(calList[i]);
            shareRadio.push(<div>{calList[i].name} <input type="radio" value={i} name="calSelect" 
                className="calSelect" key={i} onChange={(e) => setID(+e.target.value)}required/></div>);
        }
    }
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if(sharID == -1){closeFunction(); return;}
        const calID = sharables[sharID].calendarID;
        const calName = sharables[sharID].name;
        //Check valid permission input
        if(+perm >=1 && +perm <=3)
        {
            let res = await shareCalendar(calID,userID,perm,calName);
        }
        closeFunction();
    }
    return(<div id="calPanel">
            <form onSubmit={handleSubmit}>
                <h1 id="calTitle">Share calendar</h1>
                <label className="calHeader">Select calendar:
                    <span className="radioItem">
                        {shareRadio}
                    </span>
                </label>
                <label className="calHeader">User:
                    <input type="text" className="calInput" value={userID} onChange={(e) => setUser(e.target.value)} required/><br/>
                </label>
                <label className="calHeader">Permission level (1-3):
                    <input type="text" className="calInput" value={perm} onChange={(e) => setPerm(e.target.value)} required/><br/>
                </label>
                <input type="submit" value="share" id="calSubmit"/><br/>
            </form></div>);
}