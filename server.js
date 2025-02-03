const express= require('express')
const app=express()
const cors = require("cors");
const connection = require('./database');



app.use(cors({ origin: "http://localhost:5900" }));
app.use(express.json()); 
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend!" });
});
const authRouter= require('./routes/Auth')
app.use('/api/auth',authRouter)
app.listen(7700)

