(function(){
	"use strict";

	angular.module('app')
		.controller('main', main);

	main.$inject = ['AuthService', '$scope', '$state'];

	function main(AuthService, $scope, $state){
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
	}
})();
