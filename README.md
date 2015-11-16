#HackerYou API [![Build Status](https://travis-ci.org/HackerYou/hackeryou-api.svg)](https://travis-ci.org/HackerYou/hackeryou-api)
A simple API for the HackerYou community. It contains all the alumni, instructors and operations staff information.

#Why?
Mostly this is for learning purposes. Allowing students to practice AJAX using the data, and ultimately allowing students the ability to contribute to the API. For example the API key process is not the most robust, but it allows students a way to practice passing data to an API.

###Authorization 
In order to make requests to the HackerYou API you need to first obtain an API key. Getting a key is easy, you need to make a POST request to `/key` and provide your email address, you will then be returned an `key` that you can use for your requests!

##Routes

All requests need to be prefixed with `http://api.hackeryou.com/v1/`. 

###Key
####`/key`
**POST** or **GET** _Return or register an api key for use based on email provided_

Params | Value | Description
------ | ---- | ------
`email` : string | `your-email` | Api key to make requests

**Examples:** `http://api.hackeryou.com/v1/key?email=snickers@example.com` 

####Sample Response 

*New Key*

	{
	  "response": {
	    "key": "$2a$10$ifelhq/xoaa3t0TTWsrz2eXx.6VyV26z92zuN.e68SosdHwnuyF/q",
	    "email": "tes@tes.com",
	  }
	}
	
*Key Exists*

	{
	  "response": {
	    "key": "$2a$10$ifelhq/xoaa3t0TTWsrz2eXx.6VyV26z92zuN.e68SosdHwnuyF/q",
	    "email": "tes@tes.com"
	  },
	  "message": "Key for email already exists"
	}



###Students
###`/students`
<strong>GET</strong> _Return all students_

Params | Value | Description
------ | ---- | ------
`key` : string | `your-api-key` |  Api key to make requests
`order` : string | `desc`<br>`asc` | Used to sort the order of students based on name

####Sample Response 

	{
	  "students": [
	    {
	      "_id": "562e98353f0007bf9713d9d0",
	      "name": "Adam Kendal",
	      "photo": "http://hackeryou.com/wp-content/uploads/2015/07/AdamKendal-230x230.jpg",
	      "location": "Toronto, Ontario",
	      "cohort": {
	        "year": 2015,
	        "season": "Summer"
	      },
	      "social": {
	        "website": "http://adamkendal.ca",
	        "github": "http://github.com/abkendal",
	        "twitter": "http://twitter.com/abkendal"
	      },
	      "job": {
	        "position": "Jr. Front-End Developer (contract) ",
	        "location": "Nurun"
	      }
	    }
	  ],
	  "count": 1
	}

###`/students/:cohort/:year`
<strong>GET</strong> _Return all students by cohort and year_

Params | Value | Description
------ | ------ | ------
`key` : string | `your-api-key` |  Api key to make requests
`order` : string | `desc`<br>`asc` | Used to sort the order of students based on name

**Examples:** `http://api.hackeryou.com/v1/summer/2015?key=yourkey`

####Sample Response 
	Same as the above

###Operations
###`/operations`
<strong>GET</strong> _Return all operations staff_

Params | Value | Description
------ | ------ | ------
`key` : string | `your-api-key` | Api key to make requests
`order` : string | `desc`<br>`asc` | Used to sort the order of students based on name

####Sample Response 

	{
	  "operations": [
	    {
	      "_id": "562e98353f0007bf9713d9d1",
	      "name": "Heather Payne",
	      "role": "CEO",
	      "photo": "http://hackeryou.com/wp-content/uploads/2014/11/team-heatherpayne-@2x1-530x462.jpg",
	      "social": {
	        "twitter": "http://twitter.com/heatherpayne",
	        "website": "http://heatherpayne.ca",
	        "email": "heather@hackeryou.com"
	      }
	    }
	  ],
	  "count": 1
	}


###Instructors
###`/instructors`
<strong>GET</strong> _Return all instructors_

Params | Value | Description
------ | ------ | ------
`key` : string | `your-api-key` | Api key to make requests
`order` : string | `desc`<br>`asc` | Used to sort the order of students based on name

####Sample Response 

	{
	  "instructors": [
	    {
	      "_id": "562e98353f0007bf9713d9cf",
	      "name": "Anne Thomas",
	      "role": "Lead Instructor, Web Development",
	      "photo": "http://hackeryou.com/wp-content/uploads/2014/12/Anne-530x462.jpg",
	      "social": {
	        "twitter": "http://twitter.com/AlfalfaAnne",
	        "github": "http://github.com/AlfalfaAnne"
	      }
	    }
	  ],
	  "count": 1
	}


##Importer

Used to scrape the HackerYou website to gather students information

##TODO
Get current students/not just alumni
Add deploy step after Travis CI pass. Either with a simple bash script or [shipit](https://github.com/shipitjs/shipit) file.

##Contributing
Please fork the repo and make pull requests! 
To get started run `npm install`, start an instance of mongoDB. In order to get the initial data you will have to run `node importer.js` with either `team` or `students` as an argument.

	node importer.js team


