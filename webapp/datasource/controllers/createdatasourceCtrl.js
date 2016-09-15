angular
    .module('datamill')
    .controller('createdatasourceController', populate);

function populate($stateParams,$log, listdataService, postdataService, $state, $mdDialog,$http,$location, $anchorScroll) {
    var ctrl = this;
    ctrl.user = {}
    ctrl.user.tags = [];
    ctrl.mode = $stateParams.mode;
    ctrl.user = $stateParams.user;
    ctrl.add = function() {
        $location.hash('errorid');
        $anchorScroll.yOffset = 1000;
        $anchorScroll();
        if (ctrl.mode == 'create') {
            listdataService.isnamepresent(ctrl.user).then(function(res) {
                if (res == "true") {
                    ctrl.nameexistserror = true;
                } else {
                    if (ctrl.user.tags.length == 0) {
                        ctrl.showerror = true;
                    }
                    if (ctrl.user.name != null && ctrl.user.tags.length != 0 && ctrl.user.description != null) {
                        try {
                            var Obj = JSON.parse(ctrl.user.json);
                            ctrl.user.json = Obj;
                            if (Obj && typeof Obj === "object") {
                                postdataService.postdatasources(ctrl.user).then(function(response) {
                                    $state.go('datamill.datasource');
                                }, function(error) {});
                            }
                        } catch (e) {
                            ctrl.jsonerror = true;
                        }
                    }
                }
            });
        }
        if (ctrl.mode == 'edit') {
            if (ctrl.user.tags.length == 0) {
                ctrl.showerror = true;
            }
            if (ctrl.user.description != null && ctrl.user.tags.length != 0) {
             $http({
                method:'PATCH',
                data:ctrl.user,
                url:'/datasources'
             }).then(function successcallback(response){
                $log.info("response of successcallback for patch");
                $log.info(response);
                $state.go('datamill.datasource');
             },function errorcallback(response){
                $log.info("response of errorback for patch");
                $log.info(response);
             });
            }
        }
    }
}

