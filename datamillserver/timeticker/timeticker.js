var ticker = function(name, starttime, endtime, interval, irregularconfig) {
  function computeTimeInterval(time) {
    var computedinterval = time - new Date();
    if (computedinterval >= 0)
      return computedinterval;
    else return 0;
  }
  //checking is their end time is before start time
  function checkStartAndEnd(start, end) {
    if (end)
      if (start < end) {
        return true;
      } else return false;
    else return true;
  }
  //utility function to generate a irregular interval
  function random(self) {

  }
  return {
    name: function() {
      return this.conf.name;
    },
    //self object returns the dependent configuration
    conf: {
      name: name || "ticker",
      end: endtime || undefined,
      start: starttime || undefined,
      regularinterval: interval || 100,
      irregularconfig: irregularconfig || undefined,
      timer: undefined,
      running: false,
      scheduled: false,
      starttimer: undefined,
      endtimeout: undefined
    },
    //function to call the ticker instantiate
    start: function(cb) {
      var self = this;
      if (self.conf.start) {
        if (self.conf.scheduled) {
          self.conf.running = true;
          self.conf.timer = setInterval(cb, self.conf.regularinterval);
        } else self.schedular(cb);
      } else {
        self.conf.running = true;
        self.conf.timer = setInterval(cb, self.conf.regularinterval);
      }
    },
    schedular: function(cb) {
      var self = this;
      var starttimeout = computeTimeInterval(self.conf.start);
      if (self.conf.end)
        var endtimeout = computeTimeInterval(self.conf.end);
      if (checkStartAndEnd(starttimeout, endtimeout)) {
        self.conf.scheduled = true;
        setTimeout(function() { self.start(cb) }, starttimeout);
        if (endtimeout) setTimeout(function() {
          self.stop();
        }, endtimeout);
      } else {
        throw "start and time not set properly";
      }
    },
    stop: function() {
      var self = this;
      clearInterval(self.conf.timer);
      self.conf.timer = undefined;
      self.conf.running = false;
    },
    cancelschedular: function() {

    }
  }
}

module.exports = ticker;
