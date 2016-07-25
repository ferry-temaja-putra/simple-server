/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var CategoryEventHandler = require('../events/CategoryEventHandler.js');
var DomainEvents = require('../events/DomainEvents.js');

var CategoryCommand = require('../commands/CategoryCommand.js');
var DomainCommands = require('../commands/DomainCommands.js');

module.exports = {

    addCategory: function (req, res) {        
        DomainCommands.handle(CategoryCommand.addCategoryCommand, req.body, function (err, created) {
            if (err) return res.negotiate(err);
            return res.ok(created);
        });
    },

    listCategory: function (req, res) {        
        DomainCommands.handle(CategoryCommand.listCategoryCommand, {}, function (err, results) {
            if (err) return res.negotiate(err);
            return res.json(results);
        });
    }
};

