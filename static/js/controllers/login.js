(function(){
	"use strict";

	angular.module('app')
		.controller('login', login);

	login.$inject = ['$scope', '$http', 'AuthService', '$state'];

	function login($scope, $http, AuthService, $state) {
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
				toastr.error("Invalid username and/or password.");
			});
		};
	}
})();
