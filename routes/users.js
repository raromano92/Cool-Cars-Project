const express = require('express');
const router = express.Router();

// MAIN/LOGIN PAGE
router.get("/login", (req, res) => {
	res.render("users/login.liquid");
});

// GOES TO SIGNUP PAGE
router.get("/signup", (req, res) => {
	res.render("users/signup.liquid");
  });
  

router.get('/new', (req, res) => {
	res.send('New User Form');
});

router.get('/:id', (req, res) => {
	res.send(`Get user with id ${req.params.id}`);
});

module.exports = router;
