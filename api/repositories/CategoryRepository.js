module.exports = {
    addCategory: function (data, callback) {
        Category.create(data).exec(function (err, created) {
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