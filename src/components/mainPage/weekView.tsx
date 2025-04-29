'use client'
import DateItem from "@/components/mainPage/dateItem";
import { Calendar, calEvent } from "../eventManager/eventType";
import { useState } from "react";
import Cookies from "universal-cookie";
/**
 * Displays every day within a month
 * May not be clear to show event details, so just show if there is any (and colour coded type)
 */
interface mvProps
{
    userID:String|undefined;
    dayInWeek:Date;
}
export default function MonthView({userID,dayInWeek}:mvProps)
{
    const cookies = new Cookies(null, { path: "/" });
    const [day,setDay] = useState(closestMonday(dayInWeek));
    var calEvents:calEvent[] = [];
    var calendars:Calendar[] = [];
    if(cookies.get("calendars") != undefined)
    {
        calEvents = cookies.get("events");
        calendars = cookies.get("calendars");
    }
    var items = [];

    //Functions to increment and decrement the viewed week
    function incrementWeek()
    {
        var newDay= new Date(day.getFullYear(),day.getMonth(),day.getDate()+7);
        setDay(newDay);
    }
    function decrementWeek()
    {
        var newDay= new Date(day.getFullYear(),day.getMonth(),day.getDate()-7);
        setDay(newDay);
    }
    //Get information related to a user
    if(userID != undefined)
    {
        console.log(calendars);
    }  
    for(var i = 0; i < 7; i++)
    {
        var tempDate = new Date(day.getFullYear(),day.getMonth(),i+day.getDate());
        items.push(<DateItem width={100/7} height={100} date={tempDate} buffer={false}
        calendars={calendars} calEvents={calEvents} key={i}/>)
    }
    return <>
        <button onClick={incrementWeek}>TestInc</button>
        <button onClick={decrementWeek}>TestDec</button>
        <div id="calView">{items}</div>
    </>;
}

function closestMonday(day:Date)
{
    var newDate = new Date(day.getFullYear(),day.getMonth(),day.getDate());
    while(newDate.getDay() != 1)
    {
        newDate.setDate(newDate.getDate()-1);
    }
    return newDate;
}