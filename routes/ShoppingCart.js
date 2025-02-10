const express = require("express");
const router = express.Router();
const connection = require("../database");
const multer = require("multer");
const path = require("path");

router.get('/',(req,res)=>{
    const userEmail=req.query.email;
    if(!userEmail){
        return res.status(400).json({error:"User email is required"})
    }
    var query=`SELECT * FROM shopping_cart WHERE email=?`
    connection.query(query,[userEmail],(err,results)=>{
        if(err){
            console.error("Database error",err);
            return res.status(500).json({error:"Failed to fetch cart items"});
        }
        if(results.length===0){
            return res.json({message:"Your cart is empty",carts:[]})
        }
        res.json({carts:results})
    })
})
module.exports=router;