'use client';
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Calendar } from "../eventManager/eventType";
import CalListItem from "./calListItem";
import CalSharePanel from "./calSharePanel";
import CalAddPanel from "./calAddPanel";
import EventAddPanel from "./eventAddPanel";

interface nsProps
{
    toggleVis: ()=> void;
}
export default function NavSide({toggleVis}:nsProps)
{
    //Functions to toggle if the panel is displayed
    const [shareCal,setShare] = useState(false);
    const [addCal,setAdd] = useState(false);
    const [addEvent,setAddEvent] = useState(false);

    function toggleShare()
    {
        setShare(!shareCal);
    }
    function toggleAdd()
    {
        setAdd(!addCal);
    }
    function toggleEvent()
    {
        setAddEvent(!addEvent);
    }

    //To prevent hydration error
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
      setIsClient(true)
    }, [])
    const cookies = new Cookies(null, { path: "/" });
    var logoutButton = <button id="logoutButton" onClick={logout}>Log Out</button>
    var sharePanel = <></>
    var addPanel = <></>
    var addEventPanel = <></>
    function logout()
    {
        cookies.remove("username");
        cookies.remove("events");
        cookies.remove("calendars");
        window.location.reload();
    }
    const calItemArray = [];
    if(cookies.get("calendars") != undefined)
    {
        const calArray:Calendar[] = cookies.get("calendars");
        //Get all calendars and create items
        for(let i = 0; i < calArray.length; i++)
        {
            calItemArray.push(<CalListItem calendar={calArray[i]} calArr={calArray} toggleVis={toggleVis} key={i}/>)
        }
        if(shareCal){sharePanel = <CalSharePanel calList={calArray} closeFunction={toggleShare}/>}
        else{sharePanel=<></>}

        if(addCal){addPanel= <CalAddPanel userID={cookies.get("username")} closeFunction={toggleAdd}/>}
        else{addPanel = <></>}

        if(addEvent){addEventPanel= <EventAddPanel userID={cookies.get("username")} calList={calArray} closeFunction={toggleEvent}
        refreshFunction={toggleVis}/>}
        else{addEventPanel = <></>}
    }
    if(cookies.get("username") == undefined) logoutButton = <></>;
    
    return(<>{isClient?
    <div id="navSide">
        {logoutButton}
        {cookies.get("username")!=undefined?<><button id="calShare" onClick={toggleShare}>Share calendar</button>
        <button id="calAdd" onClick={toggleAdd}>Add calendar</button>
        <button id="eventAdd" onClick={toggleEvent}>Add event</button>
        </>:<></>}
        {sharePanel}
        {addPanel}
        {addEventPanel}
        <div id="calList">{calItemArray}</div>
    </div>:<></>}</>);
}

