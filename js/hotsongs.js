amApp.controller('hotsongsController',['$scope','jsonpService','$http','$location','$routeParams',function($scope,jsonpService,$http,$routeParams,$location){
     $scope.word=$location.songname;
     $scope.page = 1;
     jsonpService.jsonp('https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',{needNewCode:1,w:$scope.word,catZhida:1,sem:1,n:20,p:$scope.page},function(da){
	    	$scope.zhida=da.data.zhida;
	    	$scope.keyword=da.data.keyword;
	    	$scope.list=da.data.song.list;
	    	console.log(da);
	    	$scope.$apply();
	    	console.log($location)
	    });
	    
		
	window.onscroll=function(){		
		var scrollTop = window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
		var box = document.querySelector('.hotsongs');
		var height = box.offsetHeight;
		var offset = height - scrollTop;
		var rocket = document.querySelector('.rocket'); 
		console.log(offset);
		if(offset<750){			
			jsonpService.jsonp('https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',{needNewCode:1,w:$scope.word,catZhida:1,sem:1,n:5,p:++$scope.page},function(da){		    	
		    	$scope.list=$scope.list.concat(da.data.song.list);		    	
		    	$scope.$apply();
		    	
	    	});
		}
		if(scrollTop>500){
			rocket.style.display="block";
		}
		else{
			rocket.style.display="none";
		}
		rocket.onclick=function(){
			clearInterval(rocket.timer);
            rocket.timer = setInterval(function(){
            	scrollTop = window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
                var speed = (0 - scrollTop)/10;
                speed = (speed>0?Math.ceil(speed):Math.floor(speed));
                window.scrollTo(0,scrollTop+speed);
                if(scrollTop==0){
                   clearInterval(rocket.timer);                
                }
            }, 30)
		}
	}
}]);