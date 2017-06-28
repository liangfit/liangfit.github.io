//歌曲列表
amApp.controller('listController',['$scope','jsonpService','$http','$routeParams',function($scope,jsonpService,$http,$routeParams){
	jsonpService.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',{format:'json',topid:$routeParams.id},function(d){
    	$scope.songlist=d.songlist;
    	$scope.topinfo=d.topinfo;
    	$scope.update_time=d.update_time;
    	$scope.$apply()
  	    console.log(d)

  	    
    });
}]);