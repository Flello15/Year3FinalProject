import {login} from '../../mysql/SQLLogin';
import mysql from "mysql";
//Function to return full array
export default async function editEvent(calID,name)
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

    var sql = "UPDATE calendar.calendars SET calName=\'"+name+"\'"
    " WHERE calendarID = "+calID+";";

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

//var temp = await editEvent(3,1,0,"2025-04-27 12:00:00","1:00:00","testTitle","Written and edited by SQL!",0);
//console.log(temp);