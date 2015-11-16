'use strict';

let keys = require('../../api/keys.js');
let models = require('../../api/models/index.js');
let expect = require('expect.js');
let mongoose = require('mongoose');

describe('Keys API', () => {
	before(() => {
		mongoose.connect('mongodb://localhost/hackeryou-api');
	});
	after(() => {
		models.keys.find({email:'test@test.com'},(err,doc) => {
			doc[0].remove();
		});
		mongoose.disconnect();
	});
	it('should create a key', (done) => {
		keys.getKey({
			query: {},
			body:{
				email: 'test@test.com'
			}
		},{
			send(data) {
				expect(data).to.be.an('object');
				done();
			}
		});
	});
	it('should let user know that a key exists', (done) => {
		keys.getKey({
			query: {},
			body:{
				email: 'test@test.com'
			}
		},{
			send(data) {
				expect(data.message).to.be.an('string');
				expect(data.message).to.be.eql('Key for email already exists'); 
				done();
			}
		});
	});
	it('should display a key', (done) => {
		keys.getKey({
			query: {
				email: 'test@test.com'
			},
			body:{}
		}, {
			send(data) {
				expect(data.response.email).to.be.eql('test@test.com');
				done();
			}
		})
	});
});







