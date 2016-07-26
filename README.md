# simple-server

https://ftp-simple-server.herokuapp.com/

To run the test:
```sh
$ npm test
```

To run the server locally:
```sh
$ sails lift
```

### available routes for category:
- /category/listcategory
- /category/addcategory
  - accepts {categoryName}.
- /category/addchildcategory
  - accepts {parent, childCategoryName}.
- /category/removecategory
  - accepts {categoryId}.

### available routes for product:
- /product/listProduct
  - accepts combination of the following parameters: name, category, size, color, startPrice, endPrice.
  - notes: only products with inventory that are displayed in the list.
- /product/addproduct
  - accepts {name, description, category}.
- /product/addinventory
  - accepts {product, size, color, price}.
- /product/removeproduct
  - accepts {productId}.