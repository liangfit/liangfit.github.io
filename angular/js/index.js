var amApp=angular.module('amApp',['ngRoute','moviecatJsonpApp']);
//主页
amApp.config(['$routeProvider',function($routeProvider){
    	$routeProvider.when('/homePage',{
    		templateUrl:'homePage.html',
    		controller:'homePageController'
    	}).when('/search',{
    		templateUrl:'search.html',
    		controller:'searchController'
    	}).when('/register',{
    		templateUrl:'register.html',
    		controller:'registerController'
    	}).when('/login',{
    		templateUrl:'login.html',
    		controller:'loginController'
    	}).when('/shequ',{
    		templateUrl:'shequ.html',
    		controller:'shequController'
    	}).when('/library',{
    		templateUrl:'library.html',
    		controller:'libraryController'
    	}).when('/classroom',{
    		templateUrl:'classroom.html',
    		controller:'classroomController'
    	}).when('/tool',{
    		templateUrl:'tool.html',
    		controller:'toolController'
    	}).when('/mine',{
    		templateUrl:'mine.html',
    		controller:'mineController'
    	}).when('/list/:id',{
    		templateUrl:'list.html',
    		controller:'listController'
    	}).when('/detail/:songid',{
    		templateUrl:'detail.html',
    		controller:'detailController'
    	}).when('/hotsongs/:songname',{
    		templateUrl:'hotsongs.html',
    		controller:'hotsongsController'
    	}).otherwise({
    		redirectTo:'/homePage'
    	})
    }]);




    





