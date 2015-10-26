'use strict';

let expect = require('expect.js');
let students = require('../../api/students');
let mongoose = require('mongoose');

describe('Student API', () => {
	before(() => {
		mongoose.connect('mongodb://localhost/hackeryou-api');
	});
	after(() => {
		mongoose.disconnect();
	});
	it('should return an object',(done) => {
		return students.getStudents({query:{}},{
			send(data) {
				expect(data.students).to.be.an('object');
				expect(data.students.length).to.be.above(0);
				done();
			}
		})
	});
	it('should contain student information',(done) => {
		return students.getStudents({query:{}},{
			send(data)  {
				let student = data.students[0];
				expect(student).to.be.an('object');
				done();
			}
		})
	});
});