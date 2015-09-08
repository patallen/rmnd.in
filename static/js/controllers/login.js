(function(){
	"use strict";

	angular
		.module('app')
		.controller('login', Login);

	Login.$inject = ['$scope', '$http', 'AuthService', '$state'];

	function Login($scope, $http, AuthService, $state) {
		var vm = this;
		vm.user = {};
		vm.login = login;

		// TODO: This should probably go in a service
		function login() {
			$http({
				url: '/api-token-auth/',
				method: 'POST',
				data: vm.user
			})
			.then(function(response){
				AuthService.login(response.data.token);
				$state.go('reminders');
			}, function(error){
				console.log(error);
				toastr.error("Invalid email and/or password.");
			});
		}
	}
})();
