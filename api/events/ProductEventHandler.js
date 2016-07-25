var Repository = require('../repositories/ProductRepository.js');

module.exports = {
    
    inventoryAdded: function (addedInventory) {

        Product.findOne({id: addedInventory.product})
        .populate('category')
        .exec(function (err, result) {
            if (err) return err;
            
            var newRecord = {
                product: result.id,
                name: result.name,
                description: result.description,
                category: result.category.name,
                size: addedInventory.size,
                color: addedInventory.color,
                price: addedInventory.price
            };

            Productread.create(newRecord).exec(function (err, created) {
                if (err) return err;
                return created;
            });
        });
    }
}