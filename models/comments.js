const Cars = require('../models/cars')

module.exports = {
    create
}

function create(req, res) {
    Cars.findById(req.params.id, function (err, car) {
        car.comments.push(req.body);
        car.save(function (err) {
            res.redirect(`/cars/${car._id}`);
        });
    });
}