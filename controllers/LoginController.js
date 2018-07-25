var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('', {
            templateUrl: 'login.html',
            controller: 'LoginController'
        })
        .when('/home', {
            templateUrl: './pages/home.html',
            controller: 'HomeController'
        })
        .otherwise({
            redirecTo: '/'
        });
}]);

app.controller('LoginController', function ($scope) {
    $scope.sessionButton = function () {
        var username = $scope.Username;
        var password = $scope.Password;
        if (username == 'kk' && password == 'kk') {         
            window.location = "./pages/home.html";
        } else {
            alert('Wrong User Credentials');
        }
    };
    
    $scope.captchaButton = function () {
    /*     var username = $scope.Username;
        var password = $scope.Password;
        if (username == 'kk' && password == 'kk') { */         
            window.location = "./pages/captcha.html";
        /* } else {
            alert('Wrong User Credentials');
        } */
    };

    $scope.attemptsButton = function () {
        /* var username = $scope.Username;
        var password = $scope.Password;
        if (username == 'kk' && password == 'kk') {  */        
            window.location = "./pages/loginattempts.html";
       /*  } else {
            alert('Wrong User Credentials');
        } */
    };
});