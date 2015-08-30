(function (){
	'use strict';
	angular.module('app')
		.controller('compose', compose);

	compose.$inject = ['$scope', 'Reminder', 'ReminderService',  '$state', '$stateParams'];

	function compose($scope, Reminder, ReminderService, $state, $stateParams){
		$scope.reminder = {
			priority: 'L',
			remind_date: _zeroTime(new Date())
		};
		$scope.time = {
			hours: 0,
			ampm: 'AM'
		};
		function _zeroTime(date){
			date.setMinutes(0);
			date.setSeconds(0);
			date.setMilliseconds(0);
			return date;
		}
		$scope.times = [
			{val: 1, text: '1:00'},
			{val: 2, text: '2:00'},
			{val: 3, text: '3:00'},
			{val: 4, text: '4:00'},
			{val: 5, text: '5:00'},
			{val: 6, text: '6:00'},
			{val: 7, text: '7:00'},
			{val: 8, text: '8:00'},
			{val: 9, text: '9:00'},
			{val: 10, text: '10:00'},
			{val: 11, text: '11:00'},
			{val: 0, text: '12:00'},
		];

		$scope.$watchGroup(['time.hours', 'time.ampm'], function(){
			var hour = $scope.time.hours,
				ampm = $scope.time.ampm;

			var res;
			if (ampm == 'PM'){
				if (hour == 12){
					res = hour;
				} else {
					res = hour + 12;
				}
			} else {
				res = hour;
			}
			$scope.reminder.remind_date.setHours(res);
		});
		$scope.btnValue = 'Create';
		$scope.isEditing = false;
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
					ReminderService.addReminder(reminder)
                        .$promise.then(function(res){
                            _resetState();
                            $state.go('reminders');
                        }).catch(function(err){
                            toastr.error("Could not create reminder.");
                        });
				} else {
					ReminderService.updateReminder(reminder)
                        .$promise.then(function(res){
                            _resetState();
                            $state.go('reminders');
                        }).catch(function(err){
                            toastr.error("Could not save reminder.");
                        });
				}
			}
		};

		function _setEditing(){
			$scope.btnValue = 'Update';
			$scope.isEditing = true;
			ReminderService.getReminder($stateParams.reminderId)
				.$promise
				.then(function(data){
					$scope.reminder = data;
					$scope.reminder.remind_date = new Date(data.remind_date);
					var hours = $scope.reminder.remind_date.getHours();
					if (hours > 11){
						$scope.time.ampm = 'PM';
						if (hours < 13){
							$scope.time.hours = 0;
						} else {
							$scope.time.hours = hours - 12;
						}
					} else {
						$scope.time.ampm = 'AM';
						$scope.time.hours = hours;
					}
					console.log($scope.time.hours);
				});
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
