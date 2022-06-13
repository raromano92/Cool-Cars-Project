const mongoose = require('mongoose');

const carsSchema = new mongoose.Schema({
	Year: Number,
	Make: String,
	Model: String,
	Color: String,
	Price: Number,
	Img: String,
});

module.exports = mongoose.model('Car', carsSchema);
