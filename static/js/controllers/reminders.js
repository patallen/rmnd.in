(function(){
	"use strict";

	angular.module('app')
		.controller('reminder', reminder);

	reminder.$inject = ['$scope', 'Reminder'];

	function reminder($scope, Reminder) {
		$scope.menuActive = null;
		$scope.setMenuActive = _setMenuActive;
		$scope.sortType = ['-complete', '-remind_date'];
		$scope.sortReverse = true;
		$scope.filter;
		$scope.filterStr = 'all';

		function _setMenuActive(index){
			if ($scope.menuActive == index){
				$scope.menuActive = null;
			} else {
				$scope.menuActive = index;
			}
		}
		$scope.setFilter = function (filter){
			if (filter =='upcoming'){
				$scope.filter = {complete: false};
				$scope.filterStr = 'upcoming';
				$scope.sortType = '-remind_date';
			}
			else if (filter=='sent'){
				$scope.filter = {complete: true};
				$scope.filterStr = 'sent';
			}
			else{
				$scope.filter = '';
				$scope.filterStr = 'all';
				$scope.sortType = ['-complete', '-remind_date'];
			}
		};

		$scope.isActiveFilter = function (filter){
			if(filter == $scope.filterStr){
				return true;
			}
			return false;
		}
		$scope.toggleReverse = function() {
			$scope.sortReverse = !$scope.sortReverse;
		};

		$scope.setSortType = function(sortType){
			$scope.sortType = sortType;
		};
		$scope.getDirectionClass = function(){
			if($scope.sortReverse === true){
				return 'glyphicon-arrow-up';
			}else{
				return 'glyphicon-arrow-down';
			}
		};

		$scope.reminders = Reminder.query();

		$scope.delete = function(reminder) {
			Reminder.delete(reminder, function(){
				_.remove($scope.reminders, reminder);
			});
		};
	}
})();
