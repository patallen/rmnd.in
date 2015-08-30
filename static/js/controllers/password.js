(function(){
	'use strict';

	angular.module('app')
		.controller('password', password);

	login.$inject = ['$scope', '$http', '$state', '$stateParams'];

	function password($scope, $http, $state, $stateParams){
		var uid = $stateParams.uid,
			token = $stateParams.token;

		$scope.requestResetEmail = _requestResetEmail;
		$scope.resetPassword = _resetPassword;

		$scope.requestChange = {email: ''};
		$scope.changeInfo = {};

		_setChangeInfo(uid, token);

		function _requestResetEmail(){
			$http.post('/auth/password/reset/', $scope.requestChange).
				then(function(res){
					toastr.info('Check your email for a link to reset password.');
					$state.go('login');
				}, function(res){
					toastr.error('Invalid Email. Try Again.');
				});
		}

		function _resetPassword(){
			$http.post('/auth/password/reset/confirm/', $scope.changeInfo).
				then(function(res){
					toastr.success('Password reset! You may now log in.');
					$state.go('login');
				}, function(res){
					toastr.error('A problem occured not reset password.');
					console.log(res);
				});
		}

		function _setChangeInfo(uid, token){
			$scope.changeInfo.uid = uid;
			$scope.changeInfo.token = token;
		}
	}
})();
