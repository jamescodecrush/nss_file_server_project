const { error } = require("console");
const express = require("express");
const path = require("path");
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({ path: './.env'});

const app = express();
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST, 
    user: process.env.DATABASE_USER,
    password: process.DATABASE_PASSWORD,
    database: process.env.DATABASE
    
});

const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory));

//Parse URL-encoded to grab the data from anyform

app.use(express.urlencoded({ extended: false}));

//Parse Json values from the form.

app.use(express.json());




app.set('view engine', 'hbs');

db.connect(  (error) => {
    if(error) {
        console.log(error)
    }
    else{
        console.log("MYSQL Connected...")
    }
})

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(7005, () => {

    console.log("Server Started on port 7005");
})
