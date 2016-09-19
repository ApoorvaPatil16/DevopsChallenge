/*writing test cases for the ticker component*/
var ticker = require('../datamillserver/timeticker/timeticker');
var expect = require('chai').expect;

describe('Scenario: Instantiate Ticker with Parameters', function() {

  it('Instantiate ticker instance', function(done) {
    //There will be multiple data models trying to run in parallel, each requires their own copy of the ticker
    //As each data model will have its own schedule, rate or frequency and occurrences 
    var simpleTicker = new ticker();
    expect(simpleTicker).to.not.equal(undefined);
    expect(simpleTicker).to.not.equal(null);
    expect(simpleTicker).to.be.an('object');
    expect(simpleTicker.name()).to.equal('ticker');
    done();
  });

  it('Test there are multiple and different instances of Ticket getting created', function(done) {

    var ticketOne = new ticker('one');
    var ticketTwo = new ticker('two');

    expect(ticketOne.name()).to.not.equal(ticketTwo.name());
    expect(ticketOne).to.not.equal(ticketTwo);
    done();
  });

  it('Instantiate the ticker with default configuration', function(done) {
    var simpleticker = new ticker();
    var defaultconf = {
      name: "ticker",
      end: undefined,
      start: undefined,
      regularinterval: 100,
      irregularconfig: undefined,
      timer: undefined,
      running: false,
      scheduled: false,
      starttimer: undefined,
      endtimeout: undefined
    };
    expect(simpleticker).to.be.an('object')
    expect(simpleticker.conf).to.deep.equal(defaultconf)
    done()
  });

  it('Instantiate ticker which can start immediately', function(done) {
    var simpleticker = new ticker();
    var defaultconf = {
      name: "ticker",
      end: undefined,
      start: undefined,
      regularinterval: 100,
      irregularconfig: undefined,
      timer: undefined,
      running: false
    };
    expect(simpleticker).to.be.an('object')
    expect(simpleticker.conf.start).to.equal(undefined);
    done()
  });

  it('Instantiate ticker which can start at a future time', function(done) {
    var now = new Date();
    var future = new Date(now.getTime() + 60000 * 12);

    var simpleticker = new ticker(null, future);
    var defaultconf = {
      name: "ticker",
      end: undefined,
      start: future,
      regularinterval: 100,
      irregularconfig: undefined,
      timer: undefined,
      running: false
    };
    expect(simpleticker).to.be.an('object')
    expect(simpleticker.conf.start).to.be.above(now)
    done()

  });

  it('Instantiate ticker which can stop', function(done) {
    var simpleticker = new ticker();
    expect(simpleticker).to.be.an('object')
    expect(simpleticker.stop).to.not.equal(undefined)
    expect(simpleticker.stop).to.not.equal(null)
    done()
  });

  it('Instantiate ticker which can be stopped at a specific time in future', function(done) {
    var now = new Date();
    var future = new Date(now.getTime() + 60000 * 12);

    var simpleticker = new ticker(null, null, future);
    expect(simpleticker).to.be.an('object')
    expect(simpleticker.stop).to.not.equal(undefined)
    expect(simpleticker.conf.end).to.be.above(now)
    done()
  });

  it('Instantiate ticker for continuous ticking', function(done) {
    done("test cases to be develop")
  });

  it('Instantiate ticker for burst mode ticking', function(done) {
    done("test cases to be develop")
  });
});

describe('Scenario: Ticking the ticker', function() {

  it('start ticking', function(done) {
    var simpleTicker = new ticker('one');
    var ticks = 0;
    simpleTicker.start(function() {
      console.log('Tick ' + (++ticks));
      if (ticks == 10) {
        simpleTicker.stop()
        expect(ticks).to.be.equal(10)
        expect(simpleTicker.conf.running).to.be.false;
        done();
      }
    });
  });
  it('immediate stop ticking', function(done) {
    var simpleTicker = new ticker('one');
    var ticks = 0;
    simpleTicker.start(function() {
      console.log('Tick ' + (++ticks));
      if (ticks == 10) {
        simpleTicker.stop()
        expect(ticks).to.be.equal(10)
        expect(simpleTicker.conf.running).to.be.false;
        done("it should be stop immediately");
      }
    });
    simpleTicker.stop()
    expect(ticks).to.be.equal(0)
    expect(simpleTicker.conf.running).to.be.false;
    done();
  });
  it('Start ticking at future time', function(done) {
    this.timeout(70000)
    var now = new Date();
    var future = new Date(now.getTime() + 60000 * 1);

    var simpleticker = new ticker(null, future);
    expect(simpleticker).to.be.an('object')
    expect(simpleticker.conf.start).to.be.above(now)
    simpleticker.start(function() {
      var actualstart = new Date()
      if (actualstart.getTime() >= future.getTime()) {
        console.log("getting first tick");
        simpleticker.stop()
        return done()
      }
      return done("start early")
    })
  }, 70000)
});
