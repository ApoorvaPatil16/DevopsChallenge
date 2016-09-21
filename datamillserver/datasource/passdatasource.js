var mongoose = require('mongoose');
var importsourceModel = require('./importdataSchema');
function passdatasource(sourcename,email) {
	console.log("inside passdatasource");
	importsourceModel.find({sourcename:sourcename,email:email},function(err,docs){
		if(err)
		{
			console.log("error in passdatasource in fetching data from datasource");
			console.log(err)
		}
		else
		{ console.log("success callback from passdatasource");
			var data=docs[0].data;
			var length=data.length;
			var randomvalue=Math.floor(Math.random()*(length));
			return (data[randomvalue]);
		}
	});	
}
module.exports=passdatasource;