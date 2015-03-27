/**
 * @fileOverview  	I am the main application file. I bootstrap the application
 *					and contain the router definitions.
 *
 * @author 			John Allen <jallen@bbg.gov>
 * @version 		1.0.0
 * @module 			app.js
 */
'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
])

.config(['$routeProvider', function($routeProvider) {
	
	$routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeController'});
	$routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'AboutController'});
	$routeProvider.when('/contact', {templateUrl: 'partials/contact.html', controller: 'ContactController'});
	$routeProvider.when('/todo', {templateUrl: 'partials/todo.html', controller: 'TodoController'});
	$routeProvider.when('/scribble', {templateUrl: 'partials/scribble.html', controller: 'ScribbleController'});
	$routeProvider.when('/d3', {templateUrl: 'partials/d3.html', controller: 'd3Controller'});

	$routeProvider.otherwise({redirectTo: '/home'});
}])


/**
 * CONATANTS:
 */
.constant('CONSTANTS', {
	TODO_UPDATED_STRING : "toDoModelUpdated",
	HOME_PAGE_TODO_CONTENER_ID: "homePageToDoContainer"
});