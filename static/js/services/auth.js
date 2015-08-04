app.factory('AuthService', ['$http', 'jwtHelper', 'store', function($http, jwtHelper, store) {
	var authServiceFactory = {};
	var _authentication = {
        username: "",
        isAuthenticated: false
	};

	var _login = function(token){
		var decodedToken = jwtHelper.decodeToken(token);
		_authentication.username = decodedToken.username;
		_authentication.isAuthenticated = true;
		store.set('jwt', token);
	};
	var _logout = function(){
		_authentication.username = '';
		_authentication.isAuthenticated = false;
		store.remove('jwt');
	};
	var _fillAuthData = function(){
		var token = localStorage.getItem('jwt');
		if (token){
			var tokenExpired = jwtHelper.isTokenExpired(token);

			if (tokenExpired){
				_authentication.isAuthenticated = false;
				_authentication.username = "";
			}
			else {
				var decodedToken = jwtHelper.decodeToken(token);
				_authentication.isAuthenticated = true;
				_authentication.username = decodedToken.username;
			}
		}
	};
	var _getAuthentication = function(){
		return _authentication;
	};

	authServiceFactory.login = _login;
	authServiceFactory.logout = _logout;
	authServiceFactory.fillAuthData = _fillAuthData;
	authServiceFactory.authentication= _getAuthentication;

	return authServiceFactory;
}]);
