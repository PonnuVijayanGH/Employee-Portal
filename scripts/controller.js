var employeePortalControllers = angular.module('employeePortalControllers',[]);
employeePortalControllers.controller('EmployeeListContrl',['$scope', 'Employee','$location',
	 function($scope,Employee,$location)	{
	 	// $http.get('json/employees.json').success(function(data){
	 	// 	$scope.employees = data;
	 	// });
		$scope.employees = Employee.list();	
		$scope.loc = $location.path();
		$scope.srtVal = "date";

		 $scope.deleteEmp = function (eid) {
		 	Employee.delete(eid);
		 };
	}]);

employeePortalControllers.controller('EmployeeDetailContrl',['$scope','$routeParams','$location','Employee',
	function($scope, $routeParams, $location, Employee)	{
		// $http.get('json/' + $routeParams.id +'.json').success(function(data){  -
		// 	$scope.employee = data;
		// });
		$scope.employee = Employee.getDetail($routeParams.eid);
		$scope.cancel = function() {
			$location.path('/manage');
		}
		$scope.save = function(employee) {
			Employee.save(employee);
			$location.path('/manage');
		}
	}]);
