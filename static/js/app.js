var app = angular.module('app', ['ngResource','angular-jwt', 'angular-storage']);

app.config(function($interpolateProvider, $resourceProvider, $httpProvider){
	$resourceProvider.defaults.stripTrailingSlashes = false;

	$interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');

	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});
