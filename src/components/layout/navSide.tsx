'use client';
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Calendar, Preferences } from "../eventManager/eventType";
import CalListItem from "./calListItem";
import CalSharePanel from "./calSharePanel";
import CalAddPanel from "./calAddPanel";
import EventAddPanel from "./eventAddPanel";
import PrefEditPanel from "./prefEditPanel";
import FlexAddPanel from "./addFlexPanel";

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
    const [editPref,setPref] = useState(false);
    const [addFlex,setFlex] = useState(false);

    //Functions to toggle between panels
    function toggleShare()
    {
        setShare(!shareCal);
        setAdd(false);
        setAddEvent(false);
        setPref(false);
        setFlex(false);
    }
    function toggleAdd()
    {
        setAdd(!addCal);
        setShare(false);
        setAddEvent(false);
        setPref(false);
        setFlex(false);
    }
    function toggleEvent()
    {
        setAddEvent(!addEvent);
        setShare(false);
        setAdd(false);
        setPref(false);
        setFlex(false);
    }
    function togglePref()
    {
        setPref(!editPref);
        setAddEvent(false);
        setShare(false);
        setAdd(false);
        setFlex(false);
    }
    function toggleFlex()
    {
        setFlex(!addFlex);
        setAddEvent(false);
        setShare(false);
        setAdd(false);
        setPref(false);
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
    var editPrefPanel = <></>
    var addFlexPanel = <></>
    function logout()
    {
        cookies.remove("username");
        cookies.remove("events");
        cookies.remove("calendars");
        cookies.remove("preferences");
        window.location.reload();
    }
    const calItemArray = [];
    if(cookies.get("calendars") != undefined)
    {
        const calArray:Calendar[] = cookies.get("calendars");
        const preferences:Preferences = cookies.get("preferences");
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

        if(editPref){editPrefPanel= <PrefEditPanel userID={cookies.get("username")}currentPref={preferences} closeFunction={togglePref}/>}
        else{editPrefPanel = <></>}

        if(addFlex){addFlexPanel= <FlexAddPanel userID={cookies.get("username")}calList={calArray} preferences={preferences} closeFunction={toggleFlex}
        refreshFunction={toggleVis}/>}
        else{addFlexPanel = <></>}
    }
    if(cookies.get("username") == undefined) logoutButton = <></>;
    
    return(<>{isClient?
    <div id="navSide">
        {logoutButton}
        {cookies.get("username")!=undefined?<><button id="calShare" onClick={toggleShare}>Share calendar</button>
        <button id="calAdd" onClick={toggleAdd}>Add calendar</button>
        <button id="eventAdd" onClick={toggleEvent}>Add event</button>
        <button id="eventAdd" onClick={toggleFlex}>Add flex event</button>
        <button id="eventAdd" onClick={togglePref}>Edit preferences</button>
        </>:<></>}
        {sharePanel}
        {addPanel}
        {addEventPanel}
        {editPrefPanel}
        {addFlexPanel}
        <div id="calList">{calItemArray}</div>
    </div>:<></>}</>);
}

