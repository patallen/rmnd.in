(function(){
	"use strict";

	angular.module('app')
		.controller('reminder', reminder);

	reminder.$inject = ['$scope', 'Reminder'];

	function reminder($scope, Reminder) {
		$scope.sortType = 'created_at';
		$scope.sortReverse = true;
		$scope.filter; 
		$scope.filterStr = 'all';
		

		$scope.setFilter = function (filter){
			if (filter =='upcoming'){
				$scope.filter = {complete: false};
				$scope.filterStr = 'upcoming';
			}
			else if (filter=='sent'){
				$scope.filter = {complete: true};	
				$scope.filterStr = 'sent';
			}
			else{
				$scope.filter = '';	
				$scope.filterStr = 'all';
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
