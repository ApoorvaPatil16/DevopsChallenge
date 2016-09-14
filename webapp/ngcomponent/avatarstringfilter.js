angular.module('datamill')
  .filter('avatarstring', function() {
    return function(inputString) {
      if (inputString) {
        var words = inputString.match(/(".+?"|\w+)/g);
        if (words[1])
          return words[0].toUpperCase() + " " + words[1].toUpperCase();
        return words[0].toUpperCase();
      }
    }
  })
