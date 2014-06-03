var employeeServices = angular.module("employeeServices", ['ngResource']);
// employeeServices.factory('Employee',['$http',function() {   - usage of factory
// 	var factory = {};
// 	factory.list = function($http)	{
// 		$http.get('json/employees.json').success(function(data){
// 			employees = data;
// 			return employees;
// 		};
// 		return factory;
// }]);

// employeeServices.service('Employee',['$http',function($http) { //- usage of simple service with http
// 	this.list = function()	{
// 		$http.get('json/employees.json').success(function(d){
// 			employees.length = 0;
// 		      for(var i = 0; i < d.length; i++){
// 		        employees.push(d[i]);
// 		      }
// 		});
// 		return employees;
// 	};

// }]);


employeeServices.service('Employee',['$resource',function($resource) { 
	var employees = [];
	 var empResource = $resource('json/employees.json', {});
		//{query : {method : 'GET', isArray : true}});
	//var empResource = $resource('json/employees.json', {});

	this.list = function(){
		 if(employees.length == 0)
		 employees =  empResource.query();
		 return employees;
	};

	this.getDetail = function(eid) {
		// return empResource.get({id:eid});
        for (i in employees) {
            if (employees[i].id == eid) {
                return employees[i];
            }
        }
	}

	this.delete = function (eid) {
        for (i in employees) {
            if (employees[i].id == eid) {
                employees.splice(i, 1);
            }
        }
    }

     this.save = function (employee) {
        if (employee.id == null) {  //add employee - not implemented
            employee.id = Math.random();
            employees.push(employee);
        } else {
            //for existing employee, find this employee using id
            //and update it.
            for (i in employees) {
                if (employees[i].id == employee.id) {
                    employees[i] = employee;
                }
            }
        }
 
    }

    
}]);