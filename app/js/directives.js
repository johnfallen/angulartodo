/**
 * @fileOverview  	I contain all of the angular directives.
 *
 * @author 			John Allen <jallen@bbg.gov>
 * @version 		1.0.0
 * @module 			directives.js
 */
'use strict';

/* Directives */
angular.module('myApp.directives', [])

/******************************************************************************
d3 Directives
******************************************************************************/

/* d3-bars */
.directive('d3Bars', ['$window', '$timeout', 'd3Service', function($window, $timeout, d3Service) {
	return {
		restrict: 'A',
		scope: {
			data: '=',
			label: '@',
			onClick: '&'
		},
		link: function(scope, ele, attrs) {

			//console.log(scope.data);
			
			d3Service.d3().then(function(d3) {
 
				var renderTimeout;
				var margin = parseInt(attrs.margin) || 20,
					barHeight = parseInt(attrs.barHeight) || 20,
					barPadding = parseInt(attrs.barPadding) || 5;

				var svg = d3.select(ele[0]).append('svg').style('width', '100%');

				$window.onresize = function() {
					scope.$apply();
				};
 				
 				// repaint if window resized
				scope.$watch(function() {
					return angular.element($window)[0].innerWidth;
				}, function() {
					scope.render(scope.data);
				});

				// repaint if data is updated
				scope.$watch('data', function(newData) {
					scope.render(newData);
				}, true);

			scope.render = function(data) {
				
				var data = [
						{name: "Greg", score: 98},
						{name: "Ari", score: 96},
						{name: 'Q', score: 75},
						{name: "Foo", score: 48},
						{name: "Baz", score: 12}
					];

				svg.selectAll('*').remove();
 
				if (!data) return;
				if (renderTimeout) clearTimeout(renderTimeout);
 
				renderTimeout = $timeout(function() {
					
					var width = d3.select(ele[0])[0][0].offsetWidth - margin,
					height = data.length * (barHeight + barPadding),
					color = d3.scale.category20(),
					xScale = d3.scale.linear()
					.domain([0, d3.max(data, function(d) {
						return d.score;
					})])
					.range([0, width]);
 
					svg.attr('height', height);
	 
					svg.selectAll('rect')
					.data(data)
					.enter()
					.append('rect')
					.on('click', function(d,i) {
						return scope.onClick({item: d});
					})

					.attr('height', barHeight)
					.attr('width', 140)
					.attr('x', Math.round(margin/2))
					.attr('y', function(d,i) {
						return i * (barHeight + barPadding);
					})

					.attr('fill', function(d) {
						return color(d.score);
					})
					.transition()
					.duration(1000)
					.attr('width', function(d) {
						return xScale(d.score);
					});

					svg.selectAll('text')
					.data(data)
					.enter()
					.append('text')
					.attr('fill', '#fff')
					.attr('y', function(d,i) {
						return i * (barHeight + barPadding) + 15;
					})
					.attr('x', 15)
					.text(function(d) {
						return d.name + " (scored: " + d.score + ")";
					});
				}, 200);
			};
		});
	}}
}])

/**
 * scribble-directive
 */
.directive('scribbleDirective', ['ScribbleService', function(ScribbleService) {
	
	return function(scope, elm, attrs) {
		elm.text(ScribbleService.getPerson().getFullName());
	};
}])

/**
 * app-version
 */
.directive('appVersion', ['version', function(version) {
	
	return function(scope, elm, attrs) {
		elm.text(version);
	};
}])

/**
 * how-many-toDos
 */
.directive('howManyToDos', ['TodoService', 'CONSTANTS', function ( TodoService, CONSTANTS ) {
	
	var howManyToDosDirecitive = {

		link: function(scope, elm, attrs) {

			// have to do this on the first load of the app
			updateElement( elm );

			// this was broadcast from the service
			scope.$on(CONSTANTS.TODO_UPDATED_STRING, function(){
				updateElement( elm );
			});
		}
	}

	var updateElement = function(elm){
		
		var toDoCount = TodoService.get().length;

		// update the count on the pages
		elm.text( toDoCount );
	}

	return howManyToDosDirecitive;
}]);
