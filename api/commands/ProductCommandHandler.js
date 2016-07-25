var Repository = require('../repositories/ProductRepository.js');

module.exports = {
    
    addProduct: function (commandArgs, callback) {
        return Repository.addProduct(commandArgs, callback);
    }, 

    addInventory: function (commandArgs, callback) {
        
    }
};