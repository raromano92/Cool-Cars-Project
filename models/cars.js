const mongoose = require('./connection');
// const carz = require('./car');
const { Schema, model } = mongoose;

const carsSchema = new Schema({
	Year: {
		type: Number,
	},
	Make: {
		type: String,
	},
	Model: {
		type: String,
	},
	Color: {
		type: String,
	},
	Price: {
		type: Number,
	},
	Img: {
		type: String,
	},
});

const myCars = model('Car', carsSchema);

module.exports = myCars;
