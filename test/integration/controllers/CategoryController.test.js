var request = require('supertest');

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
            request(sails.hooks.http.app)
            .post('/category/addCategory')
            .send({ categoryName: 'test'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                // clean up the created data
                Category.destroy({id: res.body.id}).exec(function (err) {
                    if (err) return done(err);
                    done();
                });
            })
        });
    });

    describe('#addCategory()', function() {
        it('should return badRequest response when category name is undefined', function (done) {
            request(sails.hooks.http.app)
            .post('/category/addCategory')
            .send({})
            .expect(400, done)
        });
    });

    describe('#addCategory()', function() {
        it('should return badRequest response when category name is empty', function (done) {
            request(sails.hooks.http.app)
            .post('/category/addCategory')
            .send({categoryName: ''})
            .expect(400, done)
        });
    });

    describe('#addChildCategory()', function() {
        it('should return badRequest response when parent is not found', function (done) {
            request(sails.hooks.http.app)
            .post('/category/addChildCategory')
            .send({parent: -1, childCategoryName: 'test'})
            .expect(400, done)
        });
    });

});