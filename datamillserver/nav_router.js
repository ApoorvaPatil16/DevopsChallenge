var express = require('express');
var nav_router = express.Router();
nav_router.get('/', function(req, res) {
  var data = [{
    "appName": [{
      "id": 1,
      "name": "DataMill.io",
    }],
    "sideNavBottomItems": [{
      "id": 1,
      "link": "About",
      "state": "datamill.about"
    }],
    "sideNavItems": [{
      "id": 1,
      "icon": "dashboard",
      "state": "datamill.dashboard",
      "link": "Dashboard"
    }, {
      "id": 2,
      "icon": "launch",
      "state": "datamill.datamodeldefination({mode:'create',dataModel: {name: '',description: '',attributes: []}})",
      "link": "New Data Model"
    }, {
      "id": 3,
      "icon": "domain",
      "state": "datamill.listdomain",
      "link": "Data Domain",
      "children": [{
        "state": "datamill.randomDomain",
        "link": "Random"
      }, {
        "state": "meaningfulDomain",
        "link": "Realistic"
      }]
    }, {
      "id": 4,
      "icon": "backup",
      "state": "datamill.datasource",
      "link": "Data Sources"
    }],
    "accountItems": [{
      "id": 1,
      "name": "Profile",
      "link": "datamill.userprofile",
      "func": "profile"
    }, {
      "id": 2,
      "name": "SignOut",
      "link": "#",
      "func": "logout"
    }],
    "materialIcons": [{
      "id": 1,
      "name": "menu"
    }, {
      "id": 1,
      "name": "notifications"
    }, {
      "id": 1,
      "name": "account_circle"
    }]
  }];
  return res.send(data);
});
module.exports = nav_router;
