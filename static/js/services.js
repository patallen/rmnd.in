app.factory('AuthService', function($http, jwtHelper, store) {
	var authServiceFactory = {}
	var _user = {};
	var _isAuthenticated = false;

	var _login = function(token){
		var decodedToken = jwtHelper.decodeToken(token);	
		_user.username = decodedToken.username;
		_user.email = decodedToken.email;
		_isAuthenticated = true;
		store.set('jwt', token);
	}
	var _logout = function(){
		_user = {}	
		_isAuthenticated = false;
		store.set('jwt', '');
	}
	var _fillAuthData = function(){
		var token = localStorage.getItem('jwt');
		if (token){
			var decodedToken = jwtHelper.decodeToken(token);
			_isAuthenticated = true;
			_user.username = decodedToken.username;
			_user.email = decodedToken.email;
		}
	}
	authServiceFactory.user = _user;
	authServiceFactory.login = _login;
	authServiceFactory.logout = _logout;
	authServiceFactory.fillAuthData = _fillAuthData;
	authServiceFactory.isAuthenticated = _isAuthenticated;
	
	// TODO: Get _isAuthenticated to return TRUE when it is true.
	console.log(_isAuthenticated);
	return authServiceFactory;
});
