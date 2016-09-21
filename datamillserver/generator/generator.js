highland = require('highland');
var generatorfunction = {
  createMapper: function(attributeList) {
    var mapper = [];
    attributeList.forEach(function(attrObj) {
      mapper.push(highland.flatMap(function(obj) {
        return highland(function(push, next) {
          return mongoClient.connect("mongodb://localhost:27017/datamillserver", function(err, db) {
            return db.collection('importdata').findOne({ sourcename: attrObj.domain }, function(err, result) {
              obj[attrObj.name] = result.data[Math.floor((Math.random() * 100) + 1)][fristname];
              console.log("db returns", obj);
              db.close();
              push(err, obj);
              push(null, highland.nil);
            })
          })
        })
        obj[attrObj.name] = "something";
        return obj;
      }))
    })
    return highland.pipeline.apply(null, mapper);
  },
  createSource: function(domainObj) {
    if (domainObj.delivery) {
      if (domainObj.delivery == 'feed' && domainObj['datafeed'] && domainObj["datafeed"].end) {
        var end = new Date(domainObj["datafeed"].end)
        return function(push, next) {
          push(null, {});
          if (Date.now < end) {
            next();
          }
        }
      } else if (domainObj.delivery == 'downloads' && domainObj['download'] && domainObj["download"].packets) {
        var packets = domainObj["download"].packets;
        return function(push, next) {
          push(null, {});
          if (i < packets) {
            i++;
            next();
          }
        }
      }
    } else {
      return function(push, next) {
        push(null, {});
      }
    }
  }
}
