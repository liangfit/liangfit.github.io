//注册页
amApp.controller('registerController',['$scope','jsonpService','$http',function($scope,jsonpService,$http){
	var username = document.querySelector('.register>form>ul>li:first-child input');
	var phone = document.querySelector('.register>form>ul>li:nth-child(2) input');
	var password = document.querySelector('.register>form>ul>li:nth-child(3) input');
	var registerBtn = document.querySelector('.register>form>ul>li:last-child input');
	var myInputs= document.querySelectorAll(".register input");
	var tips = document.querySelector('.tips');
	var back = document.querySelector(".back");
    back.onclick=function(){
        window.history.back();
    }
	var userpass = window.localStorage.getItem('userpass')||'[]';
	var userStr=/^[\u4E00-\u9FA5A-Za-z0-9_]{1,18}$/;	
	var phoneStr= /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
	var passwordStr=/^[a-zA-Z]\w{5,17}$/;
	var userflag=false;
	var phoneflag=false;
	var passwordflag=false;
	username.onblur=function(){
		registerBtn.disabled=true;
		if(!userStr.test(username.value)){
			userflag=false;
			tips.innerHTML="";
			var newDiv = document.createElement('div');
			newDiv.innerHTML="请输入1-18位中文、英文、数字或下划线";
			tips.appendChild(newDiv);
		}else{
			userflag=true;
		}
		if(userflag==true&&phoneflag==true&&passwordflag==true){
			registerBtn.disabled=false;
		}			
//			
	}
	phone.onblur=function(){
		registerBtn.disabled=true;
		if(!phoneStr.test(phone.value)){
			phoneflag=false;
			tips.innerHTML="";
			var newDiv = document.createElement('div');
			newDiv.innerHTML="请输入11位正确的手机号码";
			tips.appendChild(newDiv);						
		}else{
			phoneflag=true;
		}
		if(userflag==true&&phoneflag==true&&passwordflag==true){
			registerBtn.disabled=false;
		}
	}
	password.onblur=function(){
		registerBtn.disabled=true;
		if(!passwordStr.test(password.value)){
			passwordflag=false;
			tips.innerHTML="";
			var newDiv = document.createElement('div');
			newDiv.innerHTML="请输入以字母开头，长度在6~18之间，只能包含字母、数字和下划线的字符";
			tips.appendChild(newDiv);						
		}else{
			passwordflag=true;
		}
		if(userflag==true&&phoneflag==true&&passwordflag==true){
			registerBtn.disabled=false;
		}
	}
	registerBtn.onclick=function(){
		userpass = window.localStorage.getItem('userpass')||'[]';
		var user = {'username':username.value,"password":password.value};
		var newuserpass = JSON.parse(userpass);
		 for(var i=0;i<newuserpass.length;i++){
                if(user.username==newuserpass[i].username){
                	registerBtn.disabled=true;
                    tips.innerHTML="";
					var newDiv = document.createElement('div');
					newDiv.innerHTML="该用户名已被注册";
					tips.appendChild(newDiv);                   
                    return;
                }
        }
        newuserpass.push(user);
        newuserpass = JSON.stringify(newuserpass);
        window.localStorage.setItem("userpass",newuserpass);
        alert("注册成功");
	}
}]);