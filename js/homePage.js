amApp.controller('homePageController',['$scope','jsonpService','$http',function($scope,jsonpService,$http){
	jsonpService.jsonp1('https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?',{},function(d){
    	
//  	$scope.data=data;
//  	$scope.topList=data.topList;
		$scope.topList=d.data.topList;
    	$scope.$apply();
    	console.log(d.data.topList);    	
//  	console.log($scope.data.topList[0]);
    });
    
    $http({
		url:'12.json'
	}).then(function(da){
		
		$scope.artists=da.data[0].artists;
		
	});
		
	//轮播开始

	//添加过渡
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
	//过渡结束时执行的回调函数
	function addTransitionEnd(obj,fn){
		addEventListener("transitionEnd",fn);
		addEventListener("webkitTransitionEnd",fn)
	}
	//获取轮播功能所需的的时间源
	var amBanner=document.querySelector('.am_banner');
	var imgUl=amBanner.children[0];
	var dotUl=amBanner.children[1];
	var imgLis=imgUl.children;
	var dotLis=dotUl.children;
	var width=amBanner.offsetWidth;
	var num=1;
	
	clearInterval(amBanner.timer);
	amBanner.timer=setInterval(function(){
		num++;
		addTransition(imgUl);
		setTransform(imgUl,-num*width);	
	},5000)
	
	addTransitionEnd(imgUl,function(){
		if(num>imgLis.length-2){
			num=1;
			removeTransition(imgUl);
			setTransform(imgUl,-num*width);
		}else if(num<1){
			num=imgLis.length-2;
			removeTransition(imgUl);
			setTransform(imgUl,-num*width);		
		}
		light();
	});
	//点亮小圆点
	function light(){
		for(var i=0;i<dotLis.length;i++){
			dotLis[i].className = "";
		}
		dotLis[num-1].className = "now";
	}
	
	//图片滑动不超过一定距离,吸附回去(过渡)
	//图片滑动超过一定距离,滑到下一张(过渡)
	var startX = 0;
	var moveX = 0;
	var endX = 0;
	var isMove = false;
	var distance = 0;
	imgUl.addEventListener("touchstart",function(e){	
		clearInterval(amBanner.timer);
		startX = e.touches[0].clientX;
	})
	imgUl.addEventListener("touchmove",function(e){
		moveX = e.touches[0].clientX;
		isMove = true;
		distance = moveX - startX;
		removeTransition(imgUl);
		setTransform(imgUl,-num*width+distance);
	})
	imgUl.addEventListener("touchend",function(e){
		endX = moveX;
		if(isMove){
			if(Math.abs(distance)>width/3){
				if(distance>0){
					num--;
				}else{
					num++;
				}
				addTransition(imgUl);
				setTransform(imgUl,-num*width);
			}else{
				addTransition(imgUl);
				setTransform(imgUl,-num*width);
			}
		}
		clearInterval(amBanner.timer);
		amBanner.timer=setInterval(function(){
			num++;
			addTransition(imgUl);
			setTransform(imgUl,-num*width);	
		},5000)
		startX = 0 ;
	    moveX = 0 ;
	    endX = 0;
	    isMove = false;
	    distance = 0;
	});
	//轮播结束
	
//	主页的nav切换
	var navChoice=document.querySelectorAll('.header-nav>ul>li');
	var hpDiv = document.querySelectorAll('.hp_main_box>div');	
	for(var i=0;i<navChoice.length;i++){
		navChoice[i].index=i;
		navChoice[i].onclick=function(){			
			for(var j=0;j<navChoice.length;j++){
				navChoice[j].className='';
				hpDiv[j].style.display="none"				
			}
			this.className='light';
			hpDiv[this.index].style.display="block";			
		}
	}

}]);