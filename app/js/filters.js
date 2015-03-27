/**
 * @fileOverview  	I am a simple example of an exteranl filter code.
 *
 * @author 			John Allen <jallen@bbg.gov>
 * @version 		1.0.0
 * @module 			filters.js
 */
'use strict';

/* Filters */

angular.module('myApp.filters', []).
	
filter('interpolate', ['version', function(version) {
	return function(text) {
		return String(text).replace(/\%VERSION\%/mg, version);
	}
}]);