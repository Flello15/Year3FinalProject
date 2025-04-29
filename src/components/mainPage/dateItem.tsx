import { Calendar, calEvent } from "../eventManager/eventType";
import EventItem from "./eventItem";

interface dateProps{
    width:number;
    height:number;
    date:Date;
    calendars:Calendar[];
    calEvents:calEvent[];
    buffer:boolean;
}

export default function DateItem({width,height,date,calendars,calEvents,buffer}:dateProps)
{
    var widthString = width.toFixed(0) + "%";
    var heightString = height.toFixed(0) + "%";
    var day = getDayName(date.getDay());
    var suffix = getDateEnd(date.getDate());
    const styleSize = {width:widthString, height:heightString};
    const dayEvents = getDayEvents(calendars,calEvents,date);
    const eventItems = [];
    for(let i = 0; i < dayEvents.length; i++)
    {
        const cal= getCalendarByID(dayEvents[i],calendars);
        if(cal != null)
        {
            eventItems.push(<EventItem event={dayEvents[i]} calendar={cal} key={i}/>);
        }
    }
    if(buffer==true)
    {
        return(<div className="ItemBoxBuffer" style={styleSize}>
            <h1 className="CalDate">{day} {date.getDate()}{suffix} </h1>
        </div>);
    }
    return(<div className="ItemBox" style={styleSize}>
        <h1 className="CalDate">{day} {date.getDate()}{suffix}{eventItems}</h1>
    </div>);
}


//Convert the day value into the shortened name
function getDayName(day:number)
{
    switch(day)
    {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tues";
        case 3:
            return "Wed";
        case 4:
            return "Thurs";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
    }
}

//Get the suffix for the date (i.e. st, nd, rd, th)
function getDateEnd(date:number)
{
    //Default values between 10 and 20. 11th not 11st
    if(date > 10 && date < 20)
    {
        return "th";
    }
    switch(date%10)
    {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }

}

function getDayEvents(calendars:Calendar[], calEvents:calEvent[], date:Date)
{
    const eventArr:calEvent[] = [];
    for(let i = 0; i < calEvents.length; i++)
    {
        if(sameDay(calEvents[i].startTime,date))
        {
            if(getCalendarByID(calEvents[i],calendars)?.visible)
            {
                eventArr.push(calEvents[i]);
            }
        }
    }
    return eventArr;
}

function getCalendarID(event:calEvent, calendars:Calendar[])
{
    for(let i = 0; i< calendars.length; i++)
    {
        if(calendars[i].calendarID == event.calendarID)
        {
            return i;
        }
    }
    return -1;
}
function getCalendarByID(event:calEvent, calendars:Calendar[])
{
    const calID = getCalendarID(event,calendars);
    if(calID != -1)
    {
        return calendars[calID];
    }
    return undefined;
}

function sameDay(date1:Date, date2:Date)
{
    return((date1.getDate() == date2.getDate()) && (date1.getMonth() == date2.getMonth())
     && (date1.getFullYear() == date2.getFullYear()));
}