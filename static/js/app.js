var app = angular.module('app', ['ngResource','angular-jwt', 'angular-storage']);

app.config(function($interpolateProvider, $resourceProvider, $httpProvider, jwtInterceptorProvider){
	$resourceProvider.defaults.stripTrailingSlashes = false;

	$interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');

	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

	jwtInterceptorProvider.tokenGetter = function(store){
		console.log(store.get('jwt'));
		return store.get('jwt');	
	};
	$httpProvider.interceptors.push('jwtInterceptor');
});

app.run(['AuthService', function(AuthService){
	AuthService.fillAuthData();
}]);

app.factory('reminderFactory', function($resource) {
	return $resource('/api/reminders/:reminderId', { reminderId: '@_id' });
});
