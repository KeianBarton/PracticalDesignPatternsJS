// expanding from the observer examples
var mediator = (function(){
    var channels = {};

    var subscribe = function(channel, context, func) {
        if (!mediator.channels[channel]) {
            mediator.channels[channel] = [];
        }
        mediator.channels[channel].push({
            context: context,
            func: func
        });
    };

    var publish = function(channel) {
        if (!this.channels[channel]) {
            return false;
        }

        // arguments allows you to access the arguments sent to a function
        // in this case publish - the 1 is the start index parameter for slice
        // in other words we are creating an array of arguments not including
        // channel for publish
        var args = Array.prototype.slice.call(arguments, 1);

        for (var i=0; i < mediator.channels[channel].length; i++) {

            var sub = mediator.channels[channel][i];
            sub.func.apply(sub.context, args)
        }
    };

    return {
        channels: {},
        subscribe: subscribe,
        publish: publish
    };
}());

// using the mediator in the observer example:
var not = new notificationService();
var ls = new loggingService();
var audit = new auditingService();

mediator.subscribe('complete', not, not.update);
mediator.subscribe('complete', ls, ls.update);
mediator.subscribe('complete', audit, audit.update);

task1.complete = function() {
    mediator.publish('complete', this);
    Task.prototype.complete.call(this);
}