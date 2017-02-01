(function() {
    function Break() {
        
        Break = {};
        
        Break.sound = new buzz.sound("/assets/sounds/DING.mp3", {
            preload: true
            
        });
        
        Break.onBreak = false;
        
        Break.start = {
            key: "Start"
        };
        
        Break.break = {
            key: "Start"
        };
        
        Break.startTimer = null;
        
        return Break;
    }
    
    angular
        .module('bloctime')
        .factory('Break', [Break]);
})();