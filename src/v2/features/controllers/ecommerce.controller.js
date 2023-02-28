const {
  addInventory,
  addProduct,
  addToCart,
} = require("../services/ecommerce.services");

module.exports = {
  addToCart: async (req, res, next) => {
    try {
      const { productId, quantity, userId } = req.body;
      return res.json({
        elements: await addToCart({ productId, quantity, userId }),
      });
    } catch (error) {
      next(error);
    }
  },
  addInventory: async (req, res, next) => {
    try {
      const inventory = req.body;
      return res.json({ elements: await addInventory(inventory) });
    } catch (error) {
      next(error);
    }
  },
  addProduct: async (req, res, next) => {
    try {
      const product = req.body;
      return res.json({ elements: await addProduct(product) });
    } catch (error) {
      next(error);
    }
  },
};
