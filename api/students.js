'use strict';

let models = require('./models/index.js');
let student = {};
let utils = require('./utils.js');

student.getStudents = (req, res) => {
	let order = req.query.order || 1;
	if(order !== 1) {
		order = order.toLowerCase() === 'asc' ? 1 : -1;
	}
	models.students.find({},{'__v': 0},(err,docs) => {
		if(err) {
			res.send({
				error: err
			});
		}
		else {
			res.send({
				students: docs,
				count: docs.length
			});
		}
	}).sort({name: order});
};

student.getByCohort = (req,res) => {
	let params = req.params;
	let order = req.query.order || 1;
	if(order !== 1) {
		order = order.toLowerCase() === 'asc' ? 1 : -1;
	}
	models.students.find({
		'cohort.year': params.year, 
		'cohort.season': utils.capitalize(params.cohort)
	}, (err,docs) => {
		if(err) {
			res.send({
				error: err
			});
		}
		else {
			res.send({
				students: docs,
				count: docs.length
			});
		}
	}).sort({name:order});
};

module.exports = student;