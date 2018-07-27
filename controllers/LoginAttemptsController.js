var app = angular.module('myApp', ['ngCookies']);

app.controller('LoginAttemptsController', function ($scope, $cookies, $log, $interval, $timeout, $filter) {
    var counter = 0;


    $scope.setCookie = function(){
        mycookie = $cookies.getObject('time');
        if(mycookie){
            console.log("exists");
            if(mycookie.suspendedTime = 0){
                $scope.timeobj = {
                    suspendedTime : 0,
                    suspendedMinutes : 0,
                    suspendedSeconds : 0
                }
                $cookies.putObject('time',$scope.timeobj);
            }
            else{
                cookietime = $cookies.getObject('time');
                cookiesuspendedtime = cookietime.suspendedTime;
                currenttime = new Date();
                console.log(cookiesuspendedtime);
                console.log(currenttime.getTime());
            var timedifference = (cookiesuspendedtime - currenttime.getTime()) / 1000;
            console.log(timedifference);
            var minutedifference = Math.floor(timedifference/60);
            var seconddifference = Math.floor(timedifference - (minutedifference * 60));
                if(timedifference < 120){
                    $scope.timeobj = {
                        suspendedTime : cookiesuspendedtime,
                        suspendedMinutes : minutedifference,
                        suspendedSeconds : seconddifference
                    }
                    $cookies.putObject('time',$scope.timeobj);
                    this.suspension();
                }
                else{
                    $scope.timeobj = {
                        suspendedTime : 0,
                        suspendedMinutes : 0,
                        suspendedSeconds : 0
                    }
                    $cookies.putObject('time',$scope.timeobj);
                }
            }
        }
        else{
            $scope.timeobj = {
                suspendedTime : 0,
                suspendedMinutes : 0,
                suspendedSeconds : 0
            }
            $cookies.putObject('time',$scope.timeobj);
        }
    }
    $scope.suspension = function(){
        $scope.popup = true;
        mycookie = $cookies.getObject('time');
        if(mycookie.suspendedTime == 0){
            newsuspension = new Date();
            newsuspension2 = newsuspension.getTime();
            console.log(newsuspension2);
            newsuspendedtime = newsuspension2 + 120000;
            console.log(newsuspendedtime);
            $scope.timeobj = {
                suspendedTime : newsuspendedtime,
                suspendedMinutes :2,
                suspendedSeconds : 0
            }
            $cookies.putObject('time',$scope.timeobj);
            console.log("suspended");
        }
        
        stop = $interval(function () {
            getMyCookie = $cookies.getObject('time');
            $scope.suspendedtime = getMyCookie.suspendedTime;
            $scope.Minute = getMyCookie.suspendedMinutes;
            $scope.Seconds = getMyCookie.suspendedSeconds;
            $scope.countdown($scope.Minute, $scope.Seconds);
            $scope.timeobj = {
                suspendedTime : $scope.suspendedtime,
                suspendedMinutes :$scope.Minute,
                suspendedSeconds : $scope.Seconds
            }
            $cookies.putObject('time',$scope.timeobj);
         }, 1000);
    }
  

    $scope.countdown = function (minutes,seconds){
        if(minutes == 0 && seconds == 0){
            $interval.cancel(stop);
            $scope.popup = false;
            $scope.suspendedtime = 0;
            $scope.Minute = 2;
            $scope.Seconds = 0;
        }
        else if(minutes == 0 && seconds != 0){
            $scope.Seconds--;
        }
        else if(minutes != 0 && seconds == 0){
            $scope.Minute--;
            $scope.Seconds = 59;
        }
        else if($scope.minutes != 0 && $scope.seconds != 0){
            $scope.Seconds--;
        }
    }
    
    $scope.checkAttempts = function () {
        var username = $scope.Username;
        var password = $scope.Password;
        if (username == 'kk' && password == 'kk') {
            window.location = "./home.html";
        } else if (username == 'kk' && password != 'kk') {
            $scope.show = true;
            $scope.alertMessage = "Sorry, we don't recognize this user";
            counter = counter + 1;
            $scope.username = '';
            $scope.password = '';
        } else if (username != 'kk' && password == 'kk') {
            $scope.show = true;
            $scope.alertMessage = "Sorry, we don't recognize this user";
            counter = counter + 1;
            $scope.username = '';
            $scope.password = '';
        } else if (username != 'kk' && password != 'kk') {
            $scope.show = true;
            $scope.alertMessage = "Sorry, we don't recognize this user";
            counter = counter + 1;
            $scope.username = '';
            $scope.password = '';
        }
        if (counter == 3) {
            counter = 1;
            this.suspension();
        }
    };

});
