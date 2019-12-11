const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const auth = require("../middleware/auth");

// get user with AUTH middleware

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


// login path

// router.post('/', async (req, res) => {
//   const {email, password} = req.body;

//   try {
//     // find user with email
//     const foundUser = User.findOne({email});

//     // checking password with bcrypt

//   } catch (err){
//     console.log(err);
//     res.json({error: "Server error"})
// }
// })

module.exports = router;