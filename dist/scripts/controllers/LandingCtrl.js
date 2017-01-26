(function() {
    function LandingCtrl(Break) {
        
        this.Break = Break;
        
        this.start = {
            key: "Start"
        };
        
        this.break = {
            key: "Start"
        };
        
        this.startReset = function() {
            if (this.start.key === "Start") {
                this.start.key = "Reset";
                Break.startTimer = "Start";
            } else if (this.start.key === "Reset") {
                this.start.key = "Start"; 
                Break.startTimer = "Reset";
            }
        };
        
        this.breakStartRest = function() {
            if (this.break.key === "Start") {
                this.break.key = "Reset";
                Break.startTimer = "Break_Start";
            } else if (this.break.key === "Reset") {
                this.break.key = "Start";
                Break.startTimer = "Break_Reset";
            }
        }
        
    }

      
    angular
        .module('bloctime')
        .controller('LandingCtrl', ['Break', LandingCtrl]);
    
})();