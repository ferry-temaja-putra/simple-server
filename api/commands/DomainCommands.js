var commands = {};

module.exports = {
    
    addHandler: function (command, callback) {
        commands[command] = callback;
    },

    handle: function (command, commandArgs, callback) {
        return commands[command](commandArgs, callback);
    }
};