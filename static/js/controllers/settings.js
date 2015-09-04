(function(){
	angular.module('app')
		.controller('SettingsCtrl', settings);
	settings.$inject = ['$scope'];
	function settings($scope){
		var _activeTab = 'info';

		$scope.tabActive = tabActive;
		$scope.setTab = setTab;

		$scope.user = {
			firstname: '',
			lastname: ''
		}
		$scope.password = {
				
		}

		function setTab (tab) {
			_activeTab = tab;
		}
		function tabActive (tab){
			return _activeTab == tab;
		}
	}
})();
