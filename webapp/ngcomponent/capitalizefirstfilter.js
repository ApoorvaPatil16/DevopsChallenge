angular.module('datamill')
  .directive('capitalizeFirst', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        ngModel: "="
      },
      link: function(scope, element, attrs, ngModel) {
        element.on('change', function() {
          if (scope.ngModel) {
            // scope.ngModel = scope.ngModel.replace(/[^a-zA-Z ]/g, "");
            scope.ngModel = scope.ngModel.trim();
            scope.ngModel = scope.ngModel.slice(0, 1).toUpperCase() + scope.ngModel.slice(1, scope.ngModel.length);
          }
        })
      }
    }
  })
