var empApp = angular.module("empApp", ['ngRoute', 'employeePortalControllers', 'employeeServices']);
empApp.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
		when('/home',{
			templateUrl : 'partials/EmployeeList.html',
			controller : 'EmployeeListContrl'
		}).
		when('/home/:eid',{
			templateUrl : 'partials/EmployeeDetail.html',
			controller : 'EmployeeDetailContrl'
		}).
		when('/manage',{
			templateUrl : 'partials/EmployeeList.html',
			controller : 'EmployeeListContrl'
		}).
		when('/manage/:eid',{
			templateUrl : 'partials/EditEmployeeDetail.html',
			controller : 'EmployeeDetailContrl'
		}).
		otherwise({
			redirectTo : '/home'
		});
	}]);