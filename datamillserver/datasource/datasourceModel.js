var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var datasourceSchema = require('./datasourceSchema');
var importsourceSchema = require('./importdataSchema');
var createdatasource_router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
createdatasource_router.post('/', function(req, res) {
    mongoose.connect('mongodb://localhost:27017/datamillserver');
    var add = {
        name: req.body.name,
        tags: req.body.tags,
        description: req.body.description
    }
    var savedata = {
        "sourcename": req.body.name,
        "data": req.body.json
    }
    var dataSourceData = new datasourceSchema(add);
    var postdata = new importsourceSchema(savedata);
    dataSourceData.save(function(err, result) {
        if (err) {
            mongoose.connection.close();
            return res.send(err);
        }
        console.log(result);
        // return res.send(result);
        postdata.save(function(err, impresult) {
            mongoose.connection.close();
            if (err) {
                return res.send(err);
            }
            console.log(impresult);
            return res.send(result);
        })
    });
});

createdatasource_router.patch('/', function(req, res){
mongoose.connect('mongodb://localhost:27017/datamillserver');
datasourceSchema.findOneAndUpdate({name:req.body.name},req.body,function(err,doc){
if(err){ mongoose.connection.close();
return res.send(err);
}
else
{
    mongoose.connection.close();
    return res.send(doc);
}
});
});
module.exports = createdatasource_router;

