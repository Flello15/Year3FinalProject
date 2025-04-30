'use server';
import getUser from "@/api/mysql/getters/getUser";
import { cookies } from 'next/headers'
import getUserEvents from "../eventManager/getUserEvents";
import getUserCalendars from "../eventManager/getUserCalendars";
import addUser from "@/api/mysql/adders/addUser";
export default async function signupUser(username: string, pass: string, pass2: string)
{
    //Ensure user does not exist
    let userInfo= await getUser(username);
    if(userInfo != undefined)
    {
        //Set error and return
        return null;
    }
    else
    {
        //compare password
        const crypto = require("crypto");
        const hmac = crypto.createHmac("sha256", "eoiwrnvgfdklsjvmjlkcx,vighetjropejgfmdnkclxnvbgdf");
        const hmac2 = crypto.createHmac("sha256", "eoiwrnvgfdklsjvmjlkcx,vighetjropejgfmdnkclxnvbgdf");
        hmac.update(pass);
        hmac2.update(pass2);
        let hashPass = hmac.digest("hex");
        let hashPass2 = hmac2.digest("hex");
        if(hashPass == hashPass2)
        {
            //Add the user to the database
            await addUser(username,hashPass);
            //Set up the required cookites for login
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