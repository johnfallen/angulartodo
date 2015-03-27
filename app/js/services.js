/**
 * @fileOverview  	I contain all of the services for the application.
 *
 * @author 			John Allen <jallen@bbg.gov>
 * @version 		1.0.0
 * @module 			services.js
 */
'use strict';

/* Services */
angular.module('myApp.services', [])

/**
 * simple value service from the oritional Angular seed app
 */
.value('version', '0.1')

/**
 * I am the d3 Service. 
 * I am used for scribbleing.
 */
.factory('d3Service', ['$document', '$window', '$q', '$rootScope', function($document, $window, $q, $rootScope) {
	var d = $q.defer(),
	
	d3service = {
		d3: function() { return d.promise; }
	};
  
	function onScriptLoad() {
		// Load client in the browser
		$rootScope.$apply(function() { d.resolve($window.d3); });
	}
	
	var scriptTag = $document[0].createElement('script');
	scriptTag.type = 'text/javascript'; 
	scriptTag.async = true;
	scriptTag.src = 'lib/d3/d3.js';
	scriptTag.onreadystatechange = function () {
		if (this.readyState == 'complete') onScriptLoad();
	}
	
	scriptTag.onload = onScriptLoad;
 
	var s = $document[0].getElementsByTagName('body')[0];
	s.appendChild(scriptTag);

	return d3service;
}])

/**
 * I am the Scribble Service. 
 * I am used for scribbleing.
 */
.factory('ScribbleService', function() {

	var person = {

		firstName : "not",
		lastName : "set",

		getFirstName : function(){
			return this.firstName;
		},
		getLastName : function(){
			return this.lastName;
		},
		getFullName : function(){
			return this.firstName + ' ' + this.lastName;
		},
		setFirstName : function( firstName ){
			this.firstName = firstName;
		},
		setLastName : function( lastName ){
			this.lastName = lastName;
		},
	}

	return {

		// Reverse: I reverse a simple string.
		getPerson : function(firstName, lastName) {

			var result = person;

			if ( typeof firstName != 'undefined') {
				result.setFirstName(firstName);
			}
			
			if ( typeof lastName != 'undefined') {
				result.setLastName(lastName);
			}

			return result;
		}
	}
})

/**
 * I am the Name Trick Service. 
 * I provide basic functions to do things with stings like reverse,
 * ucase, just stupid kinda things.
 *
 */
.factory('nametrickFactory', function() {
	return {

		// Reverse: I reverse a simple string.
		reverse : function(name) {
			return name.split("").reverse().join("");
		},

		// ucase: I upper case a sting.
		ucase: function(string) {
			return string.toUpperCase();
		}
	}
})

/**
 * I am the Moment Service. 
 * I provide date formating via the moment.js lib. I am a wrapper for the 
 * moment.js lib.
 */
.factory('Moment', function() {
	return {
		format : function(date) {
			return moment().format(date);
		}
	};
})

/**
 * I am the Todo Service. 
 * I am the peresitance mechinism for Todos.
 */
.factory('TodoService', [ '$rootScope','CONSTANTS', function($rootScope, CONSTANTS) {

	var cleanUp = function() {
		$rootScope.$broadcast(CONSTANTS.TODO_UPDATED_STRING);
	}

	// the persistance mechnism
	var applicationTasks = [];

	// I return a UUID
	var uniqueid = function (){
		// always start with a letter (for DOM friendlyness)
		var idstr = String.fromCharCode( Math.floor( ( Math.random() * 25 ) + 65 ) );
			do {
				// between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
				var ascicode = Math.floor( ( Math.random() * 42 ) + 48 );
				
				if ( ascicode < 58 || ascicode > 64 ){
					// exclude all chars between : (58) and @ (64)
					idstr += String.fromCharCode(ascicode);    
				}
			} while (idstr.length < 32);

		return (idstr);
	};

	// I return an empty Task object
	var getNewTask = function(){
		
		var task = {}
		task.IDTask = uniqueid();
		task.task = '';

		return task;
	};

	// The API for Todos we return to the controllers
	var ToDoAPI = {
		

		// I delete a task
		delete : function( IDTask ){

			for (var i=0; i < applicationTasks.length; i++) { 
					
				if (applicationTasks[i].IDTask === IDTask){
					 applicationTasks.splice([i], 1);
				}
			}
			// tell the app we updated
			cleanUp();
		},

		// I return an array of tasks. Pass me an ID and I'll filter the tasks.
		get : function( IDTask ){
			
			var result = [];

			// return all
			if (typeof IDTask === 'undefined') {

				result = applicationTasks;
			}

			// filter by id
			else{

				for (var i=0; i < applicationTasks.length; i++) { 
					
					if (applicationTasks[i].IDTask === IDTask){
						result = [applicationTasks[i]]
					}
				}
			}
			return result;
		},

		// I Save or Update a todo
		save : function( IDTask, taskText) {
			
			// new todo
			if ( typeof IDTask === 'undefined' || IDTask === '' ) {
				
				// get a new task object to populate
				var task = getNewTask();
				task.task = taskText;

				// persist
				applicationTasks.push(task);

				// tell the app we updated
				cleanUp();
			}
			
			// update todo
			else {

				// loop over the persisted tasks and update if the id matches
				for (var i=0; i < applicationTasks.length; i++) { 
					
					if ( applicationTasks[i].IDTask === IDTask ){
						
						applicationTasks[i].task = taskText;
					}
				}
			}
		}
	}

	/*
	ToDoAPI.save('',"Foo the bar");
	ToDoAPI.save('',"Sing a song");
	*/

	return ToDoAPI;
}])


// TODO: implement wrapper code for one of the localstorage classes out there.
.factory('storeService', function () {
    
    return {
        
        getData: function (key) {
    
        },

        setData: function (key,data) {
    
        },
        
        removeData: function (key) {
    
        }
    };
});