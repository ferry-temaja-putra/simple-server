var ProductRepository = require('../repositories/ProductRepository.js');
var CategoryRepository = require('../repositories/CategoryRepository.js');
var ProductEvent = require('../events/ProductEvent.js');
var DomainEvents = require('../events/DomainEvents.js');

module.exports = {
    
    addProduct: function (commandArgs, callback) {
        CategoryRepository.getCategory(commandArgs.category, function (err, category) {
            if (err) return callback(err);

            if (category === undefined) {
                return callback({status: 400, message:'category is not found'});
            }

            return ProductRepository.addProduct(commandArgs, callback);
        })
    }, 

    addInventory: function (commandArgs, callback) {
        return ProductRepository.addInventory(commandArgs, function (err, created) {
            if (err) return callback(err);

            DomainEvents.publishEvent(ProductEvent.inventoryAddedEvent, created);
            return callback(null, created);
        });
    },

    listProduct: function (commandArgs, callback) {
        return ProductRepository.listProduct(commandArgs, callback);
    },

    removeProduct: function (commandArgs, callback) {
        var removedProductId = commandArgs;

        return ProductRepository.removeProduct(commandArgs, function (err) {
            if (err) return callback(err);

            DomainEvents.publishEvent(ProductEvent.productRemovedEvent, removedProductId);
            return callback(null);
        });
    },
};