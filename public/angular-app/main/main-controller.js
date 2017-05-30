angular.module('sampleApp').controller('mainController', mainController);


function mainController($location, $window, jwtHelper,AuthFactory) {
   vm = this;
	console.log(AuthFactory.isLoggedIn);
	if(AuthFactory.isLoggedIn){
	  		var token = $window.sessionStorage.token;
            var decodedToken = jwtHelper.decodeToken(token);
            vm.loggedInUser = decodedToken.name;
            vm.userInterest = decodedToken.interest;
	  		return true;
	  	} else{
	  		return false;
	  	}
	}