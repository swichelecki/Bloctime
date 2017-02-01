(function() {
    function timecode() {
        return function(numbers) {
            
            var numbers = Number.parseFloat(numbers);
            
            if (Number.isNaN(numbers)) {
                return "25:00";
            }
            
            var minutes = Math.floor(numbers / 60000);
            var seconds = ((numbers % 60000) / 1000).toFixed(0);
            // ternary
            // condition ? ifTrue : else;
            return (seconds == 60 ? (minutes+1) + ':00' : minutes + ':' + (seconds < 10 ? '0' : '') + seconds);          
            
        };
    }
  
    angular
        .module('bloctime')
        .filter('timecode', [timecode]);
    
})();