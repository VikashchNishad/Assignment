angular.module('sampleApp', ['ngRoute', 'angular-jwt']).config(config).run(run);


function config($httpProvider, $routeProvider, $locationProvider) {
		$httpProvider.interceptors.push(AuthInterceptor);
	$routeProvider
	.when('/', {
			templateUrl: 'angular-app/main/main.html',
			controller: mainController,
	         controllerAs: 'vm'
		})
     .when('/login', {
			templateUrl: 'angular-app/users/login/login.html',
			controller: LoginController,
			controllerAs: 'vm'
		})
		.when('/register', {
			templateUrl: 'angular-app/users/register/register.html',
			controller: RegisterController,
			controllerAs: 'vm'
		})
		.when('/science', {
			templateUrl: 'angular-app/views/science.html',
			controller: RegisterController,
			controllerAs: 'vm'
		})
		.when('/entertainment', {
			templateUrl: 'angular-app/views/entertainment.html',
			controller: RegisterController,
			controllerAs: 'vm'
		})
		.when('/sports', {
			templateUrl: 'angular-app/views/sports.html',
			controller: RegisterController,
			controllerAs: 'vm'
		})
		.otherwise({
			redirectTo: '/'
		});   

	$locationProvider.html5Mode(true);

};

	function run($rootScope, $location, $window, AuthFactory) {
		$rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
	    	if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
	     		event.preventDefault();
	        	$location.path('/');
    		}
  		});
	}