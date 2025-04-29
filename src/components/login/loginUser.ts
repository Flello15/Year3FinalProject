'use server';
import getUser from "@/api/mysql/getters/getUser";
import { cookies } from 'next/headers'
import getUserEvents from "../eventManager/getUserEvents";
import getUserCalendars from "../eventManager/getUserCalendars";
export default async function loginUser(username: string, pass: string)
{
    let userInfo= await getUser(username);
    if(userInfo == undefined)
    {
        //Set error and return
        return null;
    }
    else
    {
        //compare password
        const crypto = require("crypto");
        const hmac = crypto.createHmac("sha256", "eoiwrnvgfdklsjvmjlkcx,vighetjropejgfmdnkclxnvbgdf");
        hmac.update(pass);
        let hashPass = hmac.digest("hex");
        if(hashPass == userInfo.password)
        {
            //Set up the required cookites
            const cookieStore = await cookies();
            //get user preferences, calendars and events
            const userEvents = (await getUserEvents(username));
            const calendars = await getUserCalendars(username);
            cookieStore.set({name:"username",value:username});
            cookieStore.set({name:"events",value:JSON.stringify(userEvents)});
            cookieStore.set({name:"calendars",value:JSON.stringify(calendars)});
            return username;//Return the valid username
        }
        else
        {
              //error and return
              return null;
        }

    }
}