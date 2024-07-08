import { asyncHndler } from "../../../helper/index.js";
import { Order } from "../../../models/order.js";
import { Product } from "../../../models/product.js";

export const createOrder = asyncHndler(async (req, res, next) => {
  const { products } = req.body;
  let totalAmount = 0;
  const productIds = products.map((p) => p.productId);
  const productList = await Product.find({ _id: { $in: productIds } });

  if (productList.length !== productIds.length) {
    return res.status(404).json({ message: "One or more products not found" });
  }

  const orderProducts = products.map((product) => {
    const productData = productList.find(
      (p) => p._id.toString() === product.productId
    );
    if (productData) {
      totalAmount += productData.price * product.quantity;
      return {
        productId: product.productId,
        quantity: product.quantity,
      };
    }
  });

  const order = await Order.create({
    products: orderProducts,
    totalAmount,
  });

  res.status(201).json({ message: "order is created", data: order });
});
export const getOrders = asyncHndler(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit;
  const skip = (page - 1) * limit;
  const order = await Order.find()

    .limit(limit)
    .skip(skip);
  res.status(200).json({ message: "Orders", page, data: order });
});

export const getSpecificOrder = asyncHndler(async (req, res, next) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  if (!order) {
    next(new Error(` cannot find order for this id ${id} `));
  }
  res.status(200).json({ message: "Order", data: order });
});

export const updateOrder = asyncHndler(async (req, res, next) => {
  const id = req.params.id;
  const { products } = req.body;
  const order = await Order.findOneAndUpdate(
    { _id: id },
    {
      products,
    },
    { new: true }
  );
  if (!order) {
    next(new Error(` cannot find order for this is ${id}`));
    return;
  }
  res.status(200).json({ message: "order updated ", data: order });
});
export const deleteOrder = asyncHndler(async (req, res, next) => {
  const id = req.params.id;
  const order = await Order.findByIdAndDelete(id);
  if (!order) {
    next(new Error(`cannt find order for this id ${id}`));
    return;
  }
  res.status(200).json({ message: "order deleted " });
});
