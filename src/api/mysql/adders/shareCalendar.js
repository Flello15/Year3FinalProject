'use server'
import {login} from '../SQLLogin.js';
import mysql from "mysql";
//Function to return full array
export default async function shareCalendar(calID, userID,permissions,calName)
{
    var con = mysql.createConnection({
        host: "localhost",
        user: login[0],
        password: login[1]
    });

    con.connect(function(err) {
    if (err) throw err;
        console.log("Connected!");
    });

    var sql = "INSERT INTO calendar.calendars (calendarID,user,permissions,calname) VALUES ("+calID+",\'"+userID+"\',"+permissions+",\'"+calName+"\');";

    var res = await new Promise((resolve) =>
         {
            con.query(sql, function (err, result,fields) {
                if (err)
                {
                    //Return null and exit. Avoids infinite wait
                    resolve();
                }
                resolve(result);
            });
         })
    con.end((error) => {
        if (error) {
          console.error('Error closing MySQL connection:', error);
          return;
        }
    
        console.log('MySQL connection closed.');
      });

    return res;
}