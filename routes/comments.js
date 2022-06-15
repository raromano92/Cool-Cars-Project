const Cars = require('../models/cars');
const express = require('express');
const router = express.Router();

// POST COMMENTS TO THE REQ.BODY
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

router.delete('/comments/:id/', async (req, res) => {
    const id = req.params.id
    const carId = req.body.carId
    // console.log(req.params)
    const carCom = await Cars.findById(carId)
    await carCom.Comments.remove({ _id: id })
    carCom.save(function (err) {
        res.redirect(`/cars/${carId}`)
        // console.log(carCom)
    })
            // res.redirect('/cars/')
    })
    

    

// UPDATE CAR COMMENT BY ID
// router.put("/cars/:id/:Comments", function(req,res){
//     let comId = req.params.id;
//     const com1 = com
//     let index = req.params.index;
//     Cars.findOne({ Comments: comId }, function (err, collection) {
        
        //         if(err){
        //             console.log(err);
        //         } else{
        //             let idOfRemove = Cars.comId[index];
        //             Cars.findOneAndUpdate({Comments: comId},{$pull:{ Comments:{ _id: idOfRemove}}}, function(err, removedComment){
        //                 if(err){
        //                     console.log(err);
        //                 } else{
        //                     console.log(idOfRemove)
        //                 }
        //             })
        //         }
        //     })
        // });

        // router.put('/cars/:id', async (req, res) => {
        // 	const id = req.params.id
        // 	 await Cars.findByIdAndUpdate(id, req.body)
        // 		.then((comment) => {
        // 			console.log(req.body)
        // 			res.redirect(`/cars/${car._id}`)
        // 		})
        // 		.catch((error) => {
        // 			// console.log(error);
        // 			res.json({ error });
        // 		  });
        // 	});

// router.delete('/cars/:id/', (req, res) => {
//     const carId = Cars.findOne(req.params.id)
//     const commentId = carId.Comments
//     console.log(commentId)
// })

//     // Cars.findByIdAndDelete(carId, function (err) {


// });
    
//     // note.Comments.remove(req.body)
// });

// router.post('/', (req, res) => {
// 	Cars.create(req.body)
// 	.then((data) => {
// 		res.redirect('/cars')
// 	})
// })

    module.exports = router;
