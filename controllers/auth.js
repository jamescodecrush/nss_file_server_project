const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST, 
    user: process.env.DATABASE_USER,
    password: process.DATABASE_PASSWORD,
    database: process.env.DATABASE
    
});


exports.register = (req, res) =>{

    console.log(req.body);

const { name, email, password, passwordConfirm } = req.body;

db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) =>{
    if(error){
        console.log(error)
    }
    if(results.length> 0){
        return res.render('register', {
            message: 'That email already in use.'
        })
    } else if(password !== passwordConfirm){
        return res.render('register', {
            message: 'The passwords do not match. Please try again.'
        });
    }



let hashedPassword = await bcrypt.hash(password, 8);
console.log(hashedPassword);

db.query('INSERT INTO users SET ?', {username: username, email: email, password: hashedPassword }, (error, results) =>{
    if(error){
        console.log(error)
    } else {
        console.log(results);
        return res.render('register', {
            message: 'You are successfully registered. login'
        })
    }

})
 
});
    
 
}