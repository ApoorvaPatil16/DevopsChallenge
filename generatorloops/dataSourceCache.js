var ticker = require('../generatorapp/timeticker/timeticker')
var activeDataSrc = require('./activedatasrc')

var startBufferring = function() {
  var tickerObj = ticker('outsource', null, null, 'continuous', 1000)
  tickerObj.start(function() {
    activeDataSrc.bufferingDataSource()
  })
}

module.exports = {
  startBufferring: startBufferring
}
