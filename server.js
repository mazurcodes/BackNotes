const express = require('express');
const path = require("path");

// Server
const app = express();

// Database


// Paths
const publicPath = path.join(__dirname, 'public')

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath));

// Routers
const mdRouter = require('./routes/markdown');

// Routes
app.use('/markdown', mdRouter);

// Disabling some response fields 
app.disable("x-powered-by");

// Server listening
app.listen(3000, (err) => {
  if (err) return console.log(err);
  console.log("Server is up and running on http://localhost:3000");
})