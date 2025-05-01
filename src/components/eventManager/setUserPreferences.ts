'use server'
import editPreferences from "@/api/mysql/updaters/editPreferences";
import {Preferences} from "./eventType";

export default async function getUserPreferences(userID:string, pref:Preferences)
{
    //Get JSON response
    var prefRes = await editPreferences(userID, pref.startPref,pref.endPref,pref.dayPref,pref.lengthPref,pref.breakPref,pref.daySessions)
}
