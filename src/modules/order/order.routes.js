import Router from "express";
import { validtionSchema } from "../../middlewares/validate.js";

const router = Router();

import {
  createOrder,
  deleteOrder,
  getOrders,
  getSpecificOrder,
  updateOrder,
} from "./controller/order.js";
import {
  createOrderSchema,
  getOrderSchema,
  getOrdersSchema,
  updateOrderSchema,
  deleteOrderSchema,
} from "../../validators/order.js";

router.post("/orders", validtionSchema(createOrderSchema), createOrder);
router.get("/orders", validtionSchema(getOrdersSchema), getOrders);
router.get("/orders/:id", validtionSchema(getOrderSchema), getSpecificOrder);
router.put("/orders/:id", validtionSchema(updateOrderSchema), updateOrder);
router.delete("/orders/:id", validtionSchema(deleteOrderSchema), deleteOrder);
export default router;
