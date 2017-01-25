(function() {
    function LandingCtrl() {
        
        this.start = {
            key: "Start",
        };
        
        this.startTimer = null;
        
        this.startReset = function() {
            if (this.start.key === "Start") {
                this.start.key = "Reset";
                this.startTimer = "Start";
            } else if (this.start.key === "Reset") {
                this.start.key = "Start"; 
                this.startTimer = "Reset";
            }
        };
        
    }

      
    angular
        .module('bloctime')
        .controller('LandingCtrl', [LandingCtrl]);
    
})();