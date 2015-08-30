'use strict';

angular.module('app')
.controller('password', password);

function password($scope, $http, $state){
	$scope.requestResetEmail = _requestResetEmail;
	$scope.requestChange = {
		email: ''	
	}
	$scope.changeInfo = {
		'uid': 'PH',
		'token': 'THISISAPLACEHOLDERTOKEN',
		'new_password': 'hunter2',
		're_new_password': 'hunter2'
	};
	
	function _requestResetEmail(){
		$http.post('/auth/password/reset/', $scope.requestChange).
			then(function(res){
				toastr.info('Check your email for a link to reset password.')
				$state.go('login');
			}, function(res){
				toastr.error('Invalid Email. Try Again.')
			});
	}

}
