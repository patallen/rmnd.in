app.controller('reminder', ['$scope', 'Reminder',
                            function($scope, Reminder) {
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

	// If isEditing, see this to the value of reminder being edited
	$scope.reminders = Reminder.query();

	$scope.delete = function(reminder) {
		Reminder.delete(reminder, function(){
			_.remove($scope.reminders, reminder);
		});
	};
}]);
