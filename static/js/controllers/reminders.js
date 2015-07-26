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

	// Create / Edit Functions
	
	// If isEditing, set this to the value of reminder being edited
    $scope.currentReminder = {
        title: '',
        notes: '',
        remind_date: ''
    };
    $scope.btnValue = 'Create';
	$scope.isEditing = false;
	$scope.isCreating = false;

	$scope.startEditing = function(reminder){
		$scope.currentReminder = reminder;
		$scope.btnValue = 'Update';
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
		resetReminder();
		$scope.btnValue = 'Create';
	};
    var resetReminder = function() {
        $scope.currentReminder = {
            title: '',
            notes: '',
            remind_date: ''
        };
    };
	$scope.createEditReminder = function (reminder, isEditing, formValid){
		if (formValid){
			if(!isEditing){
				Reminder.save(reminder, function(){
					$scope.reminders.push(reminder);
					resetReminder();
					$scope.cancelAction();
				});
			}else{
				Reminder.update({ id:reminder.id }, reminder, function(){
					resetReminder();
					$scope.cancelAction();
				});	
			}
		}
	};
	$scope.reminders = Reminder.query();

	$scope.delete = function(reminder) {
		Reminder.delete(reminder, function(){
			_.remove($scope.reminders, reminder);
		});
	};
});
