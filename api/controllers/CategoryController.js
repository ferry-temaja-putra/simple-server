/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var CategoryEventHandler = require('../events/CategoryEventHandler.js');
var DomainEvents = require('../events/DomainEvents.js');

var CategoryCommandHandler = require('../commands/CategoryCommandHandler.js');
var DomainCommands = require('../commands/DomainCommands.js');

module.exports = {

    addCategory: function (req, res) {        
        DomainCommands.handle(CategoryCommandHandler.addCategoryCommand, req.body)(function (err, created) {
            if (err) return res.negotiate(err);
            return res.ok(created);
        });
    },

    listCategory: function (req, res) {        
        DomainCommands.handle(CategoryCommandHandler.listCategoryCommand, null)(function (err, results) {
            if (err) return res.negotiate(err);
            return res.json(results);
        });
    }
};

