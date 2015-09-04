(function(){
	"use strict";

	angular.module('app')
		.controller('SettingsCtrl', settings);

	settings.$inject = ['$scope', '$http'];

	function settings($scope, $http){
		var _activeTab = 'info';

		$scope.tabActive = tabActive;
		$scope.setTab = setTab;

		$scope.user = {
			firstname: '',
			lastname: ''
		};
		$scope.password = {};
		$scope.changePass = function(){
			$http.post('/auth/password/',
					{
						new_password: $scope.password.newpass,
						re_new_pass: $scope.password.confpass,
						current_password: $scope.password.current
					}).then(
					function(){
						toastr.success('Password changed successfully!');
					},function(){
						toastr.error("Unable to change password.");
					});
			_clearPassword();
		};
		function _clearPassword(){
			$scope.password = {};
		}
		function setTab (tab) {
			_activeTab = tab;
		}
		function tabActive (tab){
			return _activeTab === tab;
		}
	}
})();
