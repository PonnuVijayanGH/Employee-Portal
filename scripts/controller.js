var employeePortalControllers = angular.module('employeePortalControllers',[]);
var employeesMain;
var employeesCopy;

employeePortalControllers.controller('EmployeeListContrl',['$scope', 'Employee','$location','$routeParams',
	 function($scope,Employee,$location, $routeParams)	{

		getEmployees();
		
		if($routeParams.eid != null && employeesCopy.length != 0) {
			$scope.employee = getDetail($routeParams.eid);
		}

		$scope.newEmployee = initEmp();
		$scope.loc = $location.path();
		$scope.srtVal = "date";
		// $scope.$watch(function () { return HelperServ.getUpdateData(); }, function (newValue, oldValue) {
	 //        if (newValue != null) {
	 //            $scope.update = newValue;
	 //            $scope.employees = employeesCopy;
	 //            //reload whatever needs updating here
	 //        }
	 //    }, true);
		 $scope.deleteEmp = function (eid) {
		 	Employee.delete(eid).then(function(data){
		 		//success
		 		getEmployees();
		 	}, function(){
		 		//failure
		 	});
		 }

    	$scope.cancel = function() {
			$location.path('/manage');
		}
		$scope.save = function(employee) {
			Employee.save(employee).then(function(data){
		 		//success
		 		for (i in employeesCopy) {
			        if (employeesCopy[i].id == employee.id) {
			            employeesCopy[i] = employee;
			            return;
			        }
    			}
    			return;
		 	}, function(){
		 		//failure
		 	});
			$location.path('/manage');
		}

		$scope.add = function(nEmployee) {
			
		}
		function getEmployees() {
		 	Employee.list().then(function(data){
		 		employeesMain = employeesCopy = data;
				$scope.employees = employeesCopy;
			}, function(){
				//failure handler
			});
		 }

		 function getDetail(eid) {
			 for (i in employeesCopy) {
		        if (employeesCopy[i].id == eid) {
		            return employeesCopy[i];
		        }
    		}
    		return null;
    	}

    	function initEmp() {
    		var emp = {};
    		emp.image = "emp02.jpg";
    		return emp;
    	}


	}]);

// employeePortalControllers.controller('EmployeeDetailContrl',['$scope','$routeParams','$location','Employee',
// 	function($scope, $routeParams, $location, Employee)	{
// 		// $http.get('json/' + $routeParams.id +'.json').success(function(data){  -
// 		// 	$scope.employee = data;
// 		// });
// 		$scope.employee = getDetail($routeParams.eid);
// 		$scope.newEmployee = {};

// 		function getDetail(eid) {
// 			 for (i in employeesCopy) {
// 		        if (employeesCopy[i].id == eid) {
// 		            return employeesCopy[i];
// 		        }
//     		}
//     		return null;
//     	}

// 		$scope.cancel = function() {
// 			$location.path('/manage');
// 		}
// 		$scope.save = function(employee) {
// 			Employee.save(employee).then(function(data){
// 		 		//success
// 		 		for (i in employeesCopy) {
// 			        if (employeesCopy[i].id == employee.id) {
// 			            employeesCopy[i] = employee;
// 			            return;
// 			        }
//     			}
//     			return;
// 		 	}, function(){
// 		 		//failure
// 		 	});
// 			$location.path('/manage');
// 		}
// 	}]);
