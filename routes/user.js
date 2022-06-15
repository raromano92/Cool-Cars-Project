////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const User = require("../models/users");
const bcrypt = require("bcryptjs");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// SIGNUP BUTTON ON INDEX PAGE TAKE YOU TO SIGNUP PAGE
router.get("/signup", (req, res) => {
  res.render("users/signup");
});

// TAKES YOU TO THE LOGIN PAGE
router.get("/login", (req, res) => {
  res.render("users/login");
});

// LOGIN THEN REDIRECTED TO MAIN CARS PAGE
router.post("/login", (req, res) => {
  res.redirect("/cars");
});

/*========================================
		SIGNUP RESPONSE
========================================*/

router.post("/signup", async (req, res) => {
	// encrypt password
	req.body.password = await bcrypt.hash(
	  req.body.password,
	  await bcrypt.genSalt(10)
	);
	// create the new user
	User.create(req.body)
	  .then((user) => {
		// redirect to login page
		res.redirect("/user/login");
	  })
	  .catch((error) => {
		// send error as json
		console.log(error);
		res.json({ error });
	  });
  });
  

/*========================================
		LOGIN RESPONSE
========================================*/
router.post("/login", async (req, res) => {
	// get the data from the request body
	const { username, password } = req.body;
	// search for the user
	User.findOne({ username })
	  .then(async (user) => {
		// check if user exists
		if (user) {
		  // compare password
		  const result = await bcrypt.compare(password, user.password);
		  if (result) {
			// store some properties in the session object
			req.session.username = username;
			req.session.loggedIn = true;
			// redirect to cars page if successful
			res.redirect("/cars");
		  } else {
			// error if password doesn't match
			res.json({ error: "password doesn't match" });
		  }
		} else {
		  // send error if user doesn't exist
		  res.json({ error: "user doesn't exist" });
		}
	  })
	  .catch((error) => {
		// send error as json
		console.log(error);
		res.json({ error });
	  });
  });
  


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;

