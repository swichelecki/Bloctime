(function() {
    function timer($interval, Break) {
       
        return {
            templateUrl: '/templates/directives/timer.html',
            restrict: 'E',
            scope: {
              time: '@'
            },
            link: function(scope, element, attributes) {  
                
               var timer = $(element);
                
                // TEST TIMES //
                //scope.numbers = 3000;
                //scope.breakNumbers = 4000;
                
                //REAL TIMES //
                scope.numbers = 1500000;
                scope.breakNumbers = 300000;
                
                scope.timeUi = "25:00";
    
                scope.milsToMinutes = function(numbers) {
                    console.log("inside milsToMinutes");
                    console.log("numbers", numbers);
                    var minutes = Math.floor(numbers / 60000);
                    console.log("minutes", minutes);
                    var seconds = ((numbers % 60000) / 1000).toFixed(0);
                    console.log("seconds", seconds);
                    console.log("returning");
                        console.log("Value of onBreak: ", Break.onBreak);
                    return (seconds == 60 ? (minutes+1) + ':00' : minutes + ':' + (seconds < 10 ? '0' : '') + seconds);
                };
            
                attributes.$observe('time', function(newValue) {
                   scope.time = newValue;
                   var time = scope.time;
                   console.log("Initial timeUi: ", scope.timeUi, typeof scope.timeUi);
                   scope.startResetTimer(time);
               
                }); 
                
                scope.startResetTimer = function(time) {
                    if (time === "Start") {
                        scope.timeUi = scope.milsToMinutes(scope.numbers);  
                        scope.start();
                    } else if (time === "Reset") {
                        scope.reset();
                    } else if (time === "Break_Start") {
                        scope.timeUi = scope.milsToMinutes(scope.breakNumbers);  
                        scope.start();
                    } else if (time === "Break_Reset") {
                        scope.resetBreak();
                    }
                };
                
                scope.start = function() {
                    scope.stop = $interval(scope.countdown, 1000);
                    console.log("Start!");
                };
                
                scope.timeout = function () {
                    $interval.cancel(scope.stop);
                    console.log("timeout() stop");
                };
                
                scope.reset = function() {
                    $interval.cancel(scope.stop);
                    scope.timeUi = "25:00";
                    scope.numbers = 1500000;
                    console.log("Stop!");
                };
                
                scope.resetBreak = function() {
                    $interval.cancel(scope.stop);
                    scope.timeUi = "5:00";
                    scope.breakNumbers = 300000;
                    console.log("Stop!");
                };
                
                scope.checkTimerOne = function() {
                  var stopTimerOne = scope.milsToMinutes(scope.numbers);  
                      
                      if (stopTimerOne === "0:00") {
                            scope.timeout();
                            Break.onBreak = true;
                            scope.timeUi = "5:00";
                            console.log("Value of onBreak: ", Break.onBreak);
                      }
                }; 
                
                scope.checkBreakTimer = function() {
                    var stopTimerTwo = scope.milsToMinutes(scope.breakNumbers);
                    
                    if (stopTimerTwo === "0:00") {
                        Break.onBreak = false;
                        scope.reset();
                    }
                };
                
                scope.countdown = function() {
                    if (scope.time === "Start") {
                        scope.numbers -= 1000;
                        scope.timeUi = scope.milsToMinutes(scope.numbers);  
                        scope.checkTimerOne();
                        console.log(scope.numbers); 
                        console.log(scope.timeUi, typeof scope.timeUi);
                    } else if (scope.time === "Break_Start") {
                        scope.breakNumbers -= 1000;
                        scope.timeUi = scope.milsToMinutes(scope.breakNumbers);
                        scope.checkBreakTimer();
                    }
                };
                
            }
        };  
    }
        
    
    angular
        .module('bloctime')
        .directive('timer', ['$interval', 'Break', timer]);
    
})();