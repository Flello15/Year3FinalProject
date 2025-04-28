import {login} from '../SQLLogin.js';
import mysql from "mysql";
//Function to return full array
export default async function deleteCalendar(calID, userID)
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

    var sql = "DELETE FROM calendar.calendars where calendarID=\'"+calID+"\' AND user=\'"+userID+"\';";

    var res = await new Promise((resolve) =>
         {
            con.query(sql, function (err, result,fields) {
                if (err) throw err;
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

//var temp = await deleteCalendar(5,"testname");
//console.log(temp);