/**
 * @fileOverview  	I contain all the controllers for the application.
 *
 * @author 			John Allen <jallen@bbg.gov>
 * @version 		1.0.0
 * @module 			controllers.js
 */
'use strict';

/* Controllers */
angular.module('myApp.controllers', [])

/*
* ScribbleController
* I am the Scribble controller.
* Use me to scribble
*/
.controller('d3Controller', ['$scope', function($scope){
	
	$scope.greeting = "Resize the page to see the re-rendering";
	
	$scope.data = [
		{name: "Greg", score: 98},
		{name: "Ari", score: 96},
		{name: 'Q', score: 75},
		{name: "Loser", score: 48}
	];
}])

/*
* ScribbleController
* I am the Scribble controller.
* Use me to scribble
*/
.controller('ScribbleController', ['$scope', '$rootScope',  'ScribbleService',  function( $scope, $rootScope, ScribbleService ) {

	$scope.person = ScribbleService.getPerson();
}])

/*
* HomeController
* I am the Home controller. I add the current time to the $scope variable.
*/
.controller('HomeController', ['$scope','Moment', 'TodoService', 'CONSTANTS', function( $scope, Moment, TodoService, CONSTANTS ) {

	// set how many todo there are
	$scope.NumberOfTodo = TodoService.get().length;

	$scope.homePageToDoCountID = CONSTANTS.HOME_PAGE_TODO_CONTENER_ID;

	// set the current time using the moment lib proxied by a service.
	$scope.theTime = Moment.format("dddd, MMMM Do YYYY, h:mm:ss a");
}])

/*
* AboutController
* I am the About controller. I add the about text to the $scope variable.
*/
.controller('AboutController', ['$scope',function( $scope )  {
	$scope.aboutText = "Lorem ipsum dolor sit amet, consectetur adipisicing \
						elit, sed do eiusmod tempor incididunt ut labore et \
						dolore magna aliqua. Ut enim ad minim veniam, quis \
						nostrud exercitation ullamco laboris nisi ut aliquip \
						ex ea commodo consequat. Duis aute irure dolor in \
						reprehenderit in voluptate velit esse cillum dolore \
						eu fugiat nulla pariatur. Excepteur sint occaecat \
						cupidatat non proident, sunt in culpa qui officia \
						deserunt mollit anim id est laborum.";
						
}])

/*
* ContactController
* I am the Contact controller. I take the form submission and revers the 
* fistName and lastName vars and set them to the $scope object. I also set
* the flag for the showSubmittedName = true.
*/
.controller('ContactController', ['$scope', '$http', 'nametrickFactory', function($scope, $http, nametrickFactory) {

	$scope.saveContact = function() {

		console.log(jQuery.IsSimpleValue("kjdfl"));
		
		// ucase and reverse the form inputs
		var changedFirstName = nametrickFactory.reverse( $scope.firstName );
		var changedLastName = nametrickFactory.reverse( $scope.lastName );
		changedFirstName = nametrickFactory.ucase(changedFirstName);
		changedLastName = nametrickFactory.ucase(changedLastName);

		// add the reversed and ucased data back to the scope so the view can
		// display it.
		$scope.echoFirstName = changedFirstName;
		$scope.echoLastName = changedLastName;
		
		$scope.showSubmittedName = true;
	};
}])

/*
* TodoController
* I am the Todo controller. I handle all the CRUD operations for the TODO 
* seciton of the application.
*/
.controller('TodoController', ['$scope','$log','TodoService',function($scope,$log,TodoService) {
	
	// bind the array of todos to the scope.
	$scope.todoList = TodoService.get();

	// show the todos if there are any
	if($scope.todoList.length > 0){
		$scope.showToDoList = true;
	}

	$scope.getTodoAmount = function () {
		return TodoService.get().length;
	};

	$scope.delete = function( IDTask ) {
		TodoService.delete( IDTask );
	};

	$scope.edit = function( IDTask ) {

		var taskToEdit = TodoService.get( IDTask );
		
		// service always returns an array of objects so get the top of the
		// array, there will only be one element in it.
		$scope.IDTask = taskToEdit[0].IDTask;
		$scope.task = taskToEdit[0].task;
	};

	$scope.save = function() {

		TodoService.save( $scope.IDTask, $scope.task );

		// clear out the form
		$scope.task = '';
		$scope.IDTask = '';

		//need this if the app is refreshed on the /todo page.
		$scope.showToDoList = true;

	};
}]);