'use server'
import getCalendars from "@/api/mysql/getters/getCalendars";
import { Calendar } from "./eventType";

export default async function getUserCalendars(userID:String)
{
    //Get JSON response
    var calRes = await getCalendars(userID)
    const calArr:Calendar[] =[]
    for(let i = 0; i < calRes.length; i++)
    {
        calArr.push(convertCalendar(calRes[i]))
    }
    return calArr;
}

function convertCalendar(calJSON: any)
{
    //Convert the JSON responce into a calendar type
    const cal:Calendar = 
    {
        calendarID: calJSON.calendarID,
        name:calJSON.calName,
        permissions:calJSON.permissions,
        visible:true
    };
    return cal;
}