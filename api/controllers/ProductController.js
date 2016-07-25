/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var ProductCommand = require('../commands/ProductCommand.js');
var DomainCommands = require('../commands/DomainCommands.js');

var getFilter = function (params) {
    var filter = {};

    if (params.name !== undefined){
        filter.name = params.name;
    }

    if (params.description !== undefined){
        filter.description = params.description;
    }

    if (params.category !== undefined){
        filter.category = params.category;
    }
    
    if (params.size !== undefined){
        filter.size = params.size.split(',');
    }

    if (params.color !== undefined){
        filter.color = params.color.split(',');
    }

    if (params.startPrice !== undefined){
        filter.price = {'>=': params.startPrice};
    }

    if (params.endPrice !== undefined){
        filter.price = {'<=': params.endPrice};
    }        

    return filter;    
};

module.exports = {

	addProduct: function (req, res) {
        DomainCommands.handle(ProductCommand.addProductCommand, req.body, function (err, created) {
            if (err) return res.negotiate(err);
            return res.json(created);
        });
    },

    addInventory: function (req, res) {
        DomainCommands.handle(ProductCommand.addInventoryCommand, req.body, function (err, created) {
            if (err) return res.negotiate(err);
            return res.json(created);
        });
    },

    listProduct: function (req, res) {
        var filter = getFilter(req.params.all());
        
        DomainCommands.handle(ProductCommand.listProductCommand, filter, function (err, results) {
            if (err) return res.negotiate(err);
            return res.json(results);
        });
    },

    removeProduct: function (req, res) {
        var productId = req.body.productId;

        DomainCommands.handle(ProductCommand.removeProductCommand, productId, function (err, created) {
            if (err) return res.negotiate(err);
            return res.ok('product is deleted');
        });
    }
};

