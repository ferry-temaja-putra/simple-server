var request = require('supertest');

describe('ProductController', function() {

    describe('#listProduct()', function() {
        it('should return OK response ', function (done) {
            request(sails.hooks.http.app)
            .get('/product/listproduct')
            .expect(200, done);
        });
    });
});