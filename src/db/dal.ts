import mysql from "mysql2";
import config from "../utils/Config";

// Creating a connection object:
const connection = mysql.createPool({
    host: config.mysqlHost,
    user: config.mysqlUser,
    password: config.mysqlPassword,
    database: config.mysqlDatabase
});

console.log("We're connected to MySQL");

export default function runQuery(sql: string, values?: any[]): Promise<any> {

    return new Promise<any>((resolve, reject) => { // To Promisify an asynchronous function

        // runQuery the sql on MySQL:
        connection.query(sql, values, (err, result) => {

            // If there is an error: 
            if (err) {
                reject(err);
                return;
            }

            // No error - report data: 
            resolve(result);
        });

    });
}

export const closeDB = async () =>{
    connection.end()
}
