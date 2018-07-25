var app = angular.module('myApp', []);

app.factory('appFactory', function($rootScope){
	var factory = {};

	factory.countdown = function() {
		$rootScope.counter = $rootScope.counter - 1;
	};

	factory.resetCounter = function() {
		$rootScope.counter = 12;
	};

	return factory;
});

app.controller('HomeController', function (appFactory,$interval, $timeout, $document, $scope, $rootScope) {

	$scope.timeOutValue = 5000;
	$scope.newcounter = 12;

	// used to initialize timeout countdown
	$scope.timeoutInit = function () {
		$timeout.cancel($scope.timeOutSession);
		console.log('timeout handler invoked');
		
		$scope.timeOutSession = $timeout(function () {
			$scope.startCountdown(); // initiates the countdown display
		}, $scope.timeOutValue);
	};
	
	// resets the counter to default value
	$scope.resetCounter = function () {
		appFactory.resetCounter();
	};

	// initializations 
	$scope.resetCounter();
	$scope.show = false;

	// invoke timeout
	$scope.timeoutInit();


	var bodyElement = angular.element($document);
	angular.forEach(['keydown', 'keyup', 'click', 'DOMMouseScroll', 'mousewheel', 'mousedown',
		'touchstart', 'touchmove', 'scroll', 'focus'
	],
		function (EventName) {
			bodyElement.bind(EventName, function (e) {
				cancelTimeOut(e);
			});
		}
	);

	function logOut() {
		console.log('good night');
		window.location = "../login.html";	
	}

	function cancelTimeOut(e) {
		// console.log('event occured: ');
		$scope.hideModal();

		// clear handlerModal
		$scope.clearModalInterval();

		// invoke timeout listener
		$scope.timeoutInit();

	}
	
	$scope.startCountdown = function () {
		$scope.showModal();
		$scope.modalCountdown();
	};

	$scope.showModal = function() {
		$scope.show = true;
	/* 	console.log('show display', $scope.show); */

		stop = $interval(function() {
            $scope.newcounter = $scope.newcounter -1;
          }, 1000);

	};

	$scope.hideModal = function() {
		$scope.show = false;
		/* console.log('hide display', $scope.show); */
	};


	// show modal with countdown
	// attach handler
	var handlerModal;
	$scope.modalCountdown = function () {
		/* console.log('modal view counting down'); */
		$scope.resetCounter();
		handlerModal = setInterval(() => {
			$scope.updateDisplay();
			 /* update display */
		}, 1000);
	};

	$scope.updateDisplay = function () {
		if($rootScope.counter < 0) return;		
		/* console.log('current counter no ' + $rootScope.counter); */		
		appFactory.countdown();
		if ($rootScope.counter <= 0) {
			/* clear modal handler and logout */
			$scope.clearModalInterval();
			logOut();
		}
	};

	$scope.clearModalInterval = function () {
		/* console.log('dismiss countdown handler ' + handlerModal); */
		clearInterval(handlerModal);
	};

	$scope.leavepage = function (){
		window.location="../login.html";
	};
});
