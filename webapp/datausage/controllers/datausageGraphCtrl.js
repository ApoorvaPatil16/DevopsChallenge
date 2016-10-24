angular.module('datamill')
    .component('datausageGraph', {
        bindings: {
            stats: "<"
        },
        templateUrl: '/datausage/templates/datausageGraph.html',
        controller: datausageGraphCtrl,
        transclude: true
    });

function datausageGraphCtrl($scope, $transclude) {
    var ctrl = this;
    console.log(ctrl.stats);
}
