var Repository = require('../repositories/CategoryRepository.js');

module.exports = {

    categoryRemoved: function (removedCategoryId) {
        Repository.getChildCategories(removedCategoryId, function (err, results) {
            if (err) return err;

            var updatedIds = [];

            results.forEach(function(childCategory) {
                updatedIds.push(childCategory.id)                
            });

            Repository.resetChildCategoryParent(updatedIds, function (err, results) {
                if (err) return err;
                return results;
            });
        })
    }
};