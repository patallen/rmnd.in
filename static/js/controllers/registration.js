(function(){
	"use strict";

	angular.module('app')
		.controller('registration', registration);

	registration.$inject = ['$http', '$scope', '$state'];

	function registration($http, $scope, $state){
		$scope.regInfo = {};
		// TODO: Add validation
		$scope.register = function(regInfo){
			// Don't send the JWT with this request
			regInfo.skipAuthorization = true;

			$http.post('/auth/register/', regInfo)
				.success(function(){
					toastr.success('Thanks for signing up for rmnd.in');
					$state.go('login');
				})
				.error(function(err){
					console.log(err);
				});
		};
	}
})();
