var commands = {};

module.exports = {
    
    addHandler: function (command, callback) {
        commands[command] = callback;
    },

    handle: function (command, commandArgs) {
        return commands[command](commandArgs);
    }
};