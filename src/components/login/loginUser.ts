'use server';
import getUser from "@/api/mysql/getters/getUser";

export default async function loginUser(username: String, pass: String)
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
            //Handle login
            //document.cookie = "username="+userInfo.userID+";"
            return username;//Return the valid username
        }
        else
        {
              //error and return
              return null;
        }

    }
}