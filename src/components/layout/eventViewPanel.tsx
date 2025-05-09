'use client'
import { useState } from "react";
import deleteUserEvent from "../eventManager/deleteUserEvent";
import { Calendar, calEvent, Preferences } from "../eventManager/eventType";
import Cookies from "universal-cookie";
interface veProps
{
    event:calEvent;
    calendar:Calendar;
    pageExit:() => void;
}
export default function viewEvent({event,calendar,pageExit}:veProps)
{
    const [edit,setEdit] = useState(false);
    const cookies = new Cookies(null, { path: "/" });
    const preferences:Preferences = cookies.get("preferences");
    //function to delete the event
    const deleteEvent = async()=>
    {
        await deleteUserEvent(cookies.get("username"),event,cookies.get("events"),calendar,preferences,false);
        pageExit();
    }
    const hardDeleteEvent = async()=>
    {
        await deleteUserEvent(cookies.get("username"),event,cookies.get("events"),calendar,preferences,true);
        pageExit();
    }
    
    //function to set editing
    function setEditing()
    {
        setEdit(!edit);
    }
    //Variables holding the current display mode
    const viewMode = <div id="viewEvent">
    <div id="eventHeading">{event.name}</div>
    <div className="eventViewItem">Calendar: {calendar.name}</div>
    <div className="eventViewItem">Start time: {getTime(event.startTime)}</div>
    <div className="eventViewItem">End time: {getEnd(event.startTime, event.duration)}</div>
    <div className="eventViewItem">Description: {getDesc(event.description)}</div>
    {event.eventType==1?<div className="eventViewItem">Repeat: {getRepeatName(event.repeatLength)}</div>:<></>}
    <br/>
    {(calendar.permissions)>=3?<><button onClick={deleteEvent} id="deleteButton">Delete</button><br/></>:<></>}
    {event.eventType==2?<><button onClick={hardDeleteEvent} id="deleteButton">Hard delete</button><br/></>:<></>}
    <button id="backButton" onClick={pageExit}>Back</button>
    </div>
    /*const editMode = <div id="viewEvent">
    <div id="eventHeading">{event.name}</div>
    <div className="eventItem">Calendar: {calendar.name}</div>
    <div className="eventItem">Start time: {getTime(event.startTime)}</div>
    <div className="eventItem">End time: {getEnd(event.startTime, event.duration)}</div>
    <div className="eventItem">Description: {event.description}</div>
    {event.eventType==1?<div className="eventItem">Repeat: {event.repeatLength}</div>:<></>}
    <button id="backButton" onClick={setEditing}>Back</button>
    </div>*/
    //Repeat only displayed for repeating events
    //1-Read. 2-Edit. 3-Delete
    return viewMode;
}

function getRepeatName(rep:number)
{
    if(rep == 0)return "None";
    if(rep == 1)return "Weekly";
    if(rep == 2)return "Monthly";
}
function getDesc(desc:string)
{
    if(desc == "") return "None";
    return desc;
}
function getTime(date:Date)
{
    const mins = date.getMinutes();
    if(mins < 10)
    {    
        return(date.getHours() + ":0" + date.getMinutes());
    }
    return(date.getHours() + ":" + date.getMinutes());
}
function getEnd(date:Date, duration:string)
{
    const durArray = duration.split(":");
    const hours = date.getHours() + +durArray[0];
    const mins = date.getMinutes() + +durArray[1];
    if(mins < 10)
    {
        return hours + ":0" + mins;
    }
    return hours + ":" + mins;
}