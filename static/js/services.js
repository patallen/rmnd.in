app.factory('AuthService', function($http, jwtHelper) {
	var self = this;
	self.user = {};
	
	return {
		setUser : function(token){
			var decodedToken = jwtHelper.decodeToken(token);	
			self.user.username = decodedToken.username;
			self.user.email = decodedToken.email;
		},
		getUser : function(){
			return self.user;
		},
		isLoggedIn : function(){
			return self.user == {};
		}
	}
});
