'use strict';

let operations = {};
let models = require('./models/index.js');

operations.getOperations = (req,res) => {
	let order = req.query.order || 1; 
	if(order !== 1) {
		order = order.toLowerCase() === 'asc' ? 1 : -1;
	}
	models.operations.find({},{'__v':0}, function(err,docs) {
		if(err) {
			res.send({
				error: err			
			});
		}
		else {
			res.send({
				operations: docs,
				count: docs.length
			});
		};
	}).sort({name: order});
};


module.exports = operations;