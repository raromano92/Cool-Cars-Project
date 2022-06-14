const mongoose = require('./connection');


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

const Cars = model('Cars', carsSchema);

module.exports = Cars;
