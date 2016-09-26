var ticker = function(name, starttime, endtime, mode, intervalorbrust) {
  //computing time interval
  function computeTimeInterval(time) {
    var computedinterval = time - new Date();
    if (computedinterval >= 0)
      return computedinterval;
    else return 0;
  };
  //checking is their end time is before start time
  function checkStartAndEnd(start, end) {
    if (end)
      if (start < end) {
        return true;
      } else return false;
    else return true;
  };
  //It never used but implement for constructing the object without any further crash
  function checkArgument() {
    if (mode == 'continuous' || mode == 'none' || mode == 'burst') {
      return true;
    } else {
      return false;
    }
  };
  //utility function to generate a irregular interval
  function randomTimeInterval(end, count) {
    if (end) return (Math.random() * ((end - count) - new Date()) + 1)
    else return (Math.random() * 1000 + 1)
  }
  return {
    name: function() {
      return this.conf.name;
    },
    //self object returns the dependent configuration
    conf: {
      name: name || "ticker", //timer name
      end: endtime || undefined, //schedule end time so the ticker to stop
      start: starttime || undefined, //  
      intervalorburst: intervalorbrust || 100,
      timer: undefined,
      mode: mode || 'none',
      running: false,
      status: "notstart",
      scheduled: false,
      starttimer: undefined,
      endtimer: undefined,
      currentcount: 0
    },
    //function to call the ticker instantiate
    start: function(cb, stopcb) {
      var self = this;
      if (self.conf.start) {
        if (self.conf.scheduled) {
          self.conf.running = true;
          if (self.conf.mode == 'continuous' || self.conf.mode == 'none') {
            self.conf.timer = setInterval(cb, self.conf.intervalorburst);
          } else if (self.conf.mode == 'burst') {
            var recursivecb = function() {
              cb();
              if (++self.conf.currentcount < self.conf.intervalorburst) {
                self.conf.timer = setTimeout(recursivecb, randomTimeInterval(self.conf.end, self.conf.currentcount))
              } else {
                clearTimeout(self.conf.timer)
                self.conf.timer = undefined;
                self.conf.running = false;
                self.conf.status = "completed";
              }
            }
            self.conf.timer = setTimeout(recursivecb, randomTimeInterval(self.conf.end, self.conf.currentcount))
          }
        } else self.scheduler(cb, stopcb);
      } else {
        self.conf.running = true;
        if (self.conf.mode == 'continuous' || self.conf.mode == 'none') {
          if (self.conf.end) {
            if (computeTimeInterval(self.conf.end)) self.conf.timer = setInterval(cb, self.conf.intervalorburst);
          } else {
            self.conf.timer = setInterval(cb, self.conf.intervalorburst);
          }
          if (self.conf.end) {
            var endtimeout = computeTimeInterval(self.conf.end);
            if (endtimeout) self.conf.endtimer = setTimeout(function() {
              self.stop(stopcb);
            }, endtimeout);
          }
        } else if (self.conf.mode == 'burst') {
          var recursivecb = function() {
            cb();
            if (++self.conf.currentcount < self.conf.intervalorburst) {
              self.conf.timer = setTimeout(recursivecb, randomTimeInterval(self.conf.end, self.conf.currentcount))
            } else {
              clearTimeout(self.conf.timer)
              self.conf.timer = undefined;
              self.conf.running = false;
              self.conf.status = "completed";
            }
          }
          self.conf.timer = setTimeout(recursivecb, randomTimeInterval(self.conf.end, self.conf.currentcount))
        }
      }
    },
    //scheduler to schedule when to call start and when to call stop
    scheduler: function(startcb, stopcb) {
      var self = this;
      var starttimeout = computeTimeInterval(self.conf.start);
      if (self.conf.end)
        var endtimeout = computeTimeInterval(self.conf.end);
      if (checkStartAndEnd(starttimeout, endtimeout)) {
        self.conf.scheduled = true;
        self.conf.starttimer = setTimeout(function() { self.start(startcb) }, starttimeout);
        if (endtimeout) self.conf.endtimer = setTimeout(function() {
          self.stop(stopcb);
        }, endtimeout);
      } else {
        throw "start and time not set properly";
      }
    },
    //stop the the ticker
    stop: function(cb) {
      var self = this;
      clearInterval(self.conf.timer);
      self.conf.timer = undefined;
      self.conf.running = false;
      self.conf.status = "completed";
      if (cb) cb();
    },
    //cancel any scheduled timers
    cancelschedular: function() {
      clearTimeout(self.conf.starttimer);
      clearTimeout(self.conf.endtimer);
      self.conf.starttimer = undefined;
      self.conf.endtimer = undefined;
      self.conf.scheduled = false;
      self.conf.status = "interrupted"
    }
  }
}

module.exports = ticker;
