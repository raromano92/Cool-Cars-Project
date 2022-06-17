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
	const commentId = req.params.commentsId
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
router.put('/cars/:id/:commentId', async (req, res) => {
	const id = req.params.id
	const commentId = req.body.commentId
	const carId = await Cars.findById(id, commentId)
	const testing = Cars.findByIdAndUpdate(carId, commentId, { new: true }, function (err, result) {
		console.log(testing)
		// testing.Comments.save()
		if (err) {
		  res.send(err);
		} else {
		  res.send(result);
		}
	  }
	);
  });
	
	
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
