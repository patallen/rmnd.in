"use strict";

var app = angular.module('app', ['ngResource','angular-jwt', 'angular-storage', 'ui.router']);

app.config(function($interpolateProvider, $locationProvider, $urlRouterProvider, $resourceProvider, $httpProvider, $stateProvider, jwtInterceptorProvider){
	$resourceProvider.defaults.stripTrailingSlashes = false;

	$interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');

	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

	jwtInterceptorProvider.tokenGetter = function(store){
		return store.get('jwt');	
	};
	$httpProvider.interceptors.push('jwtInterceptor');
	
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');
	$stateProvider
        .state('home', {
            url: "/",
            templateUrl: "/static/partials/home.html"
        })
        .state('login', {
            url: '/login',
            controller: 'LoginCtrl',
            templateUrl: "/static/partials/login.html"
        });
});

app.run(['AuthService', '$rootScope', '$state', '$location', 
		function(AuthService, $rootScope, $state, $location){

	// Fill AuthService's authentication with user info if authed
	AuthService.fillAuthData();

	// If user is not authenticated, redirect to login
	$rootScope.$on("$stateChangeStart", function(event, next, current) {
		if(!AuthService.authentication().isAuthenticated){
			$location.path('/login');
		}
	});	
}]);

app.factory('reminderFactory', function($resource) {
	return $resource('/api/reminders/:reminderId', { reminderId: '@_id' });
});
