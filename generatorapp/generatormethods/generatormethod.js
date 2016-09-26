var getRealVal = require('../pipelining/redisSubscribe');

function managerFunction(domain, cb) {
  if (domain.type != "Real Domain") {
    var mapperObj = {
      'String': generateString,
      'Number': generateNumber,
      'Decimal': generateDecimal,
      'Hexadecimal': generateHexadecimal,
      'Boolean': generateBoolean,
      'Date': generateDate,
      'TimeStamp': generateTimestamp
    };
    var result = {};
    var callFunc = mapperObj[domain.base];
    if (callFunc) {
      return callFunc(domain, cb);
    }
  } else {
    return generateRealValue(domain, cb);
  }
}

function generateTimestamp(obj, cb) {
  var maxtime = new Date(obj.range[0].max * 1000);
  var mintime = new Date(obj.range[0].min * 1000);
  return cb(new Date(mintime.getTime() + Math.random() * (maxtime.getTime() - mintime.getTime())));

}

function generateString(obj, cb) {
  var maxword = obj.range[0].max;
  var minword = obj.range[0].min;
  var maxlength = obj.range[1].max;
  var minlength = obj.range[1].min;
  var randArr = [];
  var length = Math.floor((Math.random() * (maxlength - minlength)) + minlength);
  var words = Math.floor((Math.random() * (maxword - minword)) + minword);
  var text = "";
  var possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }

  function createRandomPosition(length) {
    var randomPosition = Math.floor((Math.random() * ((length - 1) - 1)) + 1);
    for (var j = 0; j < randArr.length; j++) {
      if (randomPosition == randArr[j]) {
        createRandomPosition(length);
      }
    }
    return randomPosition;
  }
  for (var i = 0; i < words; i++) {
    var randomPosition = createRandomPosition(length);
    randArr.push(randomPosition);
    text = text.substring(0, (randomPosition - 1)) + " " + text.substring(randomPosition);
  }
  return cb(text);
}

function generateNumber(obj, cb) {
  return cb(Math.floor((Math.random() * (obj.range[0].max - obj.range[0].min)) + obj.range[0].min));
}

function generateDecimal(obj, cb) {
  var afterDecimal = Math.floor((Math.random() * (10000 - 1)) + 1);
  var beforeDecimal = Math.floor((Math.random() * (obj.range[0].max - obj.range[0].min)) + obj.range[0].min);
  return cb(beforeDecimal + "." + afterDecimal);
}

function generateDate(obj, cb) {
  var start = new Date(obj.range[0].min * 1000);
  var end = new Date(obj.range[0].max * 1000);
  var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return cb(JSON.stringify(date).substring(1, 11));
}

function generateBoolean(obj, cb) {
  return cb(Math.random() >= 0.5);
}

function generateHexadecimal(obj, cb) {
  return cb('#' + Math.floor(Math.random() * 16777215).toString(16));
}

function generateRealValue(obj, cb) {
  console.log("inside generateRealValue");
  return getRealVal.getRealData(obj.base, obj.email, function(data) {
    var i = 0;
    console.log("Vishal:", data);
    while (i < obj.transformers.length) {
      if (obj.transformers[i].name == "UpperCase") {
        data = data.toUpperCase();
      }
      if (obj.transformers[i].name == "LowerCase") {
        data = data.toLowerCase();
      }
      if (obj.transformers[i].name == "CamelCase") {
        dataArr = data.split(" ");
        var finalVal = dataArr[0];
        for (var j = 1; j < dataArr.length; j++) {
          dataArr[j] = dataArr[j].charAt(0).toUpperCase() + dataArr[j].substring(1);
          finalVal = finalVal + dataArr[j];
        }
        data = finalVal;
      }
      if (obj.transformers[i].name == "Prefix") {
        data = obj.transformers[i].value + data;
      }
      if (obj.transformers[i].name == "Suffix") {
        data = data + obj.transformers[i].value;
      }
      i++;
    }
    return cb(data);
  });
}


module.exports = {
  managerFunction: managerFunction
}
