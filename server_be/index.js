const express = require ("express")
const app = express()
const mysql = require("mysql")


const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'password',
    database : 'buysmonefy',
});

app.listen(3001, () => {
    console.log("Backend running at 3001 port");
});

app.get("/" , (req, res) => {
    res.send("Hello world - tania");
})

// just for testing purpose
app.get("/insert" , (req, res) => {
    const insertQuery = "insert into login values ('buyer' , 'admin@123' , 1);";
    db.query(insertQuery);
    });