const express = require("express");
const router = express.Router();
const connection=require("../database");
const argon2 = require("argon2");
router.post('/signup',async(req,res)=>{
    const {fname,lname,phoneNo,email,passwd,conpasswd}=req.body;
    if (passwd !== conpasswd) {
        return res.status(400).json({error:"Passwords do not match"});
    }

    if (passwd.length < 8) {
        return res.status(400).json({error:"Password must be at least 8 characters long"});
    }

    if (!/[A-Z]/.test(passwd)) {
        return res.status(400).json({error:"Password must contain at least one uppercase letter"});
    }

    if (!/[0-9]/.test(passwd)) {
        return res.status(400).json({error:"Password must contain at least one digit"});
    }

    if (!/[!@#$%^&*]/.test(passwd)) {
        return res.status(400).json({error:"Password must contain at least one special character"});
    }
    try{
        const hashedPasswd= await argon2.hash(passwd)
        const query=`INSERT INTO users(fname,lname,phoneNo,email,passwd) VALUES(?,?,?,?,?)`;
        connection.query(query,[fname,lname,phoneNo,email,hashedPasswd],(error,results)=>{
            if (error) {
                console.error(error);
                return res.status(500).json({ error: "Database error" });
            }
            res.status(201).json({ message: "Signup successful!" });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
router.post('/login',(req,res)=>{
    const {email,passwd}=req.body;
    const query=`SELECT * FROM users WHERE email=?`;
    connection.query(query,[email],async (error,results)=>{
        if(error){
            console.error(error);
            return res.status(500).json({error:'An error occured.Please try again later'});
        }

        if (results.length === 0) {
            return res.status(400).json({error:'Invalid email'});
        }
        const storedPassword = results[0].passwd;
        try {
            if (!await argon2.verify(storedPassword, passwd)) {
                return res.status(400).json({ error: 'Incorrect password. Try again' });
            } else {
               
                res.status(200).json({ message: 'Login successful!' });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred. Please try again later.' });
        }
    })
})
module.exports = router;
