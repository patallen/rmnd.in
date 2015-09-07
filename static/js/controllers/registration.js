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
					toastr.success('Thanks for signing up for rmnd.in');
					$state.go('login');
				})
				.error(function(err){
					console.log(err);
				});
		};
	}
})();
