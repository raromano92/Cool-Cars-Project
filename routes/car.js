/*========================================
		DEPENDENCIES
========================================*/

const express = require('express');
const Cars = require('../models/cars');
const router = express.Router();

/*========================================
		INDEX
========================================*/
// ALL ROUTES START WITH /CARS IN BROWSER URL WHEN USING ROUTER
router.get("/", async (req, res) => {
	// find all the fruits
	await Cars.find({})
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
 	res.render('cars/new')
})
 
/*========================================
		DELETE
========================================*/
router.delete('/:id', (req, res) => {
	const id = req.params.id
	Cars.findByIdAndRemove(id)
		.then((data) => {
		// Redirect back home
		res.redirect('/cars')
	})
})

/*========================================
		UPDATE
========================================*/
router.put('/:id', async (req, res) => {
	const id = req.params.id
	 await Cars.findByIdAndUpdate(id, req.body)
		.then((data) => {
			console.log(req.body)
			res.redirect('/cars')
		})
		.catch((error) => {
			// console.log(error);
			res.json({ error });
		  });
	});
	
	








/*========================================
		CREATE
========================================*/
router.post('/', (req, res) => {
	Cars.create(req.body)
	.then((data) => {
		res.redirect('/cars')
	})
})

/*========================================
		EDIT
========================================*/
// edit route
router.get("/:id/edit", async (req, res) => {
	// get the id from params
	const carId = req.params.id;
	// get the fruit from the database
	await Cars.findById(carId)
	  .then((data) => {
		// render edit page and send fruit data
		  res.render("cars/edit", { data } );
	  })
	  // send error as json
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
	Cars.findById(id)
		.then((data) => {
		res.render('cars/show', { data })
	})
	.catch((error) => {
		console.log(error);
		res.json({ error });
	  });
});
  

module.exports = router;
