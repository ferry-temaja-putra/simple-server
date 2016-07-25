var Repository = require('../repositories/ProductRepository.js');
var ProductEvent = require('../events/ProductEvent.js');
var DomainEvents = require('../events/DomainEvents.js');

module.exports = {
    
    addProduct: function (commandArgs, callback) {
        return Repository.addProduct(commandArgs, callback);
    }, 

    addInventory: function (commandArgs, callback) {
        return Repository.addInventory(commandArgs, function (err, created) {
            if (err) return callback(err);

            DomainEvents.publishEvent(ProductEvent.inventoryAddedEvent, created);
            return callback(null, created);
        });
    },

    listProduct: function (commandArgs, callback) {
        return Repository.listProduct(commandArgs, callback);
    },

    removeProduct: function (commandArgs, callback) {
        var removedProductId = commandArgs;

        return Repository.removeProduct(commandArgs, function (err) {
            if (err) return callback(err);

            DomainEvents.publishEvent(ProductEvent.productRemovedEvent, removedProductId);
            return callback(null);
        });
    },
};