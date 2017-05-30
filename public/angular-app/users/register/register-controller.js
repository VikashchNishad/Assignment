angular.module('sampleApp').controller	('RegisterController', RegisterController);

function RegisterController($http, DataFactory, $timeout, $location) {
	var vm = this;
	
    vm.isSuccesRegister = false;
    vm.interests = ["Science", "Sports", "Entertainment"];

	vm.register = function() {
		var user = {
			username: vm.username,
			password: vm.password,
			email: vm.email,
			name: vm.name,
			interest: vm.interest
		};

		if(!vm.username || !vm.password || !vm.email || !vm.name || !vm.interest){
			vm.error = 'Please add a Username, a Email, a Name, your Password and Select your interest field!';
		} else{
			if(vm.password !== vm.passwordRepeat){
				vm.error = 'Please make sure the passwords match.';
			} else{
				DataFactory.userregister(user).then(function(response){

					if(response.data.success){
					console.log(response);
					vm.isSuccesRegister = true;	                   
	                vm.error = false;
					vm.message = response.data.message;	
					$timeout(function() {
                    $location.path('/login');
                }, 2000);
					} else{
	  				vm.error = response.data.message;
	  			}

				}).catch(function(error){
					console.log(error.data.message);
					vm.error = error.data.message;
					
				});
			}
		}
	}
};