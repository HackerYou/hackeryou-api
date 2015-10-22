'use strict';

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hackeryou-api');

let keys = require('./keys.js');
let students = require('./students.js');
let operations = require('./operations.js');
let instructors = require('./instructors.js');

module.exports = {
	keys: keys,
	students: students,
	operations: operations,
	instructors: instructors
};