'use strict';
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hackeryou-api');
let models = require('./api/models/index.js');

new models.instructors({
	"name" : "Anne Thomas",
	"role" : "Lead Instructor, Web Development",
	"photo" : "http://hackeryou.com/wp-content/uploads/2014/12/Anne-530x462.jpg",
	"social" : {
		"twitter" : "http://twitter.com/AlfalfaAnne",
		"github" : "http://github.com/AlfalfaAnne"
	}
}).save();

new models.students({
	"name" : "Adam Kendal",
	"photo" : "http://hackeryou.com/wp-content/uploads/2015/07/AdamKendal-230x230.jpg",
	"location" : "Toronto, Ontario",
	"cohort" : {
		"year" : 2015,
		"season" : "Summer"
	},
	"social" : {
		"website" : "http://adamkendal.ca",
		"github" : "http://github.com/abkendal",
		"twitter" : "http://twitter.com/abkendal"
	},
	"job" : {
		"position" : "Jr. Front-End Developer (contract) ",
		"location" : "Nurun"
	}
}).save();

new models.operations({
	"name" : "Heather Payne",
	"role" : "CEO",
	"photo" : "http://hackeryou.com/wp-content/uploads/2014/11/team-heatherpayne-@2x1-530x462.jpg",
	"social" : {
		"twitter" : "http://twitter.com/heatherpayne",
		"website" : "http://heatherpayne.ca",
		"email" : "heather@hackeryou.com"
	}
}).save();

mongoose.disconnect();