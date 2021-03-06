var request = require('supertest');
var assert = require('chai').assert;
var async = require('async');

describe('ProductController', function() {

    describe('#listProduct()', function() {
        it('should return OK response ', function (done) {
            request(sails.hooks.http.app)
            .get('/product/listproduct')
            .expect(200, done);
        });
    });

    describe('#addProduct()', function() {
        it('should return badRequest response when name is undefined ', function (done) {
            request(sails.hooks.http.app)
            .post('/product/addProduct')
            .send({})
            .expect(400, done);
        });
    });

    describe('#addProduct()', function() {
        it('should return badRequest response when name is empty ', function (done) {
            request(sails.hooks.http.app)
            .post('/product/addProduct')
            .send({name: ''})
            .expect(400, done);
        });
    });

    describe('#addProduct()', function() {
        it('should return badRequest response when category is undefined ', function (done) {
            request(sails.hooks.http.app)
            .post('/product/addProduct')
            .send({name: 'test'})
            .expect(400, done);
        });
    });

    describe('#addProduct()', function() {
        it('should return badRequest response when category is not found ', function (done) {
            request(sails.hooks.http.app)
            .post('/product/addProduct')
            .send({name: 'test', category: -1})
            .expect(400, done);
        });
    });

    describe('#addProduct()', function() {
        it('should return the created product', function (done) {

            var createdCategoryId;
            var createdProductId;

            async.series([
                function createCategory(callback) {
                    Category.create({name: 'test'}).exec(function (err, created) {
                        if (err) return callback(err);
                        createdCategoryId = created.id;
                        callback();
                    });
                },

                function runTest(callback) {
                    request(sails.hooks.http.app)
                    .post('/product/addProduct')
                    .send({ name: 'test', category: createdCategoryId})
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) callback(err);
                        createdProductId = res.body.id;
                        callback();
                    });
                },

                function cleanUpCategory(callback) {
                    Category.destroy({id: createdCategoryId}).exec(function (err) {
                        callback(err);
                    });
                },

                function cleanUpProduct(callback) {
                    Product.destroy({id: createdProductId}).exec(function (err) {
                        callback(err);
                    });
                }

            ], function (err, results) {
                if (err) return done(err);
                done();
            });        
        });
    });

    describe('#removeProduct()', function() {
        it('should return ok response', function (done) {

            var createdCategoryId;
            var createdProductId;

            async.series([
                function createCategory (callback) {
                    Category.create({name: 'test'}).exec(function (err, created) {
                        if (err) return callback(err);
                        createdCategoryId = created.id;
                        callback();
                    });
                },

                function createProduct (callback) {
                    Product.create({name: 'test', category: createdCategoryId}).exec(function (err, created) {
                        if (err) return callback(err);
                        createdProductId = created.id;
                        callback();
                    })
                },

                function runTest(callback) {
                    request(sails.hooks.http.app)
                    .post('/product/removeProduct')
                    .send({productId: createdProductId})
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return callback(err);
                        callback();
                    });                    
                },

                function cleanUpCategory(callback) {
                    Category.destroy({id: createdCategoryId}).exec(function (err){
                        if (err) return callback(err);
                        callback();
                    });                    
                },

                function assertDeletedProduct(callback) {
                    Product.findOne({id: createdProductId}).exec(function (err, result) {
                        if (err) return callback(err);
                        assert.isNotOk(result, 'product should be deleted');
                        callback();
                    });
                }

            ], function (err, results) {
                if (err) return done(err);
                done();
            });
        });
    });

    describe('#addInventory()', function() {
        it('should return the created inventory', function (done) {

            var createdCategoryId;
            var createdProductId;

            async.series([

                function createCategory(callback) {
                    Category.create({name: 'test'}).exec(function (err, created) {
                        if (err) return callback(err);
                        createdCategoryId = created.id;
                        callback();   
                    });
                },

                function createProduct(callback) {
                    Product.create({name: 'test', category: createdCategoryId}).exec(function (err, created) {
                        if (err) return callback(err);
                        createdProductId = created.id;
                        callback();   
                    });
                },

                function runTest(callback) {
                    request(sails.hooks.http.app)
                    .post('/product/addInventory')
                    .send({ product: createdProductId, size: 'medium', color: 'blue', price: 90000})
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        callback(err);
                    });
                },

                function cleanUpCategory(callback) {
                    Category.destroy({id: createdCategoryId}).exec(function (err){
                        if (err) return callback(err);
                        callback();
                    }); 
                },

                function cleanUpProduct(callback) {
                    // use api call to clean up product, inventories and productread entries
                    request(sails.hooks.http.app)
                    .post('/product/removeProduct')
                    .send({productId: createdProductId})
                    .expect(200)
                    .end(function (err, res) {
                        callback(err);
                    }); 
                }

            ], function (err, results) {
                if (err) return done(err);
                done();
            });            
        });
    });
});