amApp.controller('detailController',['$scope','jsonpService','$http','$routeParams','$location',"$sce",function($scope,jsonpService,$http,$routeParams,$location,$sce){
	$scope.trustSrc = function(url){
//		console.log(url)
		return $sce.trustAsResourceUrl(url);
	}
	$scope.id=$routeParams.songid;
	console.log($sce);
	jsonpService.jsonp('http://i.y.qq.com/v8/fcg-bin/fcg_get_song_detail.fcg',{songid:$scope.id},function(da){
            $scope.data=da.data;
            $scope.daurl="http://ws.stream.qqmusic.qq.com/"+da.data.songinfo.songid+".m4a?fromtag=38";
            $scope.lyric=da.data.info[da.data.info.length-1].content.value.split('\n');
	    	var index=0;
	    	var lyrics=[];
	    	for(var i=0;i<$scope.lyric.length;i++){
	    		if($scope.lyric[i].split(']')[1].length>0){
	    			lyrics[index]=$scope.lyric[i].split(']')[1];
	    			index++;
	    		}
	    	}
	    	$scope.lyrics=lyrics;
	    	$scope.$apply();
	    	
//	    	歌词拖动
            navSwipe(".detail>main>div");	
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
				obj.style.transform = "translateY("+distance+"px)";
				obj.style.webkitTransform = "translateY("+distance+"px)";
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
				var parentBoxHeight = parentBox.offsetHeight;
				var childBoxHeight = childBox.offsetHeight;
				
			//	缓冲距离
				var distance = 200;
			//	最大定位距离
				var maxPosition = 0;
			//	最小定位距离
				var minPosition = parentBoxHeight - childBoxHeight;
			//	最大滑动距离
				var maxSwipe = maxPosition + distance;
			//	最小滑动距离
				var minSwipe = minPosition - distance;
			//	其他
			    var start = 0;
			    var move = 0;
			    var moveY = 0;
			    var currY = 0;
			    var isMove = false;
				
				parentBox.addEventListener('touchstart',function(){
					start = event.touches[0].pageY;				
				});
				parentBox.addEventListener('touchmove',function(){
					isMove = true;
					move = event.touches[0].pageY;
					moveY = move - start;
					if(moveY+currY<maxSwipe&&moveY+currY>minSwipe){
						removeTransition(childBox);
						setTransform(childBox,moveY+currY);
					}
				});
				
				parentBox.addEventListener('touchend',function(){
					if(isMove){
						if(moveY+currY>maxPosition){
							currY = maxPosition;
						}else if(moveY+currY<minPosition){
							currY = minPosition;
						}else{
							currY = moveY+currY;
						}
					}
					addTransition(childBox);
					setTransform(childBox,currY);			
				});
				
			}
			
//			歌名来回运动
			songname=document.querySelector('.detail_top h3');
			songnameWidth=songname.offsetWidth;
			parentBoxWidth=document.querySelector('.detail_top .clearfix').offsetWidth;
			Width=songnameWidth-parentBoxWidth;
			console.log(songnameWidth);	
			function move(obj,target,fn){
				var leader;
			    //要用定时器，先清定时器
			    clearInterval(obj.timer);
			    //定义一个定时器
			    obj.timer = setInterval(function(){
			        //运用三目运算符，根据物体距离目标的位置，判断往前还是往后
			        leader = (obj.offsetLeft>target?-1:1);
			        //判断停止定时器的条件
			        if(Math.abs(obj.offsetLeft-target)<Math.abs(leader)){
			            clearInterval(obj.timer);
			            obj.style.left = target+"px";
			            if(fn){
			            	fn();
			            }
			        }else{
			            //动画原理：元素的位置= 原来的位置+步长
			            obj.style.left = (obj.offsetLeft + leader) +"px";
			        }
			    },50)
			}
			window.timer1=function(){
				move(songname,-songnameWidth,function(){
					move(songname,parentBoxWidth,function(){
						window.setTimeout(timer1,1)
					});
				});
				
			}
			window.timer1();
	    });
	    
//	    video播放
        var video = document.getElementById('videoId');
        var lyricTxt = document.getElementById('lyricTxt');
        var iconfontBtn = document.querySelector('.detail_top i')
        var currentTime = document.querySelector('.currentTime');	
		var duration = document.querySelector('.duration');
        var color = document.querySelector('.color');
        var jindu =document.querySelector('.jindu');      
        video.ontimeupdate = function(){
        	lyricTxt.style.transition="all 2s linear";
        	lyricTxt.style.transform="translateY("+-(lyricTxt.offsetHeight*(Math.ceil(video.currentTime)/Math.ceil(video.duration)))+"px)";
        	currentTime.children[0].innerHTML = Math.floor(video.currentTime/60)<10?'0'+Math.floor(video.currentTime/60):Math.floor(video.currentTime/60);
        	currentTime.children[2].innerHTML = Math.floor(video.currentTime%60)<10?'0'+Math.floor(video.currentTime%60):Math.floor(video.currentTime%60);
        	duration.children[0].innerHTML = Math.floor(video.duration/60)<10?'0'+Math.floor(video.duration/60):Math.floor(video.duration/60);
        	duration.children[2].innerHTML = Math.floor(video.duration%60)<10?'0'+Math.floor(video.duration%60):Math.floor(video.duration%60);	    		    		    		    	
	    	color.style.width = jindu.offsetWidth*(Math.ceil(video.currentTime)/Math.ceil(video.duration))+"px";
        }
        
		$scope.play=function(){
			if (!videoId.paused) {
	            videoId.pause();
	            videoId.paused = true;
	            iconfontBtn.className="iconfont icon-play"
			}else{
				videoId.play();
	            videoId.paused = false;
	            iconfontBtn.className="iconfont icon-stop "
			}
		}
		
		
}]);