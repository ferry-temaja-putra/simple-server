var Repository = require('../repositories/CategoryRepository.js');

module.exports = {

    addCategory: function (commandArgs, callback) {
        var data = commandArgs;
        return Repository.addCategory(data, callback);
    },

    listCategory: function (commandArgs, callback) {          
        return Repository.listCategory(callback);
    }
};