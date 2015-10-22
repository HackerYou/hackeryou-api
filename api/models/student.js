'use strict';

let mongoose = require('mongoose');

let schema = new mongoose.Schema({
	name: String,
	location: String,
	job: {
		position: String,
		location: String,
		website: String
	},
	photo: String,
	social: {
		linkedIn: String,
		github: String,
		twitter: String,
		website: String
	},
	cohort:  {
		season: String,
		year: Number
	}
});

module.exports = mongoose.model('Student', schema);


