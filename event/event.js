/**
 * Created by Lam on 16/9/13.
 */
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

event.on('some_event',function () {
    console.log('这是一个自定义事件');
});

setInterval(function () {
    event.emit('some_event');
},1000);