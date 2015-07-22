app.controller('MainCtrl', function (AuthService, $scope){
	$scope.user = AuthService.user;
	$scope.logged = AuthService.isAuthenticated;

});

app.controller('LoginCtrl', function LoginController($scope, $http, AuthService) {
	$scope.user = {};

	$scope.login = function() {
		$http({
			url: '/api-token-auth/',
			method: 'POST',
			data: $scope.user
		})
		.then(function(response){
			AuthService.login(response.data.token);
		}, function(error){
			alert(error.data);	
		});	
	}
});

app.controller('ReminderCtrl', function($scope, $location, reminderFactory) {
	$scope.loadReminders = function() {
		$scope.reminders = reminderFactory.query();
	};
});
