angular
.module('datamill')
.controller('createdatasourceController',populate);
function populate($stateParams,postdataService,$state) {
var ctrl = this;
	ctrl.user={}
    ctrl.user.tags = [];
    ctrl.user=$stateParams.user;
    ctrl.add=function() {
    	
postdataService.postdatasources(ctrl.user);
$state.go('datamill.datasource');
    }

}


