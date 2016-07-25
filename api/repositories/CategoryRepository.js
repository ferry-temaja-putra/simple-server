module.expors = {
    add: function (data, callback) {
        Category.create(data).exec(function (err, created) {
            if (err) return callback(err);
            return callback(null, created);
        });
    }
};