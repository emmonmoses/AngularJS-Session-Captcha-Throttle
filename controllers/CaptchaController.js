var app = angular.module('myApp', []);

app.controller('CaptchaController', function($scope){    
    
    $scope.Captcha = function() {
    var alpha = new Array('E','m','O','n');
    var x;
    var beta = "";
    for (x = 0; x < 6; x++) {
       beta = beta + alpha[Math.floor(Math.random() * alpha.length)] + " ";
    }
    $scope.mainCaptcha =beta;
};

$scope.ValidCaptcha = function () {
    /* var string1 = $scope.mainCaptcha;
    var string2 = $scope.captcha; */
    var string1 = removeSpaces($scope.mainCaptcha);
    var string2 = removeSpaces($scope.captcha);
    if (string1 == string2) {
        alert(true);
    }
    else {
        alert(false);
    }
};

removeSpaces = function (string) {
    return string.split(' ').join('');
};

});