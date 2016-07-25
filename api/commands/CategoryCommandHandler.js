var Repository = require('../repositories/CategoryRepository.js');
var CategoryEvent = require('../events/CategoryEvent.js');
var DomainEvents = require('../events/DomainEvents.js');

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
        var removedCategoryId = commandArgs;

        return Repository.removeCategory(commandArgs, function (err) {
            if (err) return callback(err);

            DomainEvents.publishEvent(CategoryEvent.categoryRemovedEvent, removedCategoryId);
            return callback(null);
        });
    },

    listCategory: function (commandArgs, callback) {          
        return Repository.listCategory(callback);
    }
};