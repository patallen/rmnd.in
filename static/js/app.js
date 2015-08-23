"use strict";

angular
	.module('app',
		['ngResource',
		 'angular-jwt',
		 'angular-storage',
		 'ui.router',
		 'ngAnimate',
		 'angular-datepicker'
		])

.config(['$interpolateProvider', '$locationProvider', '$urlRouterProvider', '$resourceProvider', '$httpProvider', '$stateProvider', 'jwtInterceptorProvider',
            function($interpolateProvider, $locationProvider, $urlRouterProvider, $resourceProvider, $httpProvider, $stateProvider, jwtInterceptorProvider){
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
		.state('reminders', {
			url: "/reminders",
			controller: 'reminder',
			templateUrl: "/static/partials/reminders.html"
		})
		.state('addReminder', {
			url: "/reminders/add",
			controller: 'compose',
			templateUrl: "/static/partials/compose.html"
		})
		.state('editReminder', {
			url: "/reminders/:reminderId/edit",
			controller: 'compose',
			templateUrl: "/static/partials/compose.html"
		})
		.state('register', {
			url: "/register",
			controller: 'registration',
			templateUrl: "/static/partials/register.html"
		})
        .state('login', {
            url: '/login',
            controller: 'login',
            templateUrl: "/static/partials/login.html"
        });
}])

.run(['AuthService', '$rootScope', '$state', '$location',
		function(AuthService, $rootScope, $state, $location){

	// Fill AuthService's authentication with user info if authed
	AuthService.fillAuthData();

	$rootScope.$on("$stateChangeStart", function(event, next, current) {
		if(!AuthService.authentication().isAuthenticated){
			if(next.url == "/register" || next.url == "/"){
				// if going to register do not redirect to login
			} else {
				// if not authenticated redirect to login
				$location.path('/login');
			}
		}
	});
}])
.factory('Reminder', ['$resource', function($resource) {
	return $resource('/api/reminders/:id/', null,
		{
			'update': {method: 'PUT'}
		}
	);
}])
.service('ReminderService', ['$resource', 'Reminder', function($resource, Reminder){
	var vm = this;
	vm.reminders = _getReminders();
	function _getReminders(){
		return Reminder.query();	
	}

	vm.addReminder = function (newReminder){
		return Reminder.save(newReminder, function(res){
			vm.reminders.push(res);
			toastr.success('Successfully created reminder!');
		});
	};
	vm.updateReminder = function(updateReminder){
		return Reminder.update({id:updateReminder.id}, updateReminder, function(){
			angular.extend(_.find(vm.reminders, {'id': updateReminder.id}), updateReminder);
			toastr.success('Successfully saved reminder!');
		});
	};
	vm.deleteReminder = function(deleteReminder){
		Reminder.delete(deleteReminder, function(){
			_.remove(vm.reminders, deleteReminder);	
		});
	};
	vm.getReminder = function(reminderId){
		return Reminder.get({id: reminderId});
	};
	return vm;
}]);

