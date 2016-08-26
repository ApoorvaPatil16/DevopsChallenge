angular
.module('datamill')
.controller('createdatasourceController',populate);
function populate($stateParams,postdataService) {
var ctrl = this;
	ctrl.user={}
    ctrl.user.tags = [];
    ctrl.user=$stateParams.user;
    ctrl.add=function() {
    	
postdataService.postdatasources(ctrl.user);
    }

}


