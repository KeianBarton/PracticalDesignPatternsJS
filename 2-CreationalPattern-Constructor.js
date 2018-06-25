// Constructor structure
function ObjectName(param1, param2) {
    this.param1 = param1;
    this.param2 = param2;
    this.toString = function() { return 'foo'; }
    // new keyword - implicitly return this
}

// Demo
var Task = function(name) {
    this.name = name;
    this.completed = false;

    this.complete = function() {
        this.completed = true;
    }

    this.save = function() {
        console.log('saving Task: ' + this.name);
    }
}

var task1 = new Task('bla bla bla');


// Prototype demo
ClassName.prototype.methodName = function (arguments) {
};

var Task = function (name) {
    this.name = name;
    this.completed = false;
}

Task.prototype.complete = function() {
    console.log('completing task: ' + this.name);
    this.completed = true;
}

Task.prototype.save = function (arguments) {
    console.log('saving Task: ' + this.name);
}

module.exports = Task;

// in separate file
var Task = require('./task');
var task1 = new Task('foo');


// Classes example in EcmaScript 2015
'use strict'

class Task {
    constructor(name) {
        this.name = name;
        this.completed = false;
    }
    
    complete() {
    };

    save() {
    };
}