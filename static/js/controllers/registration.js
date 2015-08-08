(function(){
	"use strict";

	angular.module('app')
		.controller('registration', registerCtrl);

	function registerCtrl($http, $scope, $state){
		$scope.regInfo = {};
		// TODO: Add validation
		$scope.register = function(regInfo){
			$http.post('/auth/register/', regInfo)
				.success(function(){
					// TODO: Add a toast/flash message
					$state.go('login');
				})
				.error(function(err){
					console.log(err);
				});
		};
	}
})();
