var mongoose = require('mongoose');
var importsourceModel = require('../../datamillserver/datasource/importdataSchema');

function passdatasource(sourcename, email, callback) {
  console.log(sourcename + email);
  importsourceModel.find({ sourcename: sourcename, email: email }, function(err, docs) {
    if (err) {
      console.log("error in passdatasource in fetching data from datasource");
      console.log(err)
    } else {
      console.log("success callback from passdatasource");
      var data = docs[0].data;
      var length = data.length;
      var randomvalue = Math.floor(Math.random() * (length));
      // console.log("Vishal:" + data[randomvalue].firstname);
      // return (data[randomvalue].firstname);
      return callback(data[randomvalue].firstname);
    }
  });
}
module.exports = { passdatasource: passdatasource };
