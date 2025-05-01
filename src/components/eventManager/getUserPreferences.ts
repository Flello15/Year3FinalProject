'use server'
import getPreferences from "@/api/mysql/getters/getPreferences";
import {Preferences} from "./eventType";

export default async function getUserPreferences(userID:string)
{
    //Get JSON response
    var prefRes = await getPreferences(userID)
    const prefType:Preferences={startPref:prefRes.startPref
        ,endPref:prefRes.endPref,
        dayPref:prefRes.dayPref,
        lengthPref:prefRes.lengthPref,
        breakPref:prefRes.breakPref,
        daySessions:prefRes.daySessions}
    return prefType;
}
