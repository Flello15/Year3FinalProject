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
        if(calList[i].permissions == 7)
        {
            sharables.push(calList[i]);
            shareRadio.push(<>{calList[i].name} <input type="radio" value={i} name="calSelect" 
                className="calSelect" key={i} onChange={(e) => setID(+e.target.value)}/><br/></>);
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
    return(<div id="loginPanel">
            <form onSubmit={handleSubmit}>
                <h1 id="loginTitle">Share calendar</h1>
                <label className="loginHeader">Select calendar:<br/>
                    {shareRadio}
                </label>
                <label className="loginHeader">Enter user:<br/>
                    <input type="text" className="loginInput" value={userID} onChange={(e) => setUser(e.target.value)}/>
                </label>
                <label className="loginHeader">Enter permission level (1-3):<br/>
                    <input type="text" className="loginInput" value={perm} onChange={(e) => setPerm(e.target.value)}/>
                </label>
                <input type="submit" value="share" id="loginSubmit"/><br/>
            </form></div>);
}