const express = require("express");
const router = express.Router();
const connection = require("../database");
router.get('/cartProducts', (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    const query = `SELECT * FROM shopping_cart WHERE email = ?`;

    connection.query(query, [email], (error, results) => {
        if (error) {
            console.error("Database fetch error:", error);
            return res.status(500).json({ error: "Failed to fetch cart items", details: error });
        }

        console.log("Fetched cart data:", results);
        res.json({ carts: results });
    });
});

router.post('/addtoCart', (req, res) => {
    const cartItems = req.body; 
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json({ error: "Invalid cart data" });
    }

    const values = cartItems.map(item => [
        item.productID,
        item.email,
        item.quantity,
        item.productName,      
        item.price,         
        item.productImagePath  
    ]);

    const insertQuery = `INSERT INTO shopping_cart (productID, email, quantity, productName, Price, productImagePath) VALUES ?`;

    connection.query(insertQuery, [values], (error, results) => {
        if (error) {
            console.error("Insert error:", error);
            return res.status(500).json({ error: "Failed to add items to cart" });
        }
        res.json({ message: "Items added to cart successfully" });
    });
});


module.exports=router;