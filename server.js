'use strict';

let express = require('express');
let app = express();
let api =  require('./api/index.js');
let bodyParser = require('body-parser');
let keys = require('./api/models/keys.js');

app.use(bodyParser.json());

function authRoute(req,res,next) {
	let query = req.query;
	if(!query.key) {
		res.status(409).send({
			error: 'Must pass api key for request'
		});
	}
	else {
		keys.find({key:query.key},(err,doc) => {
			if(err) {
				res.status(409).send({
					error: err
				});
			}
			next();
		});
	}
}

app.get('/', (req,res) => {
	res.send('Hi');
});

//Keys
app.post('/v1/key', api.keys.getKey);

//Students
app.get('/v1/students', authRoute, api.students.getStudents);
app.get('/v1/students/:cohort/:year', authRoute, api.students.getByCohort);

//Operations
app.get('/v1/operations', authRoute, api.operations.getOperations);

//Instructors
app.get('/v1/instructors', authRoute, api.instructors.getInstructors);

app.listen(3500);
console.log("Listening on port :3500");





