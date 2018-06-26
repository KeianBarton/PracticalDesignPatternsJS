// Simple decoration
var Task = function (name) {
    this.name = name;
}

Task.prototype.save = function() {
    console.log('saving Task: ' + this.name);
}

var urgentTask = new Task('Urgent task');
urgentTask.priority = 2;     // decorating this obj with extra functionality
urgentTask.save = function() {
    // extra functionality
    Task.prototype.save.call(this);  // we bind the save execution to this object
}


// More complex decoration
var UrgentTask = function(name, priority) {
    Task.call(this, name);   // call Task constructor
    this.priority = priority;
}
// UrgentTask.prototype = Task.prototype - avoid or else changes to one affect the other
UrgentTask.prototype = Object.create(Task.prototype);

