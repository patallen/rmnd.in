(function(){
	"use strict";

	angular
		.module('app')
		.controller('registration', Registration);

	Registration.$inject = ['$http', '$scope', '$state'];

	function Registration($http, $scope, $state){
		var vm = this;

		vm.regInfo = {};
		// TODO: Add validation
		vm.register = function(regInfo){
			// Don't send the JWT with this request
			regInfo.skipAuthorization = true;

			$http.post('/auth/register/', regInfo)
				.success(function(){
					toastr.info('Check your email for an activation link!');
					$state.go('login');
				})
				.error(function(err){
					console.log(err);
				});
		};
	}
})();
