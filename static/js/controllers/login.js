app.controller('login', function LoginController($scope, $http, AuthService, $state) {
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
