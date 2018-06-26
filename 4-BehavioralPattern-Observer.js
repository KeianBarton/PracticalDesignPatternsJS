// task.js
var Task = function (data) {
    this.name = data.name;
    this.priority = data.priority;
    this.project = data.project;
    this.user = data.user;
    this.completed = data.completed;
};

Task.prototype.complete = function () {
    console.log('completing task: ' + this.name);
    this.completed = true;
};

Task.prototype.save = function () {
    console.log('saving Task: ' + this.name);
};

module.exports = Task;



// main.js
var Task = require('./task');

var notificationService = function() {
    var message = 'Notifying ';
    this.update = function(task) {
        console.log(message + task.user + ' for task ' + task.name);
    }
};

var loggingService = function() {
    var message = 'Notifying ';
    this.update = function(task) {
        console.log(message + task.user + ' for task ' + task.name);
    }
};

var auditingService = function() {
    var message = 'Notifying ';
    this.update = function(task) {
        console.log(message + task.user + ' for task ' + task.name);
    }
};

function ObserverList() {
    this.observerList = [];
};

ObserverList.prototype.add = function (obj) {
    return this.observerList.push( obj );
};

ObserverList.prototype.get = function ( index ) {
    if ( index > -1 && index < this.observerList.length ) {
        return this.observerList[ index ];
    }
};

ObserverList.prototype.count = function() {
    return this.observerList.length;
}

// Decorates task with a list of observers
var ObservableTask = function(data) {
    Task.call(this, data);
    this.observers = new ObserverList();
};

ObservableTask.prototype.addObserver = function( observer ) {
    this.observers.add( observer );
};

ObservableTask.prototype.notify = function( context ) {
    var observerCount = this.observers.count();
    for (var i=0; i<observerCount; i++) {
        // execute observer with context (noting observer will be function)
        this.observers.get(i)(context);
    }
}

ObservableTask.prototype.save = function () {
    this.notify(this);       // notifies observers passing in this
    Task.prototype.save.call(this);
};

var task1 = new ObservableTask({name:'task 1', user:'Jon'});

var not = new notificationService();
var ls = new loggingService();
var audit = new auditingService();

task1.addObserver(not.update);
task1.addObserver(ls.update);
task1.addObserver(audit.update);

task1.save();


// Removing observers
ObserverList.prototype.removeAt = function( index ) {
    this.observerList.splice( index, 1 );
}

ObserverList.prototype.indexOf = function( obj, startIndex ) {
    var i = startIndex;

    while(i < this.observerList.length) {
        if (this.observerList[i] === obj) {
            return i;
        }
        i++;
    }

    return -1;
}

ObservableTask.prototype.removeObserver = function (observer) {
    this.observers.removeAt( this.observers.indexOf( observer, 0 ));
}