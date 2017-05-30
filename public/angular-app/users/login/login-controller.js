angular.module('sampleApp').controller('LoginController', LoginController);

function LoginController($http, $location, $window, AuthFactory, jwtHelper, $route, DataFactory) {
	var vm = this;
	vm.isLoggedIn = function(){
	  	if(AuthFactory.isLoggedIn){
	  		var token = $window.sessionStorage.token;
            var decodedToken = jwtHelper.decodeToken(token);
            vm.loggedInUser = decodedToken.name;
	  		return true;
	  	} else{
	  		return false;
	  	}
	  };

	  vm.login = function(){
	  	if(vm.username && vm.password){
	  		var user = {
	  			username: vm.username,
	  			password: vm.password
	  		}

        DataFactory.userlogin(user).then(function(response){
	  			if(response.data.success){
	  				$window.sessionStorage.token = response.data.token;
	  				AuthFactory.isLoggedIn = true;
	  				vm.error = false;
	  				var token = $window.sessionStorage.token;
                   console.log(response.data.message);
         			 $location.path( "home" ); 
	  			} else{
	  				vm.error = response.data.message;
	  			}
	  		}).catch(function(error){
	  			console.log(error.data.message);
	  			vm.error = error.data.message;
	  		   
	  		});
	  	}
	  }

	  vm.logout = function(){
	  	AuthFactory.isLoggedIn = false;
	  	delete $window.sessionStorage.token;
	  	$location.path('login');
	  }

	  vm.isActiveTab = function(url) {
    	var currentPath = $location.path().split('/')[1];
    	return (url === currentPath ? 'active' : '');
  	  } 
}