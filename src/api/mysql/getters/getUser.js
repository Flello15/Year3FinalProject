/**
 * Get user from a given ID
 */
import {login} from '../../mysql/SQLLogin';
import mysql from "mysql";
//Function to return full array
async function getUserAr(userID)
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

    var sql = "SELECT * FROM calendar.Users WHERE userID=\'"+userID+"\';";

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

//Since only first element is relevant, function for only first value for convenience
export default async function getUser(userID)
{
    var res = (await getUserAr(userID));
    return res[0];
}

//Example use. Don't forget await
//var temp = await getUser("testname");
//console.log(temp.userID);