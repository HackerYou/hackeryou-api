'use strict';

let expect = require('expect.js');
let instructors = require('../../api/instructors.js');
let mongoose = require('mongoose');

describe('Instructors API', () => {
	before(() => {
		mongoose.connect('mongodb://localhost/hackeryou-api');
	});
	after(() => {
		mongoose.disconnect();
	});
	it('should return an object', (done) => {
		instructors.getInstructors({query:{}}, {
			send(data) {
				expect(data).to.be.an('object');
				expect(data.instructors.length).to.be.above(0);
				done();
			}
		});
	});
	it('should return instructor information', (done) => {
		instructors.getInstructors({query: ''}, {
			send(data) {
				let instructor = data.instructors[0];
				expect(instructor).to.be.an('object');
				done();
			}
		});
	});
});