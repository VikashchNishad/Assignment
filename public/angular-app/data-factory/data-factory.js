angular.module('sampleApp').factory('DataFactory', DataFactory);

function DataFactory($http) {
	  return {
	  	userregister: userregister,
	    userlogin: userlogin
	  };

//-----------------------UsersFactory---------------------------------------------//

      function userregister(user) {
	    return $http.post('/api/users/register', user).then(complete).catch(failed);
	  }

	  function userlogin(user) {
	    return $http.post('/api/users/login', user).then(complete).catch(failed);
	  }

//-------------------------------------------------------------------------------------------//
	 
	 function complete(response) {
	    return response;
	  }

	  function failed(error) {
	    console.log(error.statusText);
	  }
}