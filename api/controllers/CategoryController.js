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

        if (categoryName === undefined || categoryName === '') {
            return res.badRequest('category name is required');
        }

        DomainCommands.handle(CategoryCommand.addCategoryCommand, categoryName, function (err, created) {
            if (err) return res.negotiate(err);
            return res.ok(created);
        });
    },

    addChildCategory: function (req, res) {

        var parent = req.body.parent;
        var childCategoryName = req.body.childCategoryName;

        if (parent === undefined) return res.badRequest('parent is required');

        var args = {
            parent: parent,
            childCategoryName: childCategoryName
        };

        DomainCommands.handle(CategoryCommand.addChildCategoryCommand, args, function (err, created) {
            if (err) return res.negotiate(err);
            return res.ok(created);
        });
    },

    removeCategory: function (req, res) {
        var categoryId = req.body.categoryId;

        DomainCommands.handle(CategoryCommand.removeCategoryCommand, categoryId, function (err, created) {
            if (err) return res.negotiate(err);
            return res.ok('category is deleted');
        });
    },

    listCategory: function (req, res) {        
        DomainCommands.handle(CategoryCommand.listCategoryCommand, {}, function (err, results) {
            if (err) return res.negotiate(err);
            return res.json(results);
        });
    }
};

