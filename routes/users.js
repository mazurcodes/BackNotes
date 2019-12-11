const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // check if user with this email is in database
    let userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // if not - create one
    const newUser = new User({ name, email, password });

    // hashing password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    // saving user
    await newUser.save();

    // sending JWT token
    const payload = {
      user: {
        id: newUser.id
      }
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 36000
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
