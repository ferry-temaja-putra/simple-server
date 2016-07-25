/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var ProductCommand = require('../commands/ProductCommand.js');
var DomainCommands = require('../commands/DomainCommands.js');

module.exports = {

	addProduct: function (req, res) {
        DomainCommands.handle(ProductCommand.addProductCommand, req.body, function (err, created) {
            if (err) return res.negotiate(err);
            return res.ok(created);
        });
    },

    addInventory: function (req, res) {
        DomainCommands.handle(ProductCommand.addInventoryCommand, req.body, function (err, created) {
            if (err) return res.negotiate(err);
            return res.ok(created);
        });
    }
};

