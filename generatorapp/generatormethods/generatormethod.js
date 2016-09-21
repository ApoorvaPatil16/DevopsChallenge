function managerFunction(domain) {
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
      result = callFunc(domain);
    }
    return result;
  } else {
    return generateRealValue(domain);
  }
}

function generateTimestamp(obj) {
  var maxtime = new Date(obj.range[0].max * 1000);
  var mintime = new Date(obj.range[0].min * 1000);
  return new Date(mintime.getTime() + Math.random() * (maxtime.getTime() - mintime.getTime()));

}

function generateString(obj) {
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
  return text;
}

function generateNumber(obj) {
  return Math.floor((Math.random() * (obj.range[0].max - obj.range[0].min)) + obj.range[0].min);
}

function generateDecimal(obj) {
  var afterDecimal = Math.floor((Math.random() * (10000 - 1)) + 1);
  var beforeDecimal = Math.floor((Math.random() * (obj.range[0].max - obj.range[0].min)) + obj.range[0].min);
  return beforeDecimal + "." + afterDecimal;
}

function generateDate(obj) {
  var start = new Date(obj.range[0].min * 1000);
  var end = new Date(obj.range[0].max * 1000);
  var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return JSON.stringify(date).substring(1, 11);
}

function generateBoolean(obj) {
  return Math.random() >= 0.5;
}

function generateHexadecimal(obj) {
  return '#' + Math.floor(Math.random() * obj.range[0].max).toString(16);
}

function generateRealValue(obj) {

}


module.exports = {
  managerFunction: managerFunction
}
