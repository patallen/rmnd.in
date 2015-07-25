"use strict";

app.controller('MainCtrl', function (AuthService, $scope, $state){
    $scope.auth = AuthService.authentication();
    $scope.logout = function(){
		AuthService.logout(); 
		$state.go('login');
    };
	
    $scope.$watch(function(){
        return AuthService.authentication();
    },function(authentication){
        $scope.auth = AuthService.authentication();
    });
});

app.controller('LoginCtrl', function LoginController($scope, $http, AuthService, $state) {
	$scope.user = {};

	$scope.login = function() {
		$http({
			url: '/api-token-auth/',
			method: 'POST',
			data: $scope.user
		})
		.then(function(response){
			AuthService.login(response.data.token);
			$state.go('home');
		}, function(error){
			alert(error.data);	
		});	
	};
});

app.controller('ReminderCtrl', function($scope, $location, reminderFactory) {
    $scope.currentReminder = {
        title: '',
        notes: '',
        remind_date: new Date()
    }
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
        }
    }
	$scope.createReminder = function (newReminder){
		reminderFactory.save(newReminder, function(){
			$scope.reminders.push(newReminder);
            resetReminder();
			$scope.cancelAction();
		});
	};
	$scope.reminders = reminderFactory.query();
});

app.controller('DatePickerCtrl', function ($scope) {
  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.format = 'dd-MMMM-yyyy';

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };
});
