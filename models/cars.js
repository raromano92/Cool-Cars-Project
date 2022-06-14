const mongoose = require('./connection');

const Schema = mongoose.Schema

const commentsSchema = new Schema({
	Comments: {
		type: String,
	},
	Rating: {type: Number, min: 1, max: 5, default: 5}
  }, {
	timestamps: true
  });


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
	Comments: 
		[commentsSchema]
  });


const Cars = mongoose.model('Cars', carsSchema);

module.exports = Cars;
