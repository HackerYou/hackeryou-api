'use strict';

let cheerio = require('cheerio');
let request = require('request');

let mongoose = require('mongoose');
let models = require('./api/models/index.js');
let importOption = process.argv[2];

mongoose.connect('mongodb://localhost/hackeryou-api');

/**
* Strip out student urls 
* @param {obect} element
* @return {object} 
**/

function getUrls(element) {
	//Check what the url is
	let urls = {};
	let $ = cheerio.load(element);
	let links = $(element).find('a');

	links.each(function(i,el) {
		let link = $(this).attr('href')

		if(link.match(/twitter/)) {
			urls.twitter = link;
		}
		else if(link.match(/github/)) {
			urls.github = link;
		}
		else if(link.match(/linkedin/)) {
			urls.linkedin = link;
		}
		else if(link.match(/mailto/)) {
			urls.email = link.split(':')[1];
		}
		else if(link.length > 0) {
			urls.website = link;
		}
	});

	return urls;
}


/**
* Strip class of student to get cohort
* @param {object} element
* @return {object} 
**/

function getCohort(element) {
	let cohort = {};
	let $ = cheerio.load(element);
	let classes = $(element).attr('class').split(' ');

	classes.forEach((el,i) => {
		let numberPattern = /[0-9]/;
		if(el.match(numberPattern)) {
			let yearIndex = el.match(numberPattern).index;
			let year = el.substring(el.match(numberPattern).index,el.length);
			let season = el.substring(0,yearIndex);
			cohort.year = year;
			cohort.season = ((s) => {
				if(s === 'w') {
					return 'Winter';
				}
				else if(s === 'su') {
					return 'Summer';
				}
				else if(s === 'sp') {
					return 'Spring';
				} 
				else {
					return 'Fall';
				}
			})(season);

		}
	});

	return cohort;
}

if(importOption === 'students') {

	request('http://hackeryou.com/alumni', (err,res,html) => {
		if(err) {
			throw err
		}
		else {
			let $ = cheerio.load(html);
			$('.studentSingle').each(function(i,student) {
				let name = $(this).find('.studentName').text().trim();
				let info = $(this).find('p').eq(1).html().trim().split('<br>');
				let photo = $(this).find('.attachment-headshot').attr('src');
				
				let company = $(this).find('p').eq(1).find('a').text();
				let companyUrl = $(this).find('p').eq(1).find('a').attr('href');

				let model = {
					name: name,
					social: getUrls($(this).find('ul')),
					photo: photo,
					location: (info[info.length - 1]).replace(/[\n\t]+/g,''),
					job: {
						position: info[0],
						location: (company).replace(/[\n\t]+/g,'').trim(),
						url: companyUrl
					},
					cohort: getCohort(this)
				};
				console.log(model);
				models.students.find({name: model.name}, (err,doc) => {
					if(err) {
						throw err;
					}
					if(doc.length === 0) {
						new models.students(model).save().then(()=> {
							console.log('Adding student'); 
						});
					}
				});
			});
		}
	});

}

if(importOption === 'team') {
	request('http://hackeryou.com/about', (err,res,html) => {
		if(err) {
			throw err
		}
		else {
			let $ = cheerio.load(html);
			$('.teamMember').each(function(i,el) {
				let name = $(this).find('p').eq(0).text();
				let role = $(this).find('.bioTitle').text();
				let photo = $(this).find('img').attr('src');

				let model = {
					name: name,
					role: role,
					social: getUrls(this),
					photo: photo
				};
				if(model.role.match(/instructor/i)) {
					models.instructors.find({name:model.name}, (err,doc) => {
						if(err) {
							throw err;
						}
						if(doc.length === 0) {
							new models
								.instructors(model)
								.save()
								.then(() => console.log('Added instructor'));
						}
					});
				}
				else {
					models.operations.find({name:model.name}, (err, doc) => {
						if(err) {
							throw err;
						}
						if(doc.length === 0) {
							new models
								.operations(model)
								.save()
								.then(() => console.log('Added operations'));
						}
					});
				}
			});
		}
	});
}

