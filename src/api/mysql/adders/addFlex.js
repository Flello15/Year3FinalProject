import {login} from '../../mysql/SQLLogin';
import mysql from "mysql";
//Function to return full array
export default async function addFlex(userID,timeToComplete,deadline,name)
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

    var sql = "INSERT INTO calendar.flexEvents(userID,HoursToComplete,deadline,name) VALUES (\'"+userID+"\',"+timeToComplete+
    ",\'"+deadline+"\',\'"+name+"\');";

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

//var temp = await addFlex("testuser",17,"2025-04-28 10:00:00","testflex");
//console.log(temp);