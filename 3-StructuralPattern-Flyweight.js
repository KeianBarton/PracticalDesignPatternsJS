// Setting up 10,000 random tasks and monitoring memory usage
var Task = function (data) {
    this.name = data.name;
    this.priority = data.priority;
    this.project = data.project;
    this.user = data.user;
    this.completed = data.completed;
}

function TaskCollection() {
    var tasks = {};
    var count = 0;
    var add = function (data) {
        tasks[data.name] = 
            new Task(data);
        count++;
    };
    var get = function (name) {
        return tasks[name];
    };
    var getCount = function() {
        return count;
    };
    return {
        add: add,
        get: get,
        getCount: getCount
    };
}

var tasks = new TaskCollection();

var projects = ['none', 'courses', 'training', 'project'];
var priorities = [1, 2, 3, 4, 5];
var users = ['Jon', 'Erica', 'Amanda', 'Nathan'];
var completed = [true, false];

var initialMemory = process.memoryUsage().heapUsed;

for (var i = 0; i < 10000; i++) {
    tasks.add({
        name: 'task' + i,
        priority: priorities[Math.floor((Math.random() * 5))],
        project: projects[Math.floor((Math.random() * 4))],
        user: users[Math.floor((Math.random() * 4))],
        completed: completed[Math.floor((Math.random() * 2))]
    })
}

var afterMemory = process.memoryUsage().heapUsed;

console.log('used memory ' + (afterMemory - initialMemory) / 1000000);
console.log('tasks: ' + tasks.getCount());

// Implementing flyweight pattern
var Task = function (data) {
    this.flyweight = FlyweightFactory.get(data.project, data.priority, data.user, data.completed);
    this.name = data.name;
}

var Flyweight = function (project, priority, user, completed) {
    // shared pieces of data that otherwise would be saved in a Task
    this.priority = priority;
    this.project = project;
    this.user = user;
    this.completed = completed;
}

var FlyweightFactory = function(){
    var flyweights = {};

    // unique combinations of flyweights are only created if they do not already exist
    var get = function(project, priority, user, completed){
        if (!flyweights[project + priority + user + completed]) {
            flyweights[project + priority + user + completed] =
                new Flyweight(project, priority, user, completed);
        }
        return flyweights[project + priority + user + completed];
    };

    var getCount = function() {
        var count = 0;
        for (var f in flyweights) count++;
        return count;
    };

    return {
        get: get,
        getCount: getCount
    };
}();

// returning data
Task.prototype.getPriority = function () {
    this.flyweight.priority;
}