(function(){
	'use strict';

	angular
		.module('app')
		.controller('password', Password);

	Password.$inject = ['$scope', '$http', '$state', '$stateParams'];

	function Password($scope, $http, $state, $stateParams){
		var vm = this;

		var uid = $stateParams.uid,
			token = $stateParams.token;

		vm.requestResetEmail = _requestResetEmail;
		vm.resetPassword = _resetPassword;

		vm.requestChange = {email: ''};
		vm.changeInfo = {};

		_setChangeInfo(uid, token);

		function _requestResetEmail(){
			$http.post('/auth/password/reset/', vm.requestChange).
				then(function(res){
					toastr.info('Check your email for a link to reset password.');
					$state.go('login');
				}, function(res){
					toastr.error('Invalid Email. Try Again.');
				});
		}
		function _resetPassword(){
			$http.post('/auth/password/reset/confirm/', vm.changeInfo).
				then(function(res){
					toastr.success('Password reset! You may now log in.');
					$state.go('login');
				}, function(res){
					toastr.error('A problem occured not reset password.');
					console.log(res);
				});
		}
		function _setChangeInfo(uid, token){
			vm.changeInfo.uid = uid;
			vm.changeInfo.token = token;
		}
	}
})();
