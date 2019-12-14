const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const auth = require("../middleware/auth");

// @route     GET /auth
// @desc      Get user id from token / search user in DB
// @access    Private

router.get('/', auth, async (req, res) => {
  console.log(req.user.id);
  try {
    const foundUser = await User.findById(req.user.id).select("-password");
    console.log(foundUser);
    res.status(200).json(foundUser);
  
  } catch (err) {
    console.log(err);
    res.json({error: "No such user"});
  }
});

// @route     POST /auth
// @desc      Login user and send new token
// @access    Public

router.post('/', async (req, res) => {
  const {email, password} = req.body;

  try {
    // find user with email
    const foundUser = await User.findOne({email});
    if (!foundUser) return res.status(400).json({error: "Invalid email"})

    // payload for jwt
    const payload = {
      user: {
        id: foundUser.id
      }
    };
    // jwt creating token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 36000
    });

    // checking password with bcrypt
    const passwordValid = await bcrypt.compare(password, foundUser.password);

    // sending token
    if (passwordValid) {
      res.status(200).json({token})
    } else {
      res.status(400).json({error: "Invalid password"})
    }

  } catch (err){
    console.log(err);
    res.json({error: "Server error"})
}
})

module.exports = router;