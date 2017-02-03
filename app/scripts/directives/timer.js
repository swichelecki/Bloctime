(function() {
    function timer($interval, Break, INTERVALS) {
       
        return {
            templateUrl: '/templates/directives/timer.html',
            restrict: 'E',
            scope: {
              time: '@'
            },
            link: function(scope, element, attributes) {  
                
                var timer = $(element);
                
                scope.breaks = [];
            
                //TEST TIMES//
                //INTERVALS.NUMS_1 = 6000;
                //INTERVALS.NUMS_2 = 3000;
                //INTERVALS.NUMS_3 = 9000;
                
                //REAL TIMES//
                //INTERVALS.NUMS_1 = 1500000;
                //INTERVALS.NUMS_2 = 300000;
                //INTERVALS.NUMS_3 = 1800000;
                
                scope.timeUi = "";
    
                scope.milsToMinutes = function(numbers) {
                    
                    return numbers;
                };
            
                attributes.$observe('time', function(newValue) {
                   scope.time = newValue;
                   var time = scope.time;
    
                    console.log("is this 'Break_Start': ", time);
                    
                   console.log("Initial timeUi: ", scope.timeUi, typeof scope.timeUi);
                   scope.startResetTimer(time);
               
                }); 
                
                scope.startResetTimer = function(time) {
                    if (time === "Start") {
                        scope.timeUi = scope.milsToMinutes(INTERVALS.NUMS_1);  
                        scope.start();
                    } else if (time === "Reset") {
                        scope.reset();
                    } else if (time === "Break_Start" && scope.breaks.length >= 4) {
                        scope.timeUi = scope.milsToMinutes(INTERVALS.NUMS_3); 
                        scope.start();
                    } else if (time === "Break_Start") {
                        scope.timeUi = scope.milsToMinutes(INTERVALS.NUMS_2);  
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
                    scope.timeUi = 10000;
                    INTERVALS.NUMS_1 = 10000;
                    //scope.timeUi = 1500000;
                    //INTERVALS.NUMS_1 = 1500000;
                    console.log("Stop! this is reset()");
                };
                
                scope.resetBreak = function() {
                    
                    if (scope.breaks.length >= 4) { 
                        $interval.cancel(scope.stop);
                        scope.timeUi = 15000;
                        INTERVALS.NUMS_3 = 15000;
                        // scope.timeUi = 1800000;
                        //INTERVALS.NUMS_3 = 1800000;
                    } else {
                        $interval.cancel(scope.stop);
                        scope.timeUi = 5000;
                        INTERVALS.NUMS_2 = 5000;
                        //INTERVALS.NUMS_2 = 300000;
                        //scope.timeUi = 300000;
                        console.log("Stop!");
                    }
                };
                
                scope.checkTimerOne = function() {
                  var stopTimerOne = scope.milsToMinutes(INTERVALS.NUMS_1);  
                      
                  if (stopTimerOne === 0) {
                         scope.timeout(); 
                         scope.resetBreak();
                         Break.onBreak = true;
                         Break.start.key = "Start";
                         scope.timeUi = 5000;
                         console.log("Value of onBreak: ", Break.onBreak);
                         Break.sound.play();
                         console.log("SCOPE.NOISE ", scope.noise);
                   }
                }; 
                
                scope.checkLongBreakTimer = function() {
                  var stopTimerThree = scope.milsToMinutes(INTERVALS.NUMS_3);  
                    
                    console.log("stopTimerThree", stopTimerThree);
                    
                    if (stopTimerThree === 0) {
                        scope.timeout();
                        Break.onBreak = false;
                        Break.break.key = "Start";
                        scope.breaks.length = 0;
                        console.log("should be empty array: ", scope.breaks.length);
                        scope.reset();
                        INTERVALS.NUMS_3 = 15000;
                        Break.sound.play();
                    }
                };
                
                scope.checkBreakTimer = function() {
                    var stopTimerTwo = scope.milsToMinutes(INTERVALS.NUMS_2);
                
                   if (stopTimerTwo === 0) {
                       scope.timeout();
                       scope.logBreak(1);
                       
                       if (scope.breaks.length >= 4) {
                            console.log("4 BREAKS!");
                            Break.break.key = "Start";
                            Break.startTimer = null;
                            //Break.onBreak = true;
                            scope.timeUi = 15000;
                            Break.sound.play();
                       } else {
                            Break.onBreak = false;
                            Break.break.key = "Start";
                            scope.reset();
                            Break.sound.play();
                       }  
                   }
                };
                
               scope.logBreak = function(a) {
                   
                   console.log("does this get called twice> ", a);
                   
                    scope.breaks.push(a);
                   
                   console.log("numbers added to array: ", a);
             
                }; 
                
                scope.countdown = function() {
                    if (scope.time === "Start") {
                        INTERVALS.NUMS_1 -= 1000;
                        scope.timeUi = scope.milsToMinutes(INTERVALS.NUMS_1);  
                        scope.checkTimerOne();
                        console.log(INTERVALS.NUMS_1); 
                        console.log(scope.timeUi, typeof scope.timeUi);
                    } else if (scope.breaks.length >= 4) {
                        INTERVALS.NUMS_3 -= 1000;
                        console.log("LONG BREAK NUMS ", INTERVALS.NUMS_3);
                        scope.timeUi = scope.milsToMinutes(INTERVALS.NUMS_3);
                        console.log("LONG BREAK UI ", scope.timeUi);
                        scope.checkLongBreakTimer();
                    } else if (scope.time === "Break_Start") {
                        INTERVALS.NUMS_2 -= 1000;
                        scope.timeUi = scope.milsToMinutes(INTERVALS.NUMS_2);
                        scope.checkBreakTimer();
                    }
                };
                
            }
        };  
    }
        
    
    angular
        .module('bloctime')
        .directive('timer', ['$interval', 'Break', 'INTERVALS', timer]);
    
})();