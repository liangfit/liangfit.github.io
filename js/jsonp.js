angular.module('moviecatJsonpApp',[]).service('jsonpService',['$window',function($window){
	this.jsonp=function(url,data,fn){
		var callbackName= 'jsonp'+new Date().getTime() + Math.random().toString().substr(2);
		$window[callbackName]=function(data){
			fn(data);
			$window.document.body.removeChild(script);
		}
		url=url+'?';
		for(var key in data){
			url+=key + '=' + data[key] + '&';
		}
		url+='jsonpCallback='+callbackName;
		var script=document.createElement('script');
		script.src=url;
		$window.document.body.appendChild(script);
	}
	this.jsonp1=function(url,data,fn){		
		$window.MusicJsonCallback=function(data){
			fn(data);
			$window.document.body.removeChild(script);
		}
		url=url+'?';
		for(var key in data){
			url+=key + '=' + data[key] + '&';
		}		
		var script=document.createElement('script');
		script.src=url;
		$window.document.body.appendChild(script);
	}
	
	
	this.jsonp3= function (url,data,fn) {
        var callbackName = 'jsonp'+new Date().getTime()+Math.random().toString().substr(2);
        var script = document.createElement('script');
        script.src=url;
        data.jsonpCallback=callbackName;
        script.src=script.src+"&jsonpCallback="+data.jsonpCallback;
        $window.document.body.appendChild(script);
        $window[data.jsonpCallback]= function (data) {
            fn(data);
            $window.document.body.removeChild(script)
        };
    }
	
	this.jsonp4=function(url,data,fn){
		var callbackName= 'jsonp'+new Date().getTime() + Math.random().toString().substr(2);
		$window[callbackName]=function(data){
			fn(data);
			$window.document.body.removeChild(script);
		}
//		url=url+'?';
		for(var key in data){
			url+=key + '=' + data[key] + '&';
		}
		url+='&callback='+callbackName;
		var script=document.createElement('script');
		script.src=url;
		$window.document.body.appendChild(script);
	}
}])
