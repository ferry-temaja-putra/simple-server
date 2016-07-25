var Repository = require('../repositories/CategoryRepository.js');

module.exports = {

    addCategory: function (commandArgs, callback) {
        return Repository.addCategory(commandArgs, callback);
    },

    addChildCategory: function (commandArgs, callback) {
        var parent = commandArgs.parent; 
        var data = commandArgs.data;

        data.parent = parent;
        return Repository.addCategory(data, callback);
    },

    listCategory: function (commandArgs, callback) {          
        return Repository.listCategory(callback);
    }
};