app.controller('compose', ['$scope', 'Reminder', '$state', '$stateParams', '$location',
			   function($scope, Reminder, $state, $stateParams, $location){
	
	$scope.btnValue = 'Create';
	$scope.isEditing = false;
	$scope.reminder = {
		title: '',
		remind_date: '',
		notes: ''
	};

	// If state is editReminder
	if ($state.includes('editReminder')){
		_setEditing();	
	}

	$scope.saveReminder = function (reminder, isEditing, formValid){
		if (formValid){
			if(!isEditing){
				Reminder.save(reminder, function(res){
					_resetState();
					toastr.success('Successfully created reminder!');
				});
			}else{
				Reminder.update({ id:reminder.id }, reminder, function(){
					_resetState();
					toastr.success('Successfully saved reminder!');
				});
			}
			$location.path('reminders');
		}
	};
	
	function _setEditing(){
		$scope.btnValue = 'Update';
		$scope.isEditing = true;
		Reminder.get({id: $stateParams.reminderId},
				function(res){
					$scope.reminder = res
				}, 
				function(err){
					// TODO: Add flash message text for error
					toastr.error(err.statusText);
					$location.path('/reminders');
			});
	};
	function _resetState(){
		$scope.btnValue = 'Create';
		$scope.isEditing = false;
        $scope.reminder = {
            title: '',
            notes: '',
            remind_date: ''
        };
	};
}]);
