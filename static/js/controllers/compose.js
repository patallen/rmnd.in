(function (){
	'use strict';

	angular
		.module('app')
		.controller('compose', Compose);

	Compose.$inject = ['$location','$scope', 'ReminderService',  '$state', '$stateParams'];

	function Compose($location, $scope, ReminderService, $state, $stateParams){
		var vm = this;

		if ($state.includes('editReminder')){
			_setEditing();
		}

		// Hoist Functions
		vm.saveReminder = saveReminder;

		vm.btnValue = 'Create';
		vm.isEditing = false;
		vm.priorityOptions = [
			{val:'L', text: 'Low'},
			{val:'M', text: 'Medium'},
			{val:'H', text: 'High'},
		];
		vm.reminder = {
			priority: 'L',
			remind_date: _zeroTime(new Date())
		};
		vm.time = {
			hours: 0,
			ampm: 'AM'
		};
		vm.times = [
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

		$scope.$watchGroup(['vm.time.hours', 'vm.time.ampm'], function(){
			var hour = vm.time.hours,
				ampm = vm.time.ampm;

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
			vm.reminder.remind_date.setHours(res);
		});


		function saveReminder (reminder, isEditing, formValid){
			if (formValid){
				if(!isEditing){
					ReminderService.addReminder(reminder)
                        .$promise.then(function(res){
                            _resetState();
                            toastr.success("Successfully created reminder!");
                            $state.go('reminders');
                        }).catch(function(err){
                            toastr.error("Could not create reminder.");
                        });
				} else {
					ReminderService.updateReminder(reminder)
                        .$promise.then(function(res){
                            _resetState();
                            toastr.success("Successfully saved your reminder!");
                            $state.go('reminders');
                        }).catch(function(err){
                            toastr.error("Could not save reminder.");
                        });
				}
			}
		}

		function _setEditing(){
			vm.btnValue = 'Update';
			vm.isEditing = true;
			ReminderService.getReminder($stateParams.reminderId)
				.$promise
				.then(function(data){
					vm.reminder = data;
					vm.reminder.remind_date = new Date(data.remind_date);
					var hours = vm.reminder.remind_date.getHours();
					if (hours > 11){
						vm.time.ampm = 'PM';
						if (hours < 13){
							vm.time.hours = 0;
						} else {
							vm.time.hours = hours - 12;
						}
					} else {
						vm.time.ampm = 'AM';
						vm.time.hours = hours;
					}
				}).catch(function(err){
					$location.path('reminders');
					toastr.error("The reminder you are looking for does not exist.");
				});
		}
		function _resetState(){
			vm.btnValue = 'Create';
			vm.isEditing = false;
			vm.reminder = {
				title: '',
				notes: '',
				remind_date: ''
			};
		}
		function _zeroTime(date){
			date.setMinutes(0);
			date.setSeconds(0);
			date.setMilliseconds(0);
			return date;
		}
	}
})();
