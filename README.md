#HackerYou API [![Build Status](https://travis-ci.org/HackerYou/hackeryou-api.svg)](https://travis-ci.org/HackerYou/hackeryou-api)
A simple API for the HackerYou community. It contains all the alumni, instructors and operations staff information.

#Why?
Mostly this is for learning purposes. Allowing students to practice AJAX using the data, and ultimately allowing students the ability to contribute to the API. For example the API key process is not the most robust, but it allows students a way to practice passing data to an API.

###Authorization 
In order to make requests to the HackerYou API you need to first obtain an API key. Getting a key is easy, you need to make a POST request to `/key` and provide your email address, you will then be returned an `key` that you can use for your requests!

##Routes

###Key
####`/key`
<strong>POST</strong> _Return api key for use_

Params | Value | Description
------ | ---- | ------
`email` : string | `your-email` | Api key to make requests


####`/key`
<strong>GET</strong> _Return api key based on email provided_

Params | Value | Description
------ | ---- | ------
`email` : string | `your-email` | Api key registered to email


###Students
###`/students`
<strong>GET</strong> _Return all students_

Params | Value | Description
------ | ---- | ------
`key` : string | `your-api-key` |  Api key to make requests
`order` : string | `desc`<br>`asc` | Used to sort the order of students based on name

###`/students/:cohort/:year`
<strong>GET</strong> _Return all students by cohort and year_

Params | Value | Description
------ | ------ | ------
`key` : string | `your-api-key` |  Api key to make requests
`order` : string | `desc`<br>`asc` | Used to sort the order of students based on name

###Operations
###`/operations`
<strong>GET</strong> _Return all operations staff_

Params | Value | Description
------ | ------ | ------
`key` : string | `your-api-key` | Api key to make requests
`order` : string | `desc`<br>`asc` | Used to sort the order of students based on name


###Instructors
###`/instructors`
<strong>GET</strong> _Return all instructors_

Params | Value | Description
------ | ------ | ------
`key` : string | `your-api-key` | Api key to make requests
`order` : string | `desc`<br>`asc` | Used to sort the order of students based on name




##Importer

Used to scrape the HackerYou website to gather students information

##TODO
Get current students/not just alumni
Add deploy step after Travis CI pass. Either with a simple bash script or [shipit](https://github.com/shipitjs/shipit) file.

##Contributing
Please fork the repo and make pull requests! 
To get started run `npm install`, start an instance of mongoDB. In order to get the initial data you will have to run `node importer.js` with either `team` or `students` as an argument.

	node importer.js team


