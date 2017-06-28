//搜索页
amApp.controller('searchController',['$scope','jsonpService','$http','$location','$routeParams',function($scope,jsonpService,$http,$routeParams,$location){
	jsonpService.jsonp('https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',{},function(d){
    	console.log(d);
    	$scope.data=d.data;
    	$scope.$apply();
    })
	
	$scope.word="";	
	$scope.search=function(){		
	    $scope.page=1;
		jsonpService.jsonp('https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',{needNewCode:1,w:$scope.word,catZhida:1,sem:1,n:20,p:$scope.page},function(da){
	    	$scope.zhida=da.data.zhida;
	    	$scope.keyword=da.data.keyword;
	    	$scope.list=da.data.song.list;
	    	console.log($scope.zhida.singermid);
	    	
	    	if($scope.word==""){
				hotSearchShow();
			}else{
				hotSearchHide();
			}
			
			$scope.ngif=true;
			if(da.data.zhida.songnum==undefined){
				$scope.ngif=false;
			}
			$scope.$apply();
	    });
	}
	
	$scope.hotSearch = function(data){
		$scope.word=data;
		$scope.search();
		if($scope.word==""){
			hotSearchShow();
		}else{
			hotSearchHide();
		}		
	}
	var hotSearch = document.querySelector(".hot_search");
	var searchResult = document.querySelector(".serach_result");
	var btnSearch =document.querySelector('.btn_search');
	var inpSearch = document.querySelector('.inp_search');
	function hotSearchHide(){		
		hotSearch.style.height="0";
		hotSearch.style.opacity="0";
		searchResult.style.display="block";
		btnSearch.innerHTML="取消";
	}
	function hotSearchShow(){
		hotSearch.style.height="484px";
		hotSearch.style.opacity="1";
		searchResult.style.display="none";
		btnSearch.innerHTML="搜索";
	}
	btnSearch.onclick=function(){
		if(btnSearch.innerHTML=="取消"){
			inpSearch.value="";
			btnSearch.innerHTML="搜索";
			hotSearchShow();
		}
		else{
			$scope.search();
		}
	}
			       
	window.onscroll=function(){		
		var scrollTop = window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
		var box = document.querySelector('.jiazai');
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
	
	//https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?&needNewCode=1&w=ASDF
	
	//https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=%E5%88%98%E5%BE%B7%E5%8D%8E&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=10&remoteplace=txt.mqq.all&_=1489106813026&jsonpCallback=jsonp13
	//https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=%E5%88%98%E5%BE%B7%E5%8D%8E&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=9&remoteplace=txt.mqq.all&_=1489106810989&jsonpCallback=jsonp12
	//https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?&needNewCode=1&w=%E5%88%98%E5%BE%B7%E5%8D%8E&p=1
	navSwipe(".am_search_nav");
	
	function addTransition(obj){
		obj.style.transition = "all 0.5s";
		obj.style.webkitTransition = "all 0.5s";
	}
	//移除过渡
	function removeTransition(obj){
		obj.style.transition = "";
		obj.style.webkitTransition = "";
	}
	//移动图片
	function setTransform(obj,distance){
		obj.style.transform = "translateX("+distance+"px)";
		obj.style.webkitTransform = "translateX("+distance+"px)";
	}
	//1、可以滑动  （touch  Y   改造setTransform）
	    //2、往下滑动如果超出一定距离，不能滑动
	    //3、往上滑动如果超出一定距离，不能滑动
	    //4、当滑动大于最大定位区间，定位回去
	    //5、当滑动小于最小定位区间，定位回去
	    //6、点击ul的时候，改变当前li的样式（now）
	    //7、点击的时候，被点击的li滑动到最顶端，如果滑动到最顶端超出定位区间，保持原位
	    
	function navSwipe(obj){
		var parentBox = document.querySelector(obj);
		var childBox = parentBox.querySelector('ul');
		var parentBoxWidth = parentBox.offsetWidth;
		var childBoxWidth = childBox.offsetWidth;
		
	//	缓冲距离
		var distance = 100;
	//	最大定位距离
		var maxPosition = 0;
	//	最小定位距离
		var minPosition = parentBoxWidth - childBoxWidth;
	//	最大滑动距离
		var maxSwipe = maxPosition + distance;
	//	最小滑动距离
		var minSwipe = minPosition - distance;
	//	其他
	    var start = 0;
	    var move = 0;
	    var moveX = 0;
	    var currX = 0;
	    var isMove = false;
		
		childBox.addEventListener('touchstart',function(){
			start = event.touches[0].pageX;		
		});
		childBox.addEventListener('touchmove',function(){
			isMove = true;
			move = event.touches[0].pageX;
			moveX = move - start;
			if(moveX+currX<maxSwipe&&moveX+currX>minSwipe){
				removeTransition(childBox);
				setTransform(childBox,moveX+currX);
			}
		});
		childBox.addEventListener('touchend',function(){
			if(isMove){
				if(moveX+currX>maxPosition){
					currX = maxPosition;
				}else if(moveX+currX<minPosition){
					currX = minPosition;
				}else{
					currX = moveX+currX;
				}
			}
			addTransition(childBox);
			setTransform(childBox,currX);
		});
	}
    
    
}]);