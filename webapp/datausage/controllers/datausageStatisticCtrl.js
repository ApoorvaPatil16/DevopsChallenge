angular.module('datamill')
    .component('datausageStatistic', {

        templateUrl: '/datausage/templates/datausageStatistic.html',
        controller: datausageStatisticCtrl,
        transclude: true
    });

function datausageStatisticCtrl($scope, $transclude) {
    var ctrl = this;


};
