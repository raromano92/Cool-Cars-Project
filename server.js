/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config(); // Load ENV Variables
const express = require('express'); // import express
const morgan = require('morgan'); //import morgan
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const PORT = process.env.PORT;

/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = require('liquid-express-views')(express(), {
	root: [path.resolve(__dirname, 'views/')],
});

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan('tiny')); //logging
app.use(methodOverride('_method')); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static('public')); // serve files from public statically (html, css, etc.)
app.use(express.json());

// middleware to setup session
app.use(
	session({
		secret: process.env.SECRET,
		store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
		saveUninitialized: true,
		resave: false,
	})
);
// process.env.SECRET
////////////////////////////////////////////
// Routers
////////////////////////////////////////////
const userRouter = require('./routes/user');
const carRouter = require('./routes/car');
const seedRouter = require('./routes/seed');
const commentsRouter = require('./routes/comments');


/*========================================
        Routes
========================================*/

app.get('/user/login', (req, res) => {
	res.render('users/index.liquid');
});

/*========================================
          ROUTERS
  ========================================*/

app.use('/user', userRouter);
app.use('/cars', carRouter);
app.use('/seed', seedRouter);
app.use('/', commentsRouter);


app.listen(PORT, (req, res) => {
	console.log(`SERVER RUNNING ON PORT`);
});

// tseting
