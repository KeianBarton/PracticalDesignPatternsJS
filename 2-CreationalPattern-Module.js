// Module pattern
var Module = {              // object literal
    method: function() { /* ... */ },
    nextMethod: function() { /* ... */ }
}

var Module = function() {   // wrapped in a func
    var privateVar = 'I am private... ';
    return {
        method: function() { /* ... */ }
    }
}

// Practical example
var repo = function () {

    var db = {};   // all methods have access to database stuff via closure

    return {
        get: function(id) {
            console.log('Getting task ' + id);
            return {
                name: 'new task from db'
            };
        },
        save: function(task) {
            console.log('Saving task ' + task.name + ' to the repository');
        }
    }

}

module.exports = repo();

// Then in separate file:
var Repo = require('./taskRepository');
var task1 = new Task(Repo.get(1));

// In task.js object file
var Repo = require('./taskRepository');

var Task = function (data) { /* ... */ }
Task.prototype.save = function() {
    Repo.save(this);
}


// Revealing module pattern:
var repo = function () {
    var db = {};   // all methods have access to database stuff via closure
    var get = function(id) {
        // implementation
    };
    var save = function(task) {
        // implementation
    };
    return {
        get: get,
        save: save
    }
}

module.exports = repo();
