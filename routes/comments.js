const Cars = require('../models/cars');
const express = require('express');
const router = express.Router();

// POST COMMENTS TO THE REQ.BODY OF CAR ID
router.post('/cars/:id', (req, res) => {
	const id = req.params.id;
	// console.log('this route is being hit')
	Cars.findById(id)
		.then((car) => {
			// console.log(car)
			car.Comments.push(req.body);
			car.save(function (err) {
				res.redirect(`/cars/${car._id}`);
			});
		})
		.catch((error) => {
			// console.log(error);
			res.json({ error });
		});
});

router.get('/cars/:id/:commentsId', async (req, res) => {
	// THIS IS THE COMMENT ID PARAM TIED TO THE CAR
	const id = req.params.id;
	const commentId = req.params.commentsId;
	// FIND CAR COMMENT ID IN DB
	Cars.findById(id)
		.then((car) => {
			// RENDER PAGE AND SEND DATA OF SPECIFIED COMMENT
			res.render('comments/edit', { car, id, commentId });
		})
		// send error as json
		.catch((error) => {
			// console.log(error);
			res.json({ error });
		});
});

// EDIT AN EXISTING COMMENT TIED TO THE CAR ID
router.put('/cars/:carId/:commentId', (req, res) => {
	const carId = req.params.carId;
	// console.log("carid", carId); - CAR ID PARAM
	const commentId = req.params.commentId;
	// console.log("comment", commentId) - COMMENT ID PARAM
	Cars.findById(carId)
		.then((car) => {
			// console.log(car); - GRABBING BOTH IDS WITH 'car' param TO RETURN THE TWO
			const carCom = car.Comments.id(commentId);
			// SETTING VARIABLE TO GIVE US THAT EXACT COMMENT 
			// console.log(carCom)
			// IDS ARE OBJECTS, SO USE STRING METHOD TO CONVERT TO STRINGS
			if (String(carCom._id) === String(req.params.commentId)) {
				carCom.Comments = req.body.Comments;
				// console.log(test)
				// **REMEMBER TO LOOP THRU COMMENTS ON EDIT PAGE AND ASSIGN "name" WHICH PULLS FROM SCHEMA PROPERTY**
				return car.save();
			} else {
				return;
			}
		})
		.then((car) => {
			res.redirect(`/cars/${carId}`);
		});
})


	


// DELETE A COMMENT FROM THE SHOW PAGE TIED TO THE CAR ID
router.delete('/comments/:id/', async (req, res) => {
	const id = req.params.id;
	const carId = req.body.carId;
	const carCom = await Cars.findById(carId);
	await carCom.Comments.remove({ _id: id });
	carCom.save(function (err) {
		res.redirect(`/cars/${carId}`);
	});
});

module.exports = router;
