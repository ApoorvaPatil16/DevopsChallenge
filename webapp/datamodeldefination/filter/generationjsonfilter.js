angular.module('datamill')
  .filter('generationjson', function() {
    return function(json) {
      json = JSON.parse(json);
      var tempjson = {};
      json.attributes.forEach(function(attr) {
        tempjson[attr.name] = { type: attr.domain };
        if (attr.isUnique === true) {
          tempjson[attr.name]['isUnique'] = 'true';
        }
      })
      return tempjson;
    }
  })
