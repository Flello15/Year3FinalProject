import addCalendar from "@/api/mysql/adders/addCalendar";
import { Calendar } from "./eventType";
export default async function addUserCalendar(userID:String, calName:String, permissions:number)
{
    const res = await addCalendar(calName,userID);
    const cal:Calendar = {calendarID:res.insertId, permissions:permissions, name:calName,visible:true}
    return cal;
}