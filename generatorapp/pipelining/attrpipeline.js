var managerFunction = require('../generatormethods/generatormethod');
var highland = require('highland')
  ///[{name:"",domain:"",options:{[{}]},uniqueness:"boolean"}]
function attrPipeline(attrList) {
  var myAttrPipeline = [];
  var createGenMapper = function(field, settings) {
    var genMap = highland.map(function(data) {
      var result = managerFunction.managerFunction(settings);
      data[field] = result;
      return data;
    });
    return genMap;
  }
  for (i = 0; i < attrList.length; ++i) {
    var field = attrList[i].name;
    var settings = attrList[i].options;
    // var dataDomainObj = bring from DB now;
    // var genMap = createGenMapper(field, dataDomainObj);
    var genMap = createGenMapper(field, settings);
    myAttrPipeline.push(genMap);
  }
  return highland.pipeline.apply(null, myAttrPipeline);
}

module.exports = {
  attrPipeline: attrPipeline
}
