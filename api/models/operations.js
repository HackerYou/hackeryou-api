'use strict';

let mongoose = require('mongoose');

let schema = new mongoose.Schema({
	name: String,
	role: String,
	social: {
		twitter: String,
		website: String,
		email: String
	},
	photo: String
});

module.exports = mongoose.model('Operation', schema);