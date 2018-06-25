// lots of code to pull in various repo's
var Task = require('./task');
var taskRepo = require('./taskRepository');
var userRepo = require('./userRepository');
var projectRepo = require('./projectRepository');

var task1 = new Task(taskRepo.get(1));
var user = userRepo.get(1);
var project = projectRepo.get(1);

// simple repository factory
var repoFactory = function () {
    this.getRepo = function (repoType) {
        if (repoType === 'task') {
            if(this.taskRepo){
                return this.taskRepo;
            } else {
                this.taskRepo = require('./taskRepository')();
                return this.taskRepo;
            }
        }
        // other if statements for other types
    }
}

// then in the file needing the repo
var repoFactory = require('./repoFactory');

// Even smarter repo factory:
var repoFactory = function() {
    var repos = this;
    var repoList = [{name:'task', source:'./taskRepository'},
                    {name:'task', source:'./taskRepository'},
                    {name:'task', source:'./taskRepository'}];
    repoList.forEach(function(repo){
        repos[repo.name] = require(repo.source)()
    });
};
module.exports = new repoFactory;