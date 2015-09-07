(function(){
	"use strict";

	angular.module('app')
		.controller('SettingsCtrl', settings);

	settings.$inject = ['$scope', '$http'];

	function settings($scope, $http){
		var vm = this;

		var _activeTab = 'info';

		vm.tabActive = tabActive;
		vm.setTab = setTab;
		vm.changePass = changePass;

		vm.user = {
			firstname: '',
			lastname: ''
		};
		vm.password = {};

		function changePass(){
			$http.post('/auth/password/',
					{
						new_password: vm.password.newpass,
						re_new_pass: vm.password.confpass,
						current_password: vm.password.current
					}).then(
					function(){
						toastr.success('Password changed successfully!');
					},function(){
						toastr.error("Unable to change password.");
					});
			_clearPassword();
		};
		function _clearPassword(){
			vm.password = {};
		}
		function setTab (tab) {
			_activeTab = tab;
		}
		function tabActive (tab){
			return _activeTab === tab;
		}
	}
})();
