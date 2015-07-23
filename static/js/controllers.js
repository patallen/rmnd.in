"use strict";

app.controller('MainCtrl', function (AuthService, $scope, $state){
    $scope.auth = AuthService.authentication();
    $scope.logout = function(){
		AuthService.logout(); 
		$state.go('login');
    };
	
    $scope.$watch(function(){
        return AuthService.authentication();
    },function(authentication){
        $scope.auth = AuthService.authentication();
    });
});

app.controller('LoginCtrl', function LoginController($scope, $http, AuthService, $state) {
	$scope.user = {};

	$scope.login = function() {
		$http({
			url: '/api-token-auth/',
			method: 'POST',
			data: $scope.user
		})
		.then(function(response){
			AuthService.login(response.data.token);
			$state.go('home');
		}, function(error){
			alert(error.data);	
		});	
	};
});

app.controller('ReminderCtrl', function($scope, $location, reminderFactory) {
	$scope.loadReminders = function() {
		$scope.reminders = reminderFactory.query();
	};
});

