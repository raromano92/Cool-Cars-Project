/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const PORT = 5000


/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express(), {root: [path.resolve(__dirname, 'views/')]})

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically (html, css, etc.)

// middleware to setup session
app.use(
    session({
      secret: process.env.SECRET,
      store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
      saveUninitialized: true,
      resave: false,
    })
  );

////////////////////////////////////////////
// Routers
////////////////////////////////////////////

// const carRouter = require("./controllers/cars");


/*========================================
        Routes
========================================*/


// app.use("/cars", carRouter); // send all "/cars" routes to car router
 // send all "/user" routes to user router

app.get("/", (req, res) => {
    res.render("index.liquid");
  });
  

  
const userRouter = require('./routes/users');
app.use("/users", userRouter);


app.listen(5000, (req, res) => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`)
  })