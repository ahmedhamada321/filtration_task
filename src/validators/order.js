import Joi from "joi";
import { Types } from "mongoose";

const validateObjectId = (value, helpers) => {
  if (!Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

export const createOrderSchema = Joi.object({
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string()
          .custom(validateObjectId, "Object ID")
          .required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .required(),
});

export const getOrderSchema = Joi.object({
  id: Joi.string().custom(validateObjectId, "Object ID").required(),
});

export const getOrdersSchema = Joi.object({
  page: Joi.number().positive().optional(),
  limit: Joi.number().positive().optional(),
});
export const updateOrderSchema = Joi.object({
  id: Joi.string().custom(validateObjectId, "Object ID").required(),
  products: Joi.array().items(
    Joi.object({
      productId: Joi.string().custom(validateObjectId, "Object ID").required(),
      quantity: Joi.number().integer().min(1).required(),
    })
  ),
});
export const deleteOrderSchema = Joi.object({
  id: Joi.string().custom(validateObjectId, "Object ID").required(),
});
