/*========================================
		DEPENDENCIES
========================================*/

const express = require('express');
const myCars = require('../models/cars');
const router = express.Router();

/*========================================
		INDEX
========================================*/
// ALL ROUTES START WITH /CARS IN BROWSER URL WHEN USING ROUTER
router.get("/", (req, res) => {
	// find all the fruits
	myCars.find({})
	  // render a template after they are found
	  .then((data) => {
		console.log(data);
		res.render("cars/index", { data });
	  })
	  // send error as json if they aren't
	  .catch((error) => {
		console.log(error);
		res.json({ error });
	  });
});
  
/*========================================
		NEW
========================================*/
router.get('/new', (req, res) => {
 	res.render('cars/new.liquid')
 })


/*========================================
		SHOW
========================================*/
router.get('/:id', (req, res) => {
	const id = req.params.id
	// Assign variable to specific ID
	myCars.findById(id)
		.then((data) => {
		res.render('cars/show', { data })
	})
	.catch((error) => {
		console.log(error);
		res.json({ error });
	  });
});
  
/*========================================
		DELETE
========================================*/
router.delete('/:id', (req, res) => {
	const id = req.params.id
	myCars.findByIdAndRemove(id)
		.then((data) => {
		// Redirect back home
		res.redirect('/cars')
	})
})








/*========================================
		CREATE
========================================*/
router.post('/', (req, res) => {
	myCars.create(req.body)
	.then((data) => {
		res.redirect('/cars')
	})
})







module.exports = router;
