const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	console.log(req.query.name);
	res.send('User Login');
});

router.get('/new', (req, res) => {
	res.send('New User Form');
});

router.get('/:id', (req, res) => {
	res.send(`Get user with id ${req.params.id}`);
});

module.exports = router;
