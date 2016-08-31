angular.module('datamill')
  .filter('capitalizeFirst', function() {
    return function(randomString) {
      if (randomString !== undefined) {
        var tempVar = randomString.slice(0, 1).toUpperCase();
        randomString = tempVar + randomString.slice(1, randomString.length);
      }
      return randomString;
    }
  });
