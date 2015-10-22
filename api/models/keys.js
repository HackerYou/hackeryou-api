'use strict';

let mongoose = require('mongoose');

let schema = new mongoose.Schema({
	key: String,
	email: String
});

module.exports = mongoose.model('Key', schema);