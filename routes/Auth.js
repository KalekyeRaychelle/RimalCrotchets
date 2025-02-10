const express = require("express");
const router = express.Router();
const connection = require("../database");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();
git
router.post("/signup", async (req, res) => {
  const { fname, lname, phoneNo, email, passwd, conpasswd } = req.body;

  if (passwd !== conpasswd) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  if (passwd.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters long" });
  }

  if (!/[A-Z]/.test(passwd)) {
    return res.status(400).json({ error: "Password must contain at least one uppercase letter" });
  }

  if (!/[0-9]/.test(passwd)) {
    return res.status(400).json({ error: "Password must contain at least one digit" });
  }

  if (!/[!@#$%^&*]/.test(passwd)) {
    return res.status(400).json({ error: "Password must contain at least one special character" });
  }

  try {
    const hashedPasswd = await argon2.hash(passwd);
    const query = `INSERT INTO users(fname, lname, phoneNo, email, passwd) VALUES(?,?,?,?,?)`;
    connection.query(query, [fname, lname, phoneNo, email, hashedPasswd], (error, results) => {
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

router.post("/login", (req, res) => {
  const { email, passwd } = req.body;
  const query = `SELECT * FROM users WHERE email=?`;

  connection.query(query, [email], async (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred. Please try again later" });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const user = results[0];
    const storedPassword = user.passwd;

    try {
      if (!(await argon2.verify(storedPassword, passwd))) {
        return res.status(400).json({ error: "Incorrect password. Try again" });
      }

      const token = jwt.sign(
        { email: user.email, fname: user.fname, lname: user.lname },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Login successful!",
        token,
        user: { email: user.email, fname: user.fname, lname: user.lname },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred. Please try again later." });
    }
  });
});

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Welcome to your profile!", user: req.user });
});

module.exports = router;
