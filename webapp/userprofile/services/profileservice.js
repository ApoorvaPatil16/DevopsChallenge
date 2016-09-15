angular.module('datamill')
.factory('profileservice',['$http',function($http){
	return {
	getProfile:function(){
	return $http.get("/profile").then(function(res) {
          return res.data;
        })
	}
	}
}])