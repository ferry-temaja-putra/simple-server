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

    addChildCategory: function (parent, childCategoryName, callback) {
        
        var newCategory = {
            name: childCategoryName,
            parent: parent
        };

        Category.create(newCategory).exec(function (err, created) {
            if (err) return callback(err);
            return callback(null, created);
        });
    },

    removeCategory: function (categoryId, callback) {
        Category.destroy({id: categoryId}).exec(function (err) {
            if (err) return callback(err);
            return callback(null);
        });
    },

    listCategory: function (callback) {
        Category.find().exec(function (err, results) {
            if (err) return callback(err);
            return callback(null, results);
        });        
    },

    getChildCategories: function (parentId, callback) {
        Category.find({parent: parentId}).exec(function (err, results) {
            if (err) return callback(err);
            return callback(null, results);
        });
    },

    resetChildCategoryParent: function (categoryIds, callback) {
        Category.update(categoryIds, {parent: 0}).exec(function (err, results) {
            if (err) return callback(err);
            return callback(null, results);
        });
    },

    getCategory: function (categoryId, callback) {
        Category.findOne({id: categoryId}).exec(function (err, result) {
            if (err) return callback(err);
            return callback(null, result);
        });
    }
};