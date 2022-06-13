///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection');
const Cars = require('./cars');

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

// save the connection in a variable
const db = mongoose.connection;

// Make sure code is not run till connected
db.on('open', () => {
	///////////////////////////////////////////////
	// Write your Seed Code Below
	//////////////////////////////////////////////

	// Run any database queries in this function
	const Cars = [
		{ name: 'Orange', color: 'orange', readyToEat: false },
		{ name: 'Grape', color: 'purple', readyToEat: false },
		{ name: 'Banana', color: 'orange', readyToEat: false },
		{ name: 'Strawberry', color: 'red', readyToEat: false },
		{ name: 'Coconut', color: 'brown', readyToEat: false },
	];

	// Delete all cars
	Cars.deleteMany({}).then((deletedCars) => {
		// add the starter cars
		Cars.create(startCars)
			.then((newCars) => {
				// log the new fruits to confirm their creation
				console.log(newCars);
				db.close();
			})
			.catch((error) => {
				console.log(error);
				db.close();
			});
	});
	///////////////////////////////////////////////
	// Write your Seed Code Above
	//////////////////////////////////////////////
});
