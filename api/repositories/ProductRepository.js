module.exports = {

    addProduct: function (newProduct, callback) {
        Product.create(newProduct).exec(function (err, created) {
            if (err) return callback(err);
            return callback(null, created);
        });
    },

    addInventory: function (newInventory, callback) {        
        Inventory.create(newInventory).exec(function (err, created) {
           if (err) return callback(err);
           return callback(null, created); 
        });
    },

    getProduct: function (productId, callback) {
        Product.findOne({id: productId})
        .populate('category')
        .exec(function (err, created) {
            if (err) return callback(err);
            return callback(null, created);
        });
    },
    
    addProductForRead: function (newProductForRead, callback) {
        Productread.create(newProductForRead).exec(function (err, created) {
            if (err) return callback(err);
            return callback(null, created);
        });
    },

    listProduct: function (filter, callback) {
        Productread.find(filter).exec(function (err, results) {
            if (err) return callback(err);
            return callback(null, results);
        });
    }
};