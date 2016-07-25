var handlers = {};

module.exports = {

    addHandler: function (eventName, callback) {
        handlers[eventName] = callback;
    },

    publishEvent: function (eventName, eventArgs) {
        handlers[eventName](eventArgs);
    }
};