app.controller('reminder', function($scope, $location, Reminder) {
	$scope.sortType = 'created_at';
	$scope.sortReverse = true;

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

	$scope.delete = function(reminder) {
		Reminder.delete(reminder, function(){
			_.remove($scope.reminders, reminder);
		});
	};
});
