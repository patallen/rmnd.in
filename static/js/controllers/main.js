(function(){
	"use strict";

	angular.module('app')
		.controller('main', main);

	main.$inject = ['AuthService', '$scope', '$state'];

	function main(AuthService, $scope, $state){
		$scope.menuActive = false;
		$scope.toggleMenu = toggleMenu;
		$scope.auth = AuthService.authentication;
		$scope.logout = function(){
			AuthService.logout();
			$state.go('login');
			toggleMenu();
		};
		$scope.getHomeLink = function(){
			if ($scope.auth.isAuthenticated){
				return '/reminders';
			} else {
				return '/';
			}
		};

		$scope.$watch(function(){
			return AuthService.authentication;
		},function(authentication){
			$scope.auth = AuthService.authentication;
		});

		function toggleMenu(){
			$scope.menuActive = !$scope.menuActive;
		}
	}
})();
