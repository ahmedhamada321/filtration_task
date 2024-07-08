import { asyncHndler } from "../../../helper/index.js";
import { Product } from "../../../models/product.js";

export const createProduct = asyncHndler(async (req, res, next) => {
  const { name, description, price } = req.body;

  const product = await Product.create({
    name,
    description,
    price,
  });

  res.status(201).json({ message: "Product is created", data: product });
});
export const getProducts = asyncHndler(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit;
  const skip = (page - 1) * limit;
  const product = await Product.find()

    .limit(limit)
    .skip(skip);
  res.status(200).json({ message: "proucts", page, data: product });
});

export const getSpecificproduct = asyncHndler(async (req, res, next) => {
  const id = req.query.id;
  const product = await Product.findById(id);
  if (!product) {
    next(new Error(` cannot find product for this id ${id} `));
  }
  res.status(200).json({ message: "category", data: product });
});

export const updateProduct = asyncHndler(async (req, res, next) => {
  const id = req.query.id;
  const { name, description, price } = req.body;
  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      name,
      description,
      price,
    },
    { new: true }
  );
  if (!product) {
    next(new Error(` cannot find prodct for this is ${id}`));
    return;
  }
  res.status(200).json({ message: "proudct updated ", data: product });
});
export const deleteProduct = asyncHndler(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    next(new Error(`cannt find product for this id ${id}`));
    return;
  }
  res.status(200).json({ message: "product deleted " });
});
