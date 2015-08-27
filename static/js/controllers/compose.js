(function (){
	'use strict';
	angular.module('app')
		.controller('compose', compose);

	compose.$inject = ['$scope', 'Reminder', 'ReminderService',  '$state', '$stateParams', '$location'];

	function compose($scope, Reminder,ReminderService, $state, $stateParams, $location){
		$scope.reminder = {
			priority: 'L',
			remind_date: new Date()
		};
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
                            $location.path('reminders');
                        }).catch(function(err){
                            toastr.error("Could not create reminder.");
                        })
					
				} else {
					ReminderService.updateReminder(reminder)
                        .$promise.then(function(res){
                            _resetState();
                            $location.path('reminders');
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
				});
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
