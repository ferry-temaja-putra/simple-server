var request = require('supertest');
var assert = require('chai').assert;
var async = require('async');

describe('CategoryController', function() {

    describe('#listCategory()', function() {
        it('should return OK', function (done) {
            request(sails.hooks.http.app)
            .get('/category/listCategory')
            .expect('Content-Type', /json/)
            .expect(200, done);
        });
    });

    describe('#addCategory()', function() {
        it('should return the created category', function (done) {

            var createdCategoryId;

            async.series([
                function runTest(callback) {
                    request(sails.hooks.http.app)
                    .post('/category/addCategory')
                    .send({ categoryName: 'test'})
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return callback(err);
                        createdCategoryId = res.body.id;
                        callback();
                    });                    
                },

                function cleanUp(callback) {
                    Category.destroy({id: createdCategoryId}).exec(function (err) {
                        callback(err);
                    });
                }

            ], function (err, results) {
                done(err);
            });
        });
    });

    describe('#addCategory()', function() {
        it('should return badRequest response when category name is undefined', function (done) {
            request(sails.hooks.http.app)
            .post('/category/addCategory')
            .send({})
            .expect(400, done);
        });
    });

    describe('#addCategory()', function() {
        it('should return badRequest response when category name is empty', function (done) {
            request(sails.hooks.http.app)
            .post('/category/addCategory')
            .send({categoryName: ''})
            .expect(400, done);
        });
    });

    describe('#addChildCategory()', function() {
        it('should return badRequest response when parent is undefined', function (done) {
            request(sails.hooks.http.app)
            .post('/category/addChildCategory')
            .send({childCategoryName: 'test'})
            .expect(400, done);
        });
    });

    describe('#addChildCategory()', function() {
        it('should return badRequest response when child category name is undefined', function (done) {
            request(sails.hooks.http.app)
            .post('/category/addChildCategory')
            .send({parent:0})
            .expect(400, done);
        });
    });

    describe('#addChildCategory()', function() {
        it('should return badRequest response when child category name is empty', function (done) {
            request(sails.hooks.http.app)
            .post('/category/addChildCategory')
            .send({parent:0, childCategoryName: ''})
            .expect(400, done);
        });
    });

    describe('#addChildCategory()', function() {
        it('should return badRequest response when parent is not found', function (done) {
            request(sails.hooks.http.app)
            .post('/category/addChildCategory')
            .send({parent: -1, childCategoryName: 'test'})
            .expect(400, done);
        });
    });

    describe('#addChildCategory()', function() {
        it('should return the created child category', function (done) {

            var parentId;
            var createdId;

            async.series([
                function createParent(callback) {
                    Category.create({categoryName: 'parent'}).exec(function (err, created) {
                        if (err) return callback(err);
                        parentId = created.id;
                        callback();
                    });
                },

                function runTest(callback) {
                    request(sails.hooks.http.app)
                    .post('/category/addChildCategory')
                    .send({parent: parentId, childCategoryName: 'child'})
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return callback(err);
                        createdId = res.body.id;
                        callback();
                    });
                },

                function cleanUp(callback) {
                    Category.destroy({id: [parentId, createdId]}).exec(function (err) {
                        callback(err);
                    });
                }

            ], function (err, results) {
                done(err);
            });      
        });
    });

    describe('#removeCategory()', function() {
        it('should return OK response ', function (done) {

            var createdId;

            async.series([
                function createCategory(callback) {
                    Category.create({name: 'test'}).exec(function (err, created) {
                        if (err) return callback(err);
                        createdId = created.id;
                        callback();
                    });
                }, 

                function runTest(callback) {
                    request(sails.hooks.http.app)
                    .post('/category/removeCategory')
                    .send({categoryId: createdId})
                    .expect(200)
                    .end(function (err, res) {
                        callback(err);
                    });                    
                },

                function assertDeletedCategory(callback) {
                    Category.findOne({id: createdId}).exec(function (err, result) {
                        if (err) return callback(err);
                        assert.isNotOk(result, 'category should be deleted');
                        callback();
                    });
                }
            ], function (err, results) {
                done(err);
            });   
        });
    });
});