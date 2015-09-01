angular.module('app')
	.factory('AuthService', authService)

authService.$inject = ['$http', 'jwtHelper', 'store'];

function authService($http, jwtHelper, store) {
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
				// Refresh token on page load
				// TODO: check orig_iat expiration?
				_refreshToken(JSON.parse(token));
				var decodedToken = jwtHelper.decodeToken(token);
				_authentication.isAuthenticated = true;
				_authentication.username = decodedToken.username;
			}
		}
	};
	var _getAuthentication = function(){
		return _authentication;
	};

	function _refreshToken(token){
		$http({
			url: '/api-token-refresh/',
			method: 'POST',
			data: {'token': token}
		}).then(function(res){
			store.set('jwt', res.data.token);
		})
	};

	authServiceFactory.login = _login;
	authServiceFactory.logout = _logout;
	authServiceFactory.fillAuthData = _fillAuthData;
	authServiceFactory.authentication= _getAuthentication;

	return authServiceFactory;
};
