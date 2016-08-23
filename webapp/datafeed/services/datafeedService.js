angular
.module('datamill')
.factory('datafeedService',function ($http,$log) {
	return {
		getTransportType: function() {
			return $http.get('http://localhost:7070/transporttype')
			.then(function(response) {
				$log.info(response);
				return response.data;
			});
		}
	};
});
