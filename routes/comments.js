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

// DELETE A COMMENT FROM THE SHOW PAGE TIED TO THE CAR ID
router.delete('/comments/:id/', async (req, res) => {
    const id = req.params.id
    const carId = req.body.carId
    // console.log(req.params)
    const carCom = await Cars.findById(carId)
    await carCom.Comments.remove({ _id: id })
    carCom.save(function (err) {
        res.redirect(`/cars/${carId}`)
        
    })
});
    
    module.exports = router;
