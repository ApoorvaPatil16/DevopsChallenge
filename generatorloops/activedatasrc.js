var passdataSrc = require('../generatorapp/pipelining/passdatasource')

var activeSrcObj = {
        activedatasource: {},
        registerDataSource: registerDataSource,
        unregisterDataSource: unregisterDataSource.
        bufferingDataSource: bufferingDataSource
    }
    //register a dataSrc for became active
function registerDataSource(attributeList) {
    attributeList.forEach(function(attr) {
        if (attr.options.type == 'Real Domain') {
            var key = attr.options.base + '_' + attr.options.email
            activeSrcObj.activedatasource[key] = { sourcename: attr.options.base, email: attr.options.email }
            if (activeSrcObj.activedatasource[key]['counts']) activeSrcObj.activedatasource[key]['counts']++;
            else activeSrcObj.activedatasource[key]['counts'] = 1;
        }
    })
}
//unregistered the DataSource 
function unregisterDataSource(attributeList) {
    attributeList.forEach(function(attr) {
        if (attr.options.type == 'Real Domain') {
            var key = attr.options.base + '_' + attr.options.email
            activeSrcObj.activedatasource[key]['counts']--;
            if (activeSrcObj.activedatasource[key]['counts'] == 0) {
                passdataSrc.client.del(attr.options.email, function(err, res) {
                    if (err) console.log("error while deleting key of redis", err);
                    else {
                        console.log("removed key", res);
                    }
                });
            }
        }
    })
}
//
function bufferingDataSource() {
    var keys = Object.keys(activeSrcObj.activedatasource);
    if (keys) keys.forEach(function(key) {
        //console.log("get the key",key)
        if (activeSrcObj.activedatasource[key]['counts'] > 0)
            passdataSrc.passdatasource(activeSrcObj.activedatasource[key]['sourcename'], activeSrcObj.activedatasource[key]['email'])
    })
}
module.exports = activeSrcObj
