const express = require("express");
const router = express.Router();
const connection = require("../database");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/newProduct', upload.single("productImagePath"), (req, res) => {
    const { productName, Category, Price } = req.body;
    const productImagePath = req.file ? `/uploads/${req.file.filename}` : null; 

    if (!productName || !Category || !Price || !productImagePath) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    const query = "INSERT INTO products (productName, Category, Price, productImagePath) VALUES (?, ?, ?, ?)";
    connection.query(query, [productName, Category, Price, productImagePath], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Product added successfully!", productID: results.insertId });
    });
});
router.get("/products",(req,res)=>{
    var query="SELECT * FROM PRODUCTS";
    connection.query(query,function(error,results){
        if(error){
            console.error(error);
            return res.status(500).json({error:"Catalog retrieval failure"})

        }
        res.status(201).json({message:"Catalog retieved successfully", products:results})
    })
})
module.exports = router;
