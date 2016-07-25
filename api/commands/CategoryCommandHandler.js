var Repository = require('../repositories/categoryrepository.js');

module.exports = {

    addCategoryCommand: 'addCategoryCommand',
    listCategoryCommand: 'listCategoryCommand',

    addCategory: function (commandArgs, callback) {
        var data = commandArgs;

        if (data.name == undefined || data.name == '') {
            return callback(new Error('category name is mandatory!'));
        }
        return Repository.add(commandArgs, callback);
    },

    listCategory: function (commandArgs, callback) {
        return Repository.list(commandArgs, callback);
    }
};