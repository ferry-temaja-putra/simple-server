var Repository = require('../repositories/categoryrepository.js');

module.exports = {

    addCategoryCommand: 'addCategoryCommand',

    addCategory: function (commandArgs, callback) {
        if (commandArgs.name === '') return callback(new Error('category name is mandatory!'));
        return Repository.addCategory(commandArgs, callback);
    }
};