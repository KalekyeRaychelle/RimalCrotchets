const express= require('express')
const app=express()
const cors = require("cors");
app.use(cors({ origin: "http://localhost:5900" }));
app.use(express.json()); 
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend!" });
});

app.listen(7700)

