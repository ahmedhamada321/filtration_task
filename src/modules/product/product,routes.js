import Router from "express";
const router = Router();
import {
  createProduct,
  getProducts,
  getSpecificproduct,
  updateProduct,
  deleteProduct,
} from "./controller/product.js";

import {
  getProductSchema,
  updateProductSchema,
  getProductsSchema,
  deleteProductSchame,
  creatproductSchema,
} from "../../validators/product.js";
import { validtionSchema } from "../../middlewares/validate.js";

router.post("/products", validtionSchema(creatproductSchema), createProduct);
router.get("/products", validtionSchema(getProductSchema), getProducts);
router.get(
  "/products/:id",
  validtionSchema(getProductsSchema),
  getSpecificproduct
);
router.put(
  "/products/:id",
  validtionSchema(updateProductSchema),
  updateProduct
);
router.delete(
  "/products/:id",
  validtionSchema(deleteProductSchame),
  deleteProduct
);

export default router;
