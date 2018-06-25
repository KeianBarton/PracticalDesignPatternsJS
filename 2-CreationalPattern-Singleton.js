var TaskRepo = (function () {
    var taskRepo;
    function createRepo() {
        var taskRepo = new Object("Task");
        return taskRepo;
    }
    return {
        getInstance: function() {
            if(!taskRepo) {
                taskRepo = createRepo();
            }
            return taskRepo;
        }
    };
})();
var repo = TaskRepo.getInstance();

// Evaluate the function to export if you would like a singleton
var repo = function () { /* ... */ }
module.exports = repo();   // singleton
module.exports = new repo;   // singleton
module.exports = repo;     // when required, not a singleton