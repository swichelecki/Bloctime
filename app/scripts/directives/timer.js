(function() {
    function timer($interval) {
       
        return {
            templateUrl: '/templates/directives/timer.html',
            restrict: 'E',
            scope: {
              time: '@'
            },
            link: function(scope, element, attributes) {  
                
               var timer = $(element);
                
                //scope.numbers = 1.5e+6;
                scope.numbers = 1500000;
                
                scope.timeUi = "";
    
                scope.milsToMinutes = function(numbers) {
                    console.log("inside milsToMinutes");
                    console.log("numbers", numbers);
                    var minutes = Math.floor(numbers / 60000);
                    console.log("minutes", minutes);
                    var seconds = ((numbers % 60000) / 1000).toFixed(0);
                    console.log("seconds", seconds);
                    console.log("returning");
                    return (seconds == 60 ? (minutes+1) + ':00' : minutes + ':' + (seconds < 10 ? '0' : '') + seconds);
                };
            
                attributes.$observe('time', function(newValue) {
                   scope.time = newValue;
                   var time = scope.time;
                   scope.timeUi = scope.milsToMinutes(scope.numbers);  
                   console.log("Initial timeUi: ", scope.timeUi, typeof scope.timeUi);
                   scope.startResetTimer(time);
               
                }); 
                
                scope.startResetTimer = function(time) {
                    if (time === "Start") {
                        scope.start();
                    } else if (time === "Reset") {
                        scope.reset();
                    }
                };
                
                scope.start = function() {
                   // scope.reset();
                    scope.stop = $interval(scope.countdown, 1000);
                    console.log("Start!");
                };
                
                scope.reset = function() {
                    $interval.cancel(scope.stop);
                    scope.timeUi = "25:00";
                    scope.numbers = 1500000;
                    console.log("Stop!");
                };
                
                scope.countdown = function() {
                    scope.numbers -= 1000;
                    console.log(scope.numbers); 
                    scope.timeUi = scope.milsToMinutes(scope.numbers);
                    console.log(scope.timeUi, typeof scope.timeUi);
                };
                
            }
        };  
    }
        
    
    angular
        .module('bloctime')
        .directive('timer', ['$interval', timer]);
    
})();