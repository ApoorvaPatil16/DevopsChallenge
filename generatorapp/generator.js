var highland = require('highland');
var pipeliner = require('./pipelining/attrpipeline')

function kicker(datamodel, cb) {
  var intrvl = undefined;
  var counter = 0;
  var genPipe = pipeliner.attrPipeline(datamodel.attributes);
  process.nextTick(function() {
    highland(function(push, next) {
        var ticker = function() {
          // console.log("counter: ", counter);
          if (counter >= 10) {
            if (intrvl) {
              clearInterval(intrvl)
            }
          } else {
            ++counter;
            // push(null, { count: counter });
            push(null, {});
          }
          next();
        }
        if (counter == 0) {
          intrvl = setInterval(ticker, 200);
        }
      })
      .pipe(genPipe)
      .each(function(data) {
        console.log(data);
        cb(data);
      });
  });
}

module.exports = {
  kicker: kicker
}
