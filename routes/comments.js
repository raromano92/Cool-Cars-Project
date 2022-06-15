const Cars = require('../models/cars');
const express = require('express');
const router = express.Router();

router.delete("/cars/:id/:Comments", (req, res) => {
    // get the id from params
    const id = req.params.Comments;
    // delete the fruit
    Cars.findByIdAndRemove(id)
      .then((comment) => {
        // redirect to main page after deleting
        // res.redirect("/fruits");
      })
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });
      

router.post('/cars/:id', (req, res) => {
    const id = req.params.id
    // console.log('this route is being hit')
    Cars.findById(id)
        .then((car) => {
            // console.log(car)
            car.Comments.push(req.body)
            car.save(function (err) {
                res.redirect(`/cars/${car._id}`)
             }) 
             
		})
		.catch((error) => {
			// console.log(error);
			res.json({ error });
        });
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


module.exports = router
