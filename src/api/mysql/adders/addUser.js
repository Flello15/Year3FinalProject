import {login} from '../SQLLogin.js';
import mysql from "mysql";
//Function to return full array
export default async function addUser(userID,password)
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

    var sql = "INSERT INTO calendar.users "+
    "VALUES (\'"+userID+"\',\'"+password+"\',NOW(),\'10:00:00\',\'22:00:00\',127,\'1:00:00\',\'0:15:00\',2);";

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

//var temp = await addUser("debugUser","debugTest");
//console.log(temp);