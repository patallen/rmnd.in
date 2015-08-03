app.controller('compose', ['$scope', 'Reminder', '$state', '$stateParams',
			   function($scope, Reminder, $state, $stateParams){
	$scope.btnValue = 'Create';
	$scope.isEditing = false;
	$scope.reminder = {
		title: '',
		remind_date: '',
		notes: ''
	};

	var _setEditing = function(){
		$scope.btnValue = 'Update';
		$scope.isEditing = true;
	};
	var _resetState = function(){
		$scope.btnValue = 'Create';
		$scope.isEditing = false;
        $scope.reminder = {
            title: '',
            notes: '',
            remind_date: ''
        };
	};
	$scope.saveReminder = function (reminder, isEditing, formValid){
		if (formValid){
			if(!isEditing){
				Reminder.save(reminder, function(res){
					_resetState();
				});
			}else{
				Reminder.update({ id:reminder.id }, reminder, function(){
					resetReminder();
				});
			}
			$state.go('reminders');
		}
	};
}]);
