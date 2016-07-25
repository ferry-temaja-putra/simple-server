module.exports = {
    addCategory: function (categoryName, callback) {
        
        var newCategory = {
            name: categoryName,
            parent: 0
        };

        Category.create(newCategory).exec(function (err, created) {
            if (err) return callback(err);
            return callback(null, created);
        });
    },

    listCategory: function (callback) {
        Category.find().exec(function (err, results) {
            if (err) return callback(err);
            return callback(null, results);
        });        
    }
};