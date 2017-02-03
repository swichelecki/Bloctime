(function() {
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
        });
        
        $stateProvider
            .state('landing', {
                url: '/',
                controller: 'LandingCtrl as landing',
                templateUrl: '/templates/landing.html'
        });
    }
    
    
    angular
        .module('bloctime', ['ui.router', 'firebase'])
        .constant('INTERVALS', 
                  {NUMS_1: 10000,
                   NUMS_2: 5000,
                   NUMS_3: 15000})
        .config(config);
})();