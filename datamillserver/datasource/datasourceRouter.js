var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var datasourceSchema = require('./datasourceSchema');
var importsourceSchema = require('./importdataSchema');
var datasource_router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
datasource_router.post('/', function(req, res) {
    var add = {
        name: req.body.name,
        tags: req.body.tags,
        description: req.body.description,
        email:req.email,
    }
    var savedata = {
        email:req.email,
        "sourcename": req.body.name,
        "data": req.body.json
    }
    var dataSourceData = new datasourceSchema(add);
    var postdata = new importsourceSchema(savedata);
    dataSourceData.save(function(err, result) {
        if (err) {
            return res.send(err);
        }
        console.log(result);
        postdata.save(function(err, impresult) {
            if (err) {
                return res.send(err);
            }
            console.log(impresult);
            return res.send(result);
        })
    });
});

datasource_router.patch('/', function(req, res){
datasourceSchema.findOneAndUpdate({name:req.body.name,email:req.email},req.body,function(err,doc){
if(err){ 
return res.send(err);
}
else
{
    return res.send(doc);
}
});
});

datasource_router.get('/', function(req, res) {
    datasourceSchema.find({email:req.email},function(err, result) {
        if (err) return console.error(err);
        return res.send(result);

    });
});
module.exports =datasource_router;
