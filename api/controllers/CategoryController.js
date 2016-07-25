/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var CategoryEventHandler = require('../events/CategoryEventHandler.js');
var DomainEvents = require('../events/DomainEvents.js');

module.exports = {
	hello: function (req, res) {
        DomainEvents.publishEvent(CategoryEventHandler.helloEvent, 'hello');
        res.ok('event handled');
    }
};

