const express=require('express');
const router=express.Router();
const connection=require('../database');
const {verifyToken}=require("./Auth");
console.log("verifyToken:", verifyToken);

router.get('/Profile',verifyToken,async(req,res)=>{
    const email=req.user.email;
   
    var query = "SELECT * FROM users WHERE email = ?";
    
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }
    connection.query(query, [email], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "User profile retrieval failed" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "Profile retrieved successfully", profile: results[0] });
    });
});


router.get('/Address',verifyToken,async (req,res)=>{
    const email=req.user.email;
    var query="SELECT * FROM deliveryaddresses WHERE email=?";
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }
    connection.query(query, [email], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Addresses retrieval failed" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "You have no Address Entry yet" });
        }

        res.status(200).json({ message: "Addresses retrieved successfully", address: results[0] });
    });
})
router.post('/newAddress', verifyToken, async (req, res) => {
    const email = req.user.email;
    const { County, Constituency, Street, Estate, Floor, HouseNo } = req.body;

    if (!email || !County || !Constituency || !Street || !Estate || !Floor || !HouseNo) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const query = `
        INSERT INTO deliveryaddresses (email, County, Constituency, Street, Estate, Floor, HouseNo) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(query, [email, County, Constituency, Street, Estate, Floor, HouseNo], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Failed to add new address" });
        }

        res.status(201).json({ message: "Address added successfully" });
    });
});

module.exports=router;