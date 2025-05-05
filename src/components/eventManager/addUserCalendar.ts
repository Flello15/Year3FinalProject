'use server'
import addCalendar from "@/api/mysql/adders/addCalendar";
import { Calendar } from "./eventType";
export default async function addUserCalendar(userID:string, calName:string, permissions:number)
{
    const res = await addCalendar(calName,userID);
}