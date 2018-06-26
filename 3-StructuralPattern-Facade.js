var Task = function (data) {
    this.name = data.name;
    this.priority = data.priority;
    this.project = data.project;
    this.user = data.user;
    this.completed = data.completed;
}

// complicated service
var TaskService = function () {
    return {
        complete: function (task) {
            task.completed = true;
            console.log('completing task: ' + task.name);
        },
        setCompletedDate: function (task) {
            task.completedDate = new Date();
            console.log(task.name + ' completed on ' + task.completedDate);
        },
        notifyCompletion: function (task, user) {
            console.log('Notifying ' + user + ' of the completion of ' + task.name);
        },
        save: function (task) {
            console.log('saving Task: ' + task.name);
        }
    }
}();

var myTask = new Task({
    name: 'MyTask',
    priority: 1,
    project: 'Courses',
    user: 'Jon',
    completed: false
});
// completing a task requires multiple function calls
TaskService.complete(myTask);
if (myTask.completed == true) {
    TaskService.setCompletedDate(myTask);
    TaskService.notifyCompletion(myTask, myTask.user);
    TaskService.save(myTask);
}


// After implementing the facade pattern:
var TaskServiceWrapper = function() {
    var completeAndNotify = function (task) {
    TaskService.complete(task);        
        if (task.completed == true) {
            TaskService.setCompletedDate(task);
            TaskService.notifyCompletion(task, task.user);
            TaskService.save(task);
        }
    }
    return { // revealing module pattern
        completeAndNotify: completeAndNotify
    }
}

TaskService.completeAndNotify(myTask);