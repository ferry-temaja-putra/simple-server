var Repository = require('../repositories/CategoryRepository.js');

module.exports = {

    addCategoryCommand: 'addCategoryCommand',
    listCategoryCommand: 'listCategoryCommand',

    addCategory: function (commandArgs, callback) {
        var data = commandArgs;

        if (data.name == undefined || data.name == '') {
            return callback(new Error('category name is mandatory!'));
        }
        return Repository.addCategory(commandArgs, callback);
    },

    listCategory: function (commandArgs, callback) {  
        // console.log(Repository);              
        return Repository.listCategory(callback);
    }
};