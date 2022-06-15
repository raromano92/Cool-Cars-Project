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

// router.delete('/cars/:id/:comments', (req, res) => {
//     Cars.
// })

// router.put('/cars/:id/:Comments', async (req, res) => {
// 	// get the id from params
// 	let carId = req.params.id;
// 	let id = req.params.Comments;
// 	Cars.findById(carId)
// 		.then((car) =>
// 			car.updateOne(
// 				{
// 					Comments: {
// 						_id: {
// 							$in: ['62a9ffa5e946556848b27016'],
// 						},
// 					},
// 				},
// 				{
// 					$pull: {
// 						Comments: {
// 							_id: {
// 								$in: ['62a9ffa5e946556848b27016'],
// 							},
// 						},
// 					},
// 				}
// 			)
// 		)
// 		.then(() => {
// 			res.redirect(`/cars/${carId}`);
// 		})

// 		.catch((error) => {
// 			// console.log(error);
// 			res.json({ error });
// 		});
// });

router.put("/cars/:id/:index/:Comments", function(req,res){
    let comId = req.params.Comments.id;
    let index = req.params.index;
    Cars.findOne({Comments: comId},function(err,collection){
        if(err){
            console.log(err);
        } else{
            let idOfRemove = Cars.comId[index];
            Cars.findOneAndUpdate({Comments: comId},{$pull:{ Comments:{ _id: idOfRemove}}}, function(err, removedComment){
                if(err){
                    console.log(err);
                } else{
                    console.log(idOfRemove)
                }
            })
        }
    })
});


Cars.findById( function (req, car)
{  		
    let carId = req.params.id
	if (!err) {
    	//we can remove a user by Id rather than looping over an array 
    	carId.Comments("62aa0e73c9d94bb9061b4757").remove();
        carId.save(function (err) {
  			// do something
	 	});
	}
});


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

// router.delete('/cars/:id/:Comments', (req, res) => {
//     const id = req.params.Comments
//     Cars.findByIdAndDelete(id, function (err) {
//         if (err) console.log(err);
//         console.log("Comment Deleted!")

//     });

//     // note.Comments.remove(req.body)
// });

// router.post('/', (req, res) => {
// 	Cars.create(req.body)
// 	.then((data) => {
// 		res.redirect('/cars')
// 	})
// })

module.exports = router;
