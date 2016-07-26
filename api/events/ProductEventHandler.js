var Repository = require('../repositories/ProductRepository.js');

module.exports = {
    
    inventoryAdded: function (addedInventory) {

        Repository.getProduct(addedInventory.product, function (err, product) {
            
            if (product === undefined) return;

            if (err) return err;

            var categoryName = '';
            if (product.category) categoryName = product.category.name;

            var productForRead = {
                product: product.id,
                name: product.name,
                description: product.description,
                category: categoryName,
                inventory: addedInventory.id,
                size: addedInventory.size,
                color: addedInventory.color,
                price: addedInventory.price
            };

            Repository.addProductForRead(productForRead, function (err, created) {
                if (err) return err;
                return created;
            })            
        });
    },

    productRemoved: function (removedProductId) {
        Repository.removeInventory(removedProductId, function (err) {});
        Repository.removeProductForRead(removedProductId, function (err) {});
    }
}