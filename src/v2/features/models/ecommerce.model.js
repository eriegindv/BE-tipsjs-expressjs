const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: { type: Number, required: true },
    code: String,
    name: String,
    brand: String,
    description: String,
    release_date: Date,
    specs: { type: Array, default: [] },
  },
  {
    collection: "products",
    timestamps: true,
  }
);

const cartSchema = new mongoose.Schema(
  {
    userId: Number,
    status: { type: String, default: "active" },
    modifiedOn: { type: Date, default: Date.now },
    products: Array,
  },
  {
    collection: "carts",
    timestamps: true,
  }
);

const orderSchema = new mongoose.Schema(
  {
    cartId: Number,
    orderId: Number,
    userId: Number,
    shipping: Object,
    payment: Object,
    products: Array,
  },
  {
    collection: "orders",
    timestamps: true,
  }
);

const inventorySchema = new mongoose.Schema(
  {
    productId: Number,
    quantity: Number,
    reservations: Array,
  },
  {
    collection: "inventories",
    timestamps: true,
  }
);

module.exports = {
  _product: mongoose.model("Product", productSchema),
  _order: mongoose.model("Order", orderSchema),
  _cart: mongoose.model("Cart", cartSchema),
  _inventory: mongoose.model("Inventory", inventorySchema),
};
