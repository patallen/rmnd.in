app.controller('reminder', function($scope, $location, Reminder) {
	$scope.sortType = 'created_at';
	$scope.sortReverse = true;

	$scope.toggleReverse = function() {
		$scope.sortReverse = !$scope.sortReverse;
	}

	$scope.setSortType = function(sortType){
		$scope.sortType = sortType;	
	}

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
			Reminder.save(newReminder, function(){
				$scope.reminders.push(newReminder);
				resetReminder();
				$scope.cancelAction();
			});
		}
	};
	$scope.reminders = Reminder.query();
	console.log($scope.reminders)

	$scope.delete = function(reminder) {
		Reminder.delete(reminder, function(){
			_.remove($scope.reminders, reminder);
		});
	};
});
