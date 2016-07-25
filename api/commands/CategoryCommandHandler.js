var Repository = require('../repositories/CategoryRepository.js');

module.exports = {

    addCategory: function (commandArgs, callback) {
        return Repository.addCategory(commandArgs, callback);
    },

    addChildCategory: function (commandArgs, callback) {
        var parent = commandArgs.parent; 
        var childCategoryName = commandArgs.childCategoryName;

        return Repository.addChildCategory(parent, childCategoryName, callback);
    },

    removeCategory: function (commandArgs, callback) {
        return Repository.removeCategory(commandArgs, callback);
    },

    listCategory: function (commandArgs, callback) {          
        return Repository.listCategory(callback);
    }
};