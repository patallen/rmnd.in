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

app.controller('LoginCtrl', function LoginController($scope, $http, store, AuthService) {
	$scope.user = {};

	$scope.login = function() {
		$http({
			url: 'http://localhost:5000/api-token-auth/',
			method: 'POST',
			data: $scope.user
		})
		.then(function(response){
			AuthService.setUser(response.data.token);
			store.set('jwt', response.data.token);	
		}, function(error){
			alert(error.data);	
		});	
	}
});

