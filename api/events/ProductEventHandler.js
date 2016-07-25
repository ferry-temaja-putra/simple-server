var Repository = require('../repositories/ProductRepository.js');

module.exports = {
    
    inventoryAdded: function (addedInventory) {

        Repository.getProduct(addedInventory.product, function (err, product) {
            if (err) return err;
            
            var productForRead = {
                product: product.id,
                name: product.name,
                description: product.description,
                category: product.category.name,
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
    }
}