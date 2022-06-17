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
	// console.log(commentId)
	// FIND CAR COMMENT ID IN DB
	Cars.findById(id)
		.then((car) => {
			// RENDER PAGE AND SEND DATA OF SPECIFIED COMMENT
			console.log(car)
			res.render('comments/edit', { car, id, commentId });
		})
		// // send error as json
		// .catch((error) => {
		// 	// console.log(error);
		// 	res.json({ error });
		// });
});

router.put('/cars/:id/:commentsId', (req, res) => {
	const id = req.params.id
	const commentId = req.params.commentsId
	 Cars.findByIdAndUpdate(id, commentId, req.body)
	.then((comm) => {
		comm.save(function (err) {
			res.redirect('/cars');
		});
		})
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

// EDIT AN EXISTING COMMENT

module.exports = router;
