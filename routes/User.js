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


router.get('/Adresses',async (req,res)=>{
    var query="SELECT * FROM deliveryaddresses";
    connection.query(query,function(error,results){
        if(error){
            console.error(error)
            return res.status(500).json({error:"Address retrieval failure"})

        }
        res.status(201).json({message:"Address retrieval successful", adresses:results})

    })
})
module.exports=router;