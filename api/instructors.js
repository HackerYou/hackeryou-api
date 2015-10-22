'use strict';

let models = require('./models/index.js');

let instructors = {};

instructors.getInstructors = (req,res) => {
	let order = req.query.order || 1;
	if(order !== 1) {
		order = order.toLowerCase() === 'asc' ? 1 : -1;
	}
	models.instructors.find({},{'__v' : 0}, (err,docs) => {
		if(err) {
			res.send({
				error: err
			});
		}
		else {
			res.send({
				instructors: docs,
				count: docs.length
			});
		}
	}).sort({name: order});
};


module.exports = instructors;