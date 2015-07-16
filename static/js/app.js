app = angular.module('tominderApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider, $interpolateProvider){
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'static/partials/home.html',
            controller: 'mainController'
        })
        .when('/login', {
            templateUrl: 'static/partials/login.html',
            controller: 'loginController'
        })
        .when('/list/:id', {
            templateUrl: 'static/partials/list.html',
            controller: 'listController'
        });
});
