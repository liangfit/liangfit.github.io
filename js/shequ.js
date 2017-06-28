//社区页
amApp.controller('shequController',['$scope','jsonpService','$http','$location','$routeParams',function($scope,jsonpService,$http,$location,$routeParams){
	$http({
		url:'13.json'
	}).then(function(da){
		$scope.data=da.data.data;
		
        console.log(da)
	})
	
}]);