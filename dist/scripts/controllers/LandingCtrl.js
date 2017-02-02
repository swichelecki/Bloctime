(function() {
    function LandingCtrl(Break, Tasks) {
        
        this.Break = Break;
        
        this.Tasks = Tasks;
        
        this.startReset = function() {
            if (Break.start.key === "Start") {
                Break.start.key = "Reset";
                Break.startTimer = "Start";
            } else if (Break.start.key === "Reset") {
                Break.start.key = "Start"; 
                Break.startTimer = "Reset";
            }
        };
        
        this.breakStartRest = function() {
            if (Break.break.key === "Start") {
                Break.break.key = "Reset";
                Break.startTimer = "Break_Start";
            } else if (Break.break.key === "Reset") {
                Break.break.key = "Start";
                Break.startTimer = "Break_Reset";
            }
        }
        
    }

      
    angular
        .module('bloctime')
        .controller('LandingCtrl', ['Break', 'Tasks', LandingCtrl]);
    
})();