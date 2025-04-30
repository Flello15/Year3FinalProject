import deleteUserCalendar from "../eventManager/deleteUserCalendar";
import { Calendar } from "../eventManager/eventType";
import Cookies from "universal-cookie";
interface clProps
{
    calendar:Calendar;
    calArr:Calendar[];
    toggleVis:()=>void;
}
export default function CalListItem({calendar,calArr, toggleVis}:clProps)
{
    const cookies = new Cookies(null, { path: "/" });
    //Update the cookie and toggle visibility
    const toggleVisibile =() =>
    {
        const index = getIndex(calendar,calArr);
        calArr[index].visible = !calArr[index].visible;
        cookies.set("calendars",JSON.stringify(calArr));
        toggleVis();
    }

    const deleteCalendar = async()=>
    {
        //Only someone with full permissions can delete a calendar
        if(calendar.permissions==7)
        {
            const eventList = cookies.get("events");
            const userID = cookies.get("username");
            const remainder = await deleteUserCalendar(calendar,eventList,userID);
            //Remove the calendar and events from the cookies
            const index = getIndex(calendar,calArr);
            calArr.splice(index,1);
            cookies.set("calendars",JSON.stringify(calArr));
            cookies.set("events",JSON.stringify(remainder));
            toggleVis();
        }
    }
    const deleteButton = <button className="deleteCal" onClick={deleteCalendar}>X</button>

    return(<><button onClick={toggleVisibile} className="calItem">{calendar.name}</button>{deleteButton}<br/></>)
}


function getIndex(calendar:Calendar, calArr:Calendar[])
{
    for(let i = 0; i < calArr.length;i++)
    {
        if(calendar.calendarID == calArr[i].calendarID)
        {
            return i;
        }
    }
    return -1;
}