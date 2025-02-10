const express= require('express')
const app=express()
const cors = require("cors");
const connection = require('./database');

app.use('/uploads', express.static('public/uploads'));
app.use(cors({ origin: "http://localhost:5900" }));
app.use(express.json()); 

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend!" });
});

const authRouter= require('./routes/Auth')
app.use('/api/auth',authRouter)
const CatalogRouter = require('./routes/Catalog');
app.use('/api/Catalog', CatalogRouter);
const CartRouter=require('./routes/ShoppingCart');
app.use('/api/ShoppingCart',CartRouter)
app.listen(7700)

