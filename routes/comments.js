const Cars = require('../models/cars');
const express = require('express');
const router = express.Router();

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
    
// router.get('/cars/:id', (req, res) => {
//     const id = req.params.id
//     Cars.findById(id)
//         .then((car) => {
//             console.log(car)
//             // car.Comments.id(req.body)
//         })
//     })

 
    
 
         
        
 
            



// router.post('/', (req, res) => {
// 	Cars.create(req.body)
// 	.then((data) => {
// 		res.redirect('/cars')
// 	})
// })


module.exports = router
