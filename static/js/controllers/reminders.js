(function(){
	"use strict";

	angular.module('app')
		.controller('reminder', reminder);

	reminder.$inject = ['$scope', '$interval', 'Reminder', 'ReminderService'];

	function reminder($scope, $interval, Reminder, ReminderService) {
		$scope.menuActive = null;
		$scope.getStatusClass = _getStatusClass;
		$scope.setMenuActive = _setMenuActive;
		$scope.sortType = ['-complete', 'created_at'];
		$scope.sortReverse = true;
		$scope.filter;
		$scope.filterStr = 'all';

		$scope.getPriority = function(reminder){
			switch(reminder.priority){
				case 'L':
					return 'Low';
					break;
				case 'M':
					return 'Medium';
					break;
				case 'H':
					return 'High';
					break;
				default:
					return 'Low';
			}
		}
		function _setMenuActive(index){
			if ($scope.menuActive == index){
				$scope.menuActive = null;
			} else {
				$scope.menuActive = index;
			}
		}
		$scope.setFilter = function (filter){
			_setMenuActive($scope.menuActive);
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
				$scope.sortType = ['-complete', 'created_at'];
			}
		};

		function _getStatusClass(reminder) {
			var now = new Date().getTime();
			var rt = new Date(reminder.remind_date).getTime();
			console.log(rt);
			console.log(now);
			if (reminder.on_hold){
			 	return "fa fa-pause fa-pink"
			} else if (rt > now){
			 	return "fa fa-clock-o fa-blue"
			} else {
			 	return "fa fa-check fa-green"
			}
			// if (reminder.complete){
			// 	return "fa fa-check fa-green"
			// } else if (reminder.on_hold){
			// 	return "fa fa-pause fa-pink"
			// } else {
			// 	return "fa fa-clock-o fa-blue"
			// }
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

		$scope.reminders = ReminderService.reminders;

		$scope.delete = function(reminder) {
			ReminderService.deleteReminder(reminder);
		};
	}
})();
