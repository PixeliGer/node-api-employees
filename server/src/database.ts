import mysql from 'promise-mysql';
import keys from "./keys";

// Execute the connection to the database
const pool = mysql.createPool(keys.database);
let con: any;

pool.then(function(_pool: any) {
    return _pool.getConnection();
}).then(function(_connection: any) {
    con = _connection;
    // connection query here
    console.log("Connected to the database");
}).then(rows => {
    con.release();
})

export default pool;