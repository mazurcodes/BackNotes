const express = require('express');
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

// Server
const app = express();

// Database
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}, (err) => {
  err ? console.log("Server error: ", err) : console.log("We're connected to DB...");
})

// Paths
const publicPath = path.join(__dirname, 'public')

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath));

// Routers
const mdRouter = require('./routes/markdown');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users'); 

// Routes
app.use('/markdown', mdRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);

// Disabling some response fields 
app.disable("x-powered-by");

// Server listening
app.listen(5000, (err) => {
  if (err) return console.log(err);
  console.log("Server is up and running on http://localhost:5000");
})