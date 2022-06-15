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

// The Signup Routes (Get => form, post => submit form)
router.get("/signup", (req, res) => {
  res.render("users/signup.liquid");
});

router.post("/signup", (req, res) => {
  res.send("signup");
});

// The login Routes (Get => form, post => submit form)
router.get("/login", (req, res) => {
  res.render("user/login.liquid");
});

router.post("/login", (req, res) => {
  res.send("login");
});

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
  
//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;

