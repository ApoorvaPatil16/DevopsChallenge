var mongoose = require('mongoose');
var userModel = require('../users/userprofile');
var jwt = require('jsonwebtoken');
var uuid = require('node-uuid');

var authprocessor = {
    findUserProfile: function(query, successCallback, errorCallback) {
        userModel.find(query, function(err, result) {
            if (err) {
                return errorCallback(err);
            }
            return successCallback(result);
        })
    },
    createUserProfile: function(data, successCallback, errorCallback) {
        var userData = new userModel(data);
        userModel.save(function(err, result) {
            if (err) {
                return errorCallback(err);
            }
            return successCallback(result);
        })
    },
    generateToken: function(user, successCallback, errorCallback) {
        var userEmail = user.email;
        userModel.find({ 'email': userEmail }, function(err, found) {
            if (err) return handleError(err);
            if (found.length == 0) {
                console.log("not found");
                //For new user create user info entry
                var userprofileData = new userModel();
                userprofileData.email = userEmail;
                userprofileData.displayName = user.name;
                userprofileData.picture = user.picture;
                userprofileData.gender = user.gender;
                userprofileData.user_ID = user.id;
                console.log(userprofileData.email);
                userprofileData.save(function(err, data) {
                    if (err) {
                        return errorCallback(500, err)
                    } else {
                        console.log(data);
                        // JSONwebtoken
                        var secretKey = uuid.v4();
                        console.log(secretKey);
                        //preparing the claims, the payload
                        var payload = {
                            sub: data._id,
                            iss: 'https://localhost:8080',
                            email: data.email,
                        }
                        var token = jwt.sign(payload, secretKey, { expiresIn: "7d" });
                        return successCallback(201, {
                            success: true,
                            token: token
                        })
                    }
                })
            } else {
                //for an existing user 
                console.log("Found");
                // JSONwebtoken
                var secretKey = uuid.v4();
                console.log(secretKey);
                //preparing the claims, the payload
                console.log(found[0]._id);
                var payload = {
                    sub: found[0]._id,
                    iss: 'https://localhost:8080',
                    email: found[0].email,
                    // permissions: 'upload-photos'
                }
                var token = jwt.sign(payload, secretKey, { expiresIn: "7d" });
                return successCallback(201, {
                    success: true,
                    token: token
                })
            }
        })
    }
}

module.exports = authprocessor;
