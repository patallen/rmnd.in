app.controller('reminder', function($scope, $location, reminderFactory) {
    $scope.currentReminder = {
        title: '',
        notes: '',
        remind_date: ''
    };
	$scope.isEditing = false;
	$scope.isCreating = false;

	$scope.startEditing = function(){
		$scope.isEditing = true;
		$scope.isCreating = false;
	};
	$scope.startCreating = function(){
		$scope.isEditing = false;
		$scope.isCreating = true;
	};
	$scope.cancelAction = function(){
		$scope.isEditing = false;
		$scope.isCreating = false;
	};
    var resetReminder = function() {
        $scope.currentReminder = {
            title: '',
            notes: '',
            remind_date: ''
        };
    };
	$scope.createReminder = function (newReminder, formValid){
		if (formValid){
			reminderFactory.save(newReminder, function(){
				$scope.reminders.push(newReminder);
				resetReminder();
				$scope.cancelAction();
			});
		}
	};
	$scope.reminders = reminderFactory.query();
});
