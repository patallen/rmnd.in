/* Main Controller */
app.controller('mainController', function($scope, List){
	List.query(function(data){
		$scope.lists = data;
	});
});

/* Login Controller */
app.controller('loginController', function($scope, $location){

});

/* List Controller */
app.controller('listController', function($scope){
    $scope.message = "This is the list message.";
});
