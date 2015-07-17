app = angular.module('tominderApp', ['ngRoute', 'ngResource']);
app.config(function($routeProvider, $resourceProvider, $locationProvider, $interpolateProvider, $httpProvider){
	// Prevent it from stripping trailing slashes...
	// It seems that this is necessary to work with DRF
	$resourceProvider.defaults.stripTrailingSlashes = false;

	// Switch brackets to sqare brackets
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
	
	// Set csrf token
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	
	// Don't user # between domain and directories
    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
            templateUrl: 'static/partials/home.html',
            controller: 'mainController'
        })
        .when('/login', {
            templateUrl: 'static/partials/login.html',
            controller: 'loginController'
        })
        .when('/list', {
            templateUrl: 'static/partials/list.html',
            controller: 'listController'
        })
        .otherwise('/');
});

app.factory('List', function($resource){
	return $resource('http://localhost:5000/api/lists/:id');	
});

