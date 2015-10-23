'use strict';

let key = {};
let models = require('./models/index.js');
let bcrypt = require('bcrypt');

key.getKey = (req,res) => {
	let query = req.body;
	console.log(req);
	let apiKey = bcrypt.hashSync(query.email,10);

	models.keys.find({email: query.email}, (err,doc) => {
		if(err) {
			res.send({
				error: err
			});
		}
		else if (doc.length > 0) {
			res.send({
				success: 'Key already there'
			})
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

module.exports = key;