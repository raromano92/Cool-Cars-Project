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





module.exports = router;
