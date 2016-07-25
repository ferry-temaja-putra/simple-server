/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var CategoryCommand = require('../commands/CategoryCommand.js');
var DomainCommands = require('../commands/DomainCommands.js');

module.exports = {

    addCategory: function (req, res) {
        var categoryName = req.body.categoryName;

        DomainCommands.handle(CategoryCommand.addCategoryCommand, categoryName, function (err, created) {
            if (err) return res.negotiate(err);
            return res.ok(created);
        });
    },

    addChildCategory: function (req, res) {

        var args = {
            parent: req.body.parent,
            childCategoryName: req.body.childCategoryName
        };

        DomainCommands.handle(CategoryCommand.addChildCategoryCommand, args, function (err, created) {
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

