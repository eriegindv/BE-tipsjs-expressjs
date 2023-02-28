const s = require("connect-redis");
const {
  _product,
  _cart,
  _order,
  _inventory,
} = require("../models/ecommerce.model");

module.exports = {
  // add product
  addProduct: async (product) => {
    return await _product.create(product);
  },
  addInventory: async (inventory) => {
    return await _inventory.create(inventory);
  },
  addToCart: async ({ productId, quantity, userId }) => {
    // Step 1: Kiem tra trong kho co du hang hay khong
    // Step 2: Neu trong kho khong du thi xoa
    const stock = await _inventory.updateOne(
      {
        productId,
        quantity: { $gt: quantity },
      },
      {
        $inc: {
          quantity: -quantity,
        },
        $push: {
          reservations: { userId, quantity, productId },
        },
      }
    );

    if (stock.modifiedCount) {
      // add to cart
      const addToCart = await _cart.findOneAndUpdate(
        {
          userId,
        },
        {
          $push: {
            products: {
              productId,
              quantity,
            },
          },
        },
        {
          upsert: true,
          new: true,
        }
      );

      return 1;
    }
  },
};
