var employeePortalControllers = angular.module('employeePortalControllers',[]);
employeePortalControllers.controller('EmployeeListContrl',['$scope', 'Employee','$location',
	 function($scope,Employee,$location)	{

		getEmployees();
			
		$scope.loc = $location.path();
		$scope.srtVal = "date";

		 $scope.deleteEmp = function (eid) {
		 	Employee.delete(eid).then(function(data){
		 		//success
		 		getEmployees();
		 	}, function(){
		 		//failure
		 	});
		 }

		 function getEmployees() {
		 	Employee.list().then(function(data){
				$scope.employees = data;
			}, function(){
				//failure handler
			});
		 }
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
