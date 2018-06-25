// Creating Objects
var obj = {};
var nextObj = Object.create(Object.prototype);
var lastObj = new Object();

// Assigning keys and values
var obj = {};
obj.param = 'new value';  // or obj['param']
console.log(obj.param);

var val = 'value';
obj[val] = 'foo';  // can use bracket notation with variables

// Demo task creation
var task = {
    title: 'My Title',
    description: 'My Description'
};
task.toString = function() {
    return this.title;
}
console.log(task.toString());

// Defining properties (ECMAScript 5)
Object.defineProperty(obj, 'name', {
    value: 'my name',
    writable: true,   // can overwrite this property?
    enumerable: true,  // for loop / keys iterating through obj properties - will this show?
    configurable: true  // change these configuration values? e.g. writeable
})

// demo of properties
var task = {
    title: 'My Title',
    description: 'My Description'
};
Object.defineProperty(task, 'toString', {
    value: function () {
        return this.title + ' ' + this.description;
    },
    writable: false,
    enumerable: false,
    configurable: true
});
task.toString = 'hi';   // toString is not overwritten
console.log(Object.keys(task));  // ['title', 'description']

// demo of inheritance
var task = {};
Object.defineProperty(task, 'toString', {
    value: function () {
        return this.title + ' ' + this.description;
    },
    writable: false
});    
var urgentTask = Object.create(task);
Object.defineProperty(task, 'toString', {
    value: function () {
        'Urgent task has a different implementation';
    },
    writable: false
});    