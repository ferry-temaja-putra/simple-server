/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var CategoryEventHandler = require('../api/events/CategoryEventHandler.js');
var DomainEvents = require('../api/events/DomainEvents.js');

var CategoryCommandHandler = require('../api/commands/CategoryCommandHandler.js');
var DomainCommands = require('../api/commands/DomainCommands.js');

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
      
  DomainCommands.addHandler(CategoryCommandHandler.addCategoryCommand, CategoryCommandHandler.addCategory);
  DomainCommands.addHandler(CategoryCommandHandler.listCategoryCommand, CategoryCommandHandler.listCategory);

  cb();
};
