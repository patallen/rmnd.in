(function(){
	"use strict";

	angular
		.module('app')
		.controller('Activate', Activate);

	Activate.$inject = ['$http', '$state', '$stateParams'];

	function Activate($http, $state, $stateParams){
		var vm = this;
    if ($stateParams){
      console.log($stateParams);
      $http.post('/auth/activate/', {uid: $stateParams.uid, token: $stateParams.token})
        .then(function(res){
          console.log(res);
          toastr.success("Your account is now active! Login!");
          $state.go('login');
        }, function(res){
          console.log(res);
          toastr.error("There was a problem activating your account.");
          $state.go('home');
        });
    }
	}
})();