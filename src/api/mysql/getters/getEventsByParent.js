import {login} from '../SQLLogin.js';
import mysql from "mysql";
//Function to return full array
export default async function getEventsByPar(parentID, eventType)
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

    var sql = "SELECT * FROM calendar.events WHERE parentID="+parentID+ " AND eventType="+eventType+
    " ORDER BY startTime DESC;";

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

//var temp = await getEventsByPar(1);
//console.log(temp[0]);