/*========================================
		DEPENDENCIES
========================================*/

const express = require('express');
const Cars = require('../models/cars');
const router = express.Router();

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
router.use((req, res, next) => {
	if (req.session.loggedIn) {
	  next();
	} else {
	  res.redirect("/user/login");
	}
  });

/*========================================
		INDEX
========================================*/
// ALL ROUTES START WITH /CARS IN BROWSER URL WHEN USING ROUTER
router.get("/", async (req, res) => {
	// find all the cars
	await Cars.find({ username: req.session.username })
	  // RENDER CAR INDEX PAGE AND GRAB THE DATA
	  .then((data) => {
		// console.log(data);
		res.render("cars/index", { data });
	  })
	  // send error as json if they aren't
	  .catch((error) => {
		// console.log(error);
		res.json({ error });
	  });
});
  
/*========================================
		NEW
========================================*/
// ADD A NEW CAR FORM
router.get('/new', (req, res) => {
 	res.render('cars/new')
})
 
/*========================================
		DELETE
========================================*/
// DELETE A CAR
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
// GRAB ID FOR SPECIFIED CAR AND UPDATE DATA IN BODY (SCHEMA INFO)
router.put('/:id', async (req, res) => {
	const id = req.params.id
	 await Cars.findByIdAndUpdate(id, req.body)
		.then((data) => {
			// console.log(req.body)
			res.redirect('/cars')
		})
		.catch((error) => {
			// console.log(error);
			res.json({ error });
		  });
	});
	
// create route
router.post("/", (req, res) => {
	// check if the readyToEat property should be true or false
	// req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
	// add username to req.body to track related user
	req.body.username = req.session.username;
	// create the new car
	Cars.create(req.body)
	  .then((car) => {
		// redirect user to index page if successfully created item
		res.redirect("/cars");
	  })
	  // send error as json
	  .catch((error) => {
		console.log(error);
		res.json({ error });
	  });
  });
  
/*========================================
		EDIT
========================================*/
// EDIT EXISTING CAR
router.get("/:id/edit", async (req, res) => {
	// SET ID VARIABLE
	const carId = req.params.id;
	// FIND CAR IN DB
	await Cars.findById(carId)
	  .then((data) => {
		// RENDER PAGE AND SEND DATA OF SPECIFIED CAR
		  res.render("cars/edit", { data } );
	  })
	  // send error as json
	  .catch((error) => {
		// console.log(error);
		res.json({ error });
	  });
  });

/*========================================
		SHOW
========================================*/
// GRAB CAR BY ID AND RENDER SHOW PAGE FOR IT
router.get('/:id', async (req, res) => {
	const id = req.params.id
	const carId = Cars.findById(id)
	const commentId = carId.Comments
	// console.log(carId)
	// Assign variable to specific ID
	Cars.findById(id)
		.then((data) => {
			res.render('cars/show', { data })
			// console.log(data)
		})
	.catch((error) => {
		// console.log(error);
		res.json({ error });
	  });
});

module.exports = router;
