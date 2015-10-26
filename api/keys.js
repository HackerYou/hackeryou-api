'use strict';

let key = {};
let models = require('./models/index.js');
let bcrypt = require('bcrypt');

key.createKey = (req,res) => {
	let query = req.body;
	let apiKey = bcrypt.hashSync(query.email,10);

	models.keys.find({email: query.email}, (err,doc) => {
		if(err) {
			res.send({
				error: err
			});
		}
		else if (doc.length > 0) {
			res.send({
				response:doc[0],
				message: 'Key for email already exists'
			});
		}
		else {
			new models.keys({
				key: apiKey,
				email: query.email
			}).save().then((doc) => {
				res.send({
					key: apiKey,
					email: query.email
				});
			});
		}
	});
};

key.getKey = (req,res) => {
	var query = req.query;

	models.keys.find({email:query.email}, {'__v':0},(err,doc) => {
		if(err) {
			res.send({
				error: err
			});
		}
		else {
			res.send( doc[0] );
		}
	});
};

module.exports = key;





