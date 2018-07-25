var app = angular.module('myApp', ['ngCookies']);

app.controller('LoginAttemptsController', function ($scope, $cookies, $log, $interval, $timeout) {
    var counter = 0;

    $scope.setcookietimer = function(){  
        mycookie = $cookies.get('key1');    
        if(mycookie){
            console.log("exists")
            if(mycookie == 10){
                $cookies.put('key1',10);
            }
            else{
                this.suspension();
            }
        }
        else{
            $cookies.put('key1', 10);
        } 
    }

    $scope.countdown = function(key1){
        if(key1<=0){
            $scope.popup = false;
            $scope.newcounter = 10;
            $interval.cancel(stop);
            $cookies.put('key1',10);
            return $scope.newcounter;
        }
        else{
            $scope.newcounter = key1 - 1;
            return $scope.newcounter;
        }
    }

    $scope.suspension = function(){
        $scope.popup = true;
        stop = $interval(function () {
            getMyCookie = $cookies.get('key1');
            $scope.countdown(getMyCookie);
            $cookies.put('key1',$scope.newcounter);
         }, 1000);
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