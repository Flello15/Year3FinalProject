'use client'
import DateItem from "@/components/mainPage/dateItem";
import { Calendar, calEvent } from "../eventManager/eventType";
import { useState } from "react";
import Cookies from "universal-cookie";
/**
 * Displays every day within a month
 * May not be clear to show event details, so just show if there is any (and colour coded type)
 */

export default function MonthView()
{
    const cookies = new Cookies(null, { path: "/" });
    const monthNames=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
    const[month,setMonth] = useState(new Date().getMonth());
    const[year,setYear] = useState(new Date().getFullYear());
    const daysInMonth = getDaysInMonth(month,year); //Get number of days in the month
    const monthStart = getStartDay(month,year); //Get the first day of the month

    var calEvents:calEvent[] = [];
    var calendars:Calendar[] = [];
    if(cookies.get("calendars") != undefined)
    {
        calEvents = repairDates(cookies.get("events"));
        calendars = cookies.get("calendars");
    }
    var items = [];

    //functions to increment and decrement the month
    function incrementMonth(){setMonth(month+1);};
    function decrementMonth(){setMonth(month-1);};
    for(var i = (2-monthStart); i <= daysInMonth; i++) //2-MonthStart aligns to monday
    {
        var tempDate = new Date(year,month,i);
        if(i<1)
        {
            //Buffer from previous month, displayed differently
            items.push(<DateItem width={100/7} height={100/5} date={tempDate} buffer={true}
                 calendars={[]} calEvents={[]}key={i}/>)
        }
        else
        {
            items.push(<DateItem width={100/7} height={100/5} date={tempDate} buffer={false}
                calendars={calendars} calEvents={calEvents}key={i}/>)
        }

    }
    return <><span id="monthHeading">{monthNames[Math.abs(getMonthIndex(month))]} {year + (Math.floor(month/12))}</span>
        <button className="monthButton" onClick={decrementMonth}>&lt;</button>
        <button className="monthButton" onClick={incrementMonth}>&gt;</button>
        <div id="calView">{items}</div>
    </>;
}

function getDaysInMonth(month:number, year:number)
{
    return new Date(year, month+1, 0).getDate();
}

function getStartDay(month:number, year:number)
{
    return new Date(year,month,1).getDay();
}

function getMonthIndex(month:number)
{
    if(month < 0)
    {
        return (month+12)%12;
    }
    return month%12;
}
//Convert dates back from strings
function repairDates(calEvents:calEvent[])
{
    for(let i =0; i < calEvents.length; i++)
    {
        calEvents[i].startTime = new Date(calEvents[i].startTime);
    }
    return calEvents;
}

