(function(){
	"use strict";

	angular
		.module('app')
		.controller('Main', Main);

	Main.$inject = ['AuthService', '$scope', '$state'];

	function Main(AuthService, $scope, $state){
		var vm = this;

		// Controller variables
		vm.menuActive = false;
		vm.auth = AuthService.authentication;
		vm.homeLink = getHomeLink();

		// Hoisted methods
		vm.toggleMenu = toggleMenu;
		vm.logout = logout;

		function logout(){
			AuthService.logout();
			$state.go('login');
		}
		function getHomeLink(){
			if (vm.auth.isAuthenticated){
				return '/reminders';
			} else {
				return '/';
			}
		}
		function toggleMenu(event){
			vm.menuActive = !$scope.menuActive;
			event.stopPropagation();
		}

		$scope.$watch(function(){
			return AuthService.authentication;
		},function(authentication){
			vm.auth = AuthService.authentication;
		});

		window.onclick = function() {
			if (vm.menuActive) {
				vm.menuActive = false;
				$scope.$apply();
			}
		};
	}
})();
