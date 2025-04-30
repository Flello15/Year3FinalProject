'use client';
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Calendar } from "../eventManager/eventType";
import CalListItem from "./calListItem";
import CalSharePanel from "./calSharePanel";

interface nsProps
{
    toggleVis: ()=> void;
}
export default function NavSide({toggleVis}:nsProps)
{
    const [shareCal,setShare] = useState(false);

    function toggleShare()
    {
        setShare(!shareCal);
    }
    //To prevent hydration error
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
      setIsClient(true)
    }, [])
    const cookies = new Cookies(null, { path: "/" });
    var logoutButton = <button id="logoutButton" onClick={logout}>Log Out</button>
    var sharePanel = <></>
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
    }
    if(cookies.get("username") == undefined) logoutButton = <></>;
    
    return(<>{isClient?
    <div id="navSide">
        {logoutButton}
        <button id="calShare" onClick={toggleShare}>Share calendar</button>
        {sharePanel}
        <div id="calList">{calItemArray}</div>
    </div>:<></>}</>);
}

