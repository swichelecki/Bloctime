(function() {
    function Break() {
        
        Break = {};
        
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