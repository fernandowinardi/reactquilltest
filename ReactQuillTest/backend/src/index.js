const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials: true
}))

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// connect to database
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password123",
    database: "tnlearntest", 
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// create table ___ if not exist
// create table "admin" 
db.connect(function() {
    const sql = "CREATE TABLE IF NOT EXISTS admin (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), email VARCHAR(255), password VARCHAR(255))";
    db.query(sql, function (err, result) {
        if (err) {
            console.log("error")
            console.log(err)
        } else {
            console.log(result)
            if (result.warningStatus == 0) {
                console.log("First installation. Creating Admin account with the username: 'oceanryan' and the password: 'password123'")

                const password = "password123"
                bcrypt.hash(password, saltRounds, (error, hash) => {

                    if (error) {
                        console.log(error);
                    }
                    
                    db.query("INSERT INTO admin (username, email, password) VALUES (?, ?, ?)", 
                    ['oceanryan',
                    'oceanryan725@yahoo.com', 
                    hash,
                    'admin'
                    ], 
                    (err) =>{
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Account successfully created!")
                        }
                    });
                })
            } 
        }
    });
});

// maybe u need table for users and modules

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// admin login
app.post('/adminlogin', (req, res) => {
    console.log("admin login attempt")
    const username = req.body.username
    const password = req.body.password
    if (username.includes("@")) {
        db.query("SELECT * from admin WHERE email = ?;",
        username,
        (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        user1 = result;
                        req.session.user = result;
                        res.send(result)
                    } else {
                        res.send({message: "Wrong password!"});
                    }
                })
            } else {
                res.send({message: "Wrong email!"})
            }
        });
    }
    else {
        db.query("SELECT * from admin WHERE username = ?;",
        username,
        (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        user1 = result;
                        req.session.user = result;
                        res.send(result)
                    } else {
                        res.send({message: "Wrong password!"});
                    }
                })
            } else {
                res.send({message: "Wrong username!"})
            }
        });
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// listen
app.listen(3001, () => {
    console.log("running server");
})