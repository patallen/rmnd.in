app.factory('AuthService', function($http, jwtHelper, store) {
	var vm = this;

	vm.isAuthenticated = false;
	vm.user = {}	
	
	return {
		login: function(token){
			var decodedToken = jwtHelper.decodeToken(token);	
			vm.user.username = decodedToken.username;
			vm.user.email = decodedToken.email;
			vm.isAuthenticated = true;
			store.set('jwt', token);
		},
		logout: function(){
			vm.user = {}	
			vm.isAuthenticated = false;
			store.set('jwt', '');
		},
		getUser: function(){
			return vm.user;
		},
		isLoggedIn: function(){
			return vm.isAuthenticated;	
		}
	}
});
