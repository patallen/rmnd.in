(function(){
	"use strict";

	angular.module('app')
		.controller('login', loginCtrl);

	function loginCtrl($scope, $http, AuthService, $state) {
		$scope.user = {};

		$scope.login = function() {
			$http({
				url: '/api-token-auth/',
				method: 'POST',
				data: $scope.user
			})
			.then(function(response){
				AuthService.login(response.data.token);
				$state.go('reminders');
			}, function(error){
				alert(error.data);
			});
		};
	}
})();
