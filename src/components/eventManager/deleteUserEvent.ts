'use server'
import deleteEvent from "@/api/mysql/deleters/deleteEvent";
import getFlex from "@/api/mysql/getters/getFlex";
import getParent from "@/api/mysql/getters/getParent";
import {Calendar, calEvent, Flex, Preferences} from "./eventType";
import { cookies } from "next/headers";
import { partialBuild } from "./buildFlex";
import getUserEvents from "./getUserEvents";

export default async function deleteCalEvent(userID:string, event:calEvent, eventList:calEvent[], calendar:Calendar,
     preferences:Preferences,destroyFlex:boolean)
{
    const cookieStore = await cookies();
    //Check if flex type, and not destroying full flex
    if(event.eventType == 2 && !destroyFlex)
    {
        //Call alter flex with the duration
        const parent = await getParent(event.eventID);
        if(!isNaN(parent[0].parentID))//Ignore if no parent
        {
            const flexRes = await getFlex(parent[0].parentID);
            const flex:Flex=
            {
                flexID:flexRes.flexID,
                timeToComplete:flexRes.HoursToComplete,
                deadline:new Date(flexRes.deadline),
                name:flexRes.name
            }
            await partialBuild(flex,1,eventList,preferences,calendar);
        }
    }

    //Delete the event from the database
    await deleteEvent(event.eventID);

    //delete the event from the event array, and update the cookies
    const eventIndex = getIndex(event,eventList);

    const newList = await getUserEvents(userID);
    cookieStore.set({name:"events",value:JSON.stringify(newList)});
    
    return newList;
}

function getIndex(event:calEvent, eventList:calEvent[])
{
    for(let i = 0; i < eventList.length; i++)
    {
        if(eventList[i].eventID == event.eventID)
        {
            return i;
        }
    }
    return -1;
}