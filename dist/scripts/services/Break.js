(function() {
    function Break() {
        
        Break = {};
        
        Break.onBreak = false;
        
        Break.startTimer = null;
        
        return Break;
    }
    
    angular
        .module('bloctime')
        .factory('Break', [Break]);
})();