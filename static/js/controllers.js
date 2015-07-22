app.controller('MainCtrl', function (AuthService, $scope){
	$scope.user = AuthService.getUser();
	$scope.logged = AuthService.isLoggedIn();

	$scope.$watch(
			function(scope){
				return scope.logged;
			},
			function(scope){
				scope.user = AuthService.getUser(); 
			}
	); 
});

app.controller('LoginCtrl', function LoginController($scope, $http, AuthService) {
	$scope.user = {};

	$scope.login = function() {
		$http({
			url: 'http://localhost:5000/api-token-auth/',
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
