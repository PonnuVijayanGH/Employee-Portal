var employeePortalControllers = angular.module('employeePortalControllers',[]);
var employeesMain;
var employeesCopy = null;

employeePortalControllers.controller('EmployeeListContrl',['$scope', 'Employee','$location','$routeParams',
	 function($scope,Employee,$location, $routeParams)	{

		getEmployees();
		
		if($routeParams.eid != null && employeesCopy != null) {
			$scope.employee = getDetail($routeParams.eid);
		}


		$scope.newEmployee = initEmp();
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
			Employee.add(nEmployee).then(function(data){
				getEmployees();
			}, function(){

			});

			$location.path('/manage');
		}

		$scope.getVal = function (arr, val) {
    		for (i in arr) {
    			if(arr[i].name == val) {
    				return arr[i].value;
    			}
    		}
    		return null;
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
		        if (employeesCopy[i]._id == eid) {
		            return employeesCopy[i];
		        }
    		}
    		return null;
    	}

    	

    	function initEmp() {
    		var emp = {};
    		emp = {
				"name" : "",
				"designation" : "",
				"email" : "",
				"phone" : "",
				"date" : "",
				"id" : "",
				"image" : "emp01.jpg",
				"contactInfo" : [
				{
					"name" : "Address",
					"value" : ""
				},
				{
					"name" : "Phone",
					"value" : ""
				},
				{
					"name" : "Email",
					"value" : ""
				}
		],
		"projectInfo" : [
				{
					"name":"",
					"details" : [
						{
							"name" : "Technology",
							"value" : ""
						},
						{
							"name" : "Description",
							"value" : ""
						}
					]

				},
				{
					"name":"",
					"details" : [
						{
							"name" : "Technology",
							"value" : ""
						},
						{
							"name" : "Description",
							"value" : ""
						}
					]
				}
			],
		"eduInfo" : [
				{
					"name" : "Secondary",
					"value" : ""
				},
				{
					"name" : "Higher Secondary",
					"value" : ""
				},
				{
					"name" : "Degree",
					"value" : ""
				}
			]
	};
	return emp;
    	}


	}]);

