'use strict';

let key = {};
let models = require('./models/index.js');
let bcrypt = require('bcrypt');

key.getKey = (req,res) => {
	var query = Object.keys(req.query).length > 0 ? req.query : req.body;
	if(query.email === undefined) {
		res.send({
			error: 'Missing email parameter.'
		});
		return;
	}
	let apiKey = bcrypt.hashSync(query.email,10);
	models.keys.find({email: query.email}, {__v:0,_id:0}, (err,doc) => {
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
					response: {
						key: apiKey,
						email: query.email						
					}
				});
			});
		}
	});
};

module.exports = key;





