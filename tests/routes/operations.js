'use strict';

let expect = require('expect.js');
let operations = require('../../api/operations.js');
let mongoose = require('mongoose');


describe('Operations API', () => {
	before(() => {
		mongoose.connect('mongodb://localhost/hackeryou-api');
	});
	after(() => {
		mongoose.disconnect();
	});
	it('should be return an object',(done) => {
		operations.getOperations({query:{}},{
			send(data) {
				expect(data).to.be.an('object');
				expect(data.operations.length).to.be.above(0);
				done();
			}
		});
	});
	it('should contain operator information', (done) => {
		operations.getOperations({query: ''}, {
			send(data) {
				let operator = data.operations[0];
				expect(operator).to.be.an('object')
				done();
			}
		});
	});
});