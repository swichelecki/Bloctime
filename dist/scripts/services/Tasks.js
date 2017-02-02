(function() {
    function Tasks($firebaseArray) {
        
        Tasks.Tasks = {};
        
        var ref = firebase.database().ref();
        
        var tasks = $firebaseArray(ref);
        
        /** non-essential code **/
        /*rooms.$loaded().then(function() {
            rooms[4].$value = "room 4";
            rooms.$save(4);
        }); */
        
        /*rooms.$loaded().then(function(){
            rooms.$remove();
        }); */
        
        /* tasks.$loaded().then(function() {
            for (var i = 0; i < tasks.length; i++) {
                    tasks.$remove(tasks[i]);
            }
        })
        /** end non-essential code **/
        
        Tasks.tasks = tasks;
        
        Tasks.addTask = function(newTask) {
        
            var value = newTask;
            
            tasks.$add({ value: value });
               
       };
        
       Tasks.deleteTask = function(task) {
           
           tasks.$loaded().then(function() {
               tasks.$remove(task);
               
           });
       };    
        
        //addTask();
        
        //return {
         //   all: tasks
       // }; 
        
        return Tasks;  
    }
    
    angular
        .module('bloctime')
        .factory('Tasks', ['$firebaseArray', Tasks]);
})();