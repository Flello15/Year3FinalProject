import {login} from '../SQLLogin.js';
import mysql from "mysql";
//Function to return full array
export default async function addEvent(calendarID,eventType,startTime,duration,title,description,repeatLength,parentID)
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
    var sql;
    if(parentID !=undefined)
    {
        sql = "INSERT INTO calendar.events (calendarID,eventType,startTime,duration,title,description,repeatLength, parentID)"+
        "VALUES ("+calendarID+","+eventType+",\'"+startTime+"\',\'"+duration+"\',\'"+title+"\',\'"+description+"\',"+repeatLength+","
        +parentID+");"
    }
    else
    {
        sql = "INSERT INTO calendar.events (calendarID,eventType,startTime,duration,title,description,repeatLength)"+
        "VALUES ("+calendarID+","+eventType+",\'"+startTime+"\',\'"+duration+"\',\'"+title+"\',\'"+description+"\',"+repeatLength+");"
    }

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

//const date = new Date();
//const SQLDate = date.toISOString().slice(0, 19).replace('T', ' ');
//var temp = await addEvent(1,0,SQLDate,"1:00:00","testTitleNew","Written by SQL!",0,null);
//console.log(temp.insertId);