(function (){
	'use strict';
	angular.module('app')
		.controller('compose', compose);

	compose.$inject = ['$scope', 'Reminder', 'ReminderService',  '$state', '$stateParams', '$location'];

	function compose($scope, Reminder,ReminderService, $state, $stateParams, $location){
		$scope.btnValue = 'Create';
		$scope.isEditing = false;
		$scope.reminder = {
			title: '',
			remind_date: '',
			notes: '',
			priority: 'L'
		};
		$scope.priorityOptions = [
			{val:'L', text: 'Low'},
			{val:'M', text: 'Medium'},
			{val:'H', text: 'High'},
		];


		if ($state.includes('editReminder')){
			_setEditing();
		}

		$scope.saveReminder = function (reminder, isEditing, formValid){
			if (formValid){
				if(!isEditing){
					ReminderService.addReminder(reminder);
					// TODO: Error handling
					_resetState();
				}else{
					ReminderService.updateReminder(reminder);
					// TODO: Error handling
					_resetState();
				}
				$location.path('reminders');
			}
		};

		$scope.pickerOptions = {
			min: _zeroTime(new Date()),
			interval: 60,
		};

		function _zeroTime(date){
			date.setHours(0);
			date.setMinutes(0);

			return date;
		}

		function _setEditing(){
			$scope.btnValue = 'Update';
			$scope.isEditing = true;
			$scope.reminder = ReminderService.getReminder($stateParams.reminderId);
			// TODO: Error handling
		}

		function _resetState(){
			$scope.btnValue = 'Create';
			$scope.isEditing = false;
			$scope.reminder = {
				title: '',
				notes: '',
				remind_date: ''
			};
		}
	}
})();
