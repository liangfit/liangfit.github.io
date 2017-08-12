//登录页
amApp.controller('loginController',['$scope','jsonpService','$http',function($scope,jsonpService,$http){
	var login=document.querySelector('.loginPage li input[type=submit]');
	var loginUser=document.querySelector('.loginPage li:first-child input');	
	var loginPassword=document.querySelector('.loginPage li:nth-child(2) input');
	var tips = document.querySelector('.tips');
	var urseflag=false;
    var passwordflag=false; 
    var back = document.querySelector(".back");
    back.onclick=function(){
        window.history.back();
    }
    loginUser.onblur=function(){    	
    	var newuserpass = window.localStorage.getItem("userpass")||"[]";
    	var newuserpass = JSON.parse(newuserpass);
    	var flag=0;
    	console.log(newuserpass);
        for(var i=0;i<newuserpass.length;i++){
            if(loginUser.value==newuserpass[i].username){
            	console.log(100);
            	urseflag=true;
            	if(urseflag==true&&passwordflag==true){
		            login.disabled=false;
		        }
            	return;
            }else{            	
                flag++;                                 
            }
        }
        if(flag==newuserpass.length){
        	login.disabled=true;
        	urseflag=false;
            tips.innerHTML="";
			var newDiv = document.createElement('div');
			newDiv.innerHTML="该用户名不存在";
		    tips.appendChild(newDiv);
        }
    }
    loginPassword.onblur=function(){
    	var newuserpass = window.localStorage.getItem("userpass")||"[]";
    	var newuserpass = JSON.parse(newuserpass); 
    	var flag=0;
        for(var i=0;i<newuserpass.length;i++){
        	passwordflag=true;
            if(loginUser.value==newuserpass[i].username&&loginPassword.value==newuserpass[i].password){
            	if(urseflag==true&&passwordflag==true){
		            login.disabled=false;
		        }
            	return;            	                                
            }else{
                flag++;
            }
        }
        if(flag==newuserpass.length){
        	login.disabled=true;
        	passwordflag=false;
            tips.innerHTML="";
			var newDiv = document.createElement('div');
			newDiv.innerHTML="密码错误";
		    tips.appendChild(newDiv);
        }
    }
}]);