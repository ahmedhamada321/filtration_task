import joi from "joi";
import { Types } from "mongoose";
const validateObgetId = (value, helper) => {
  return Types.ObjectId.isValid(value)
    ? value
    : helper.message("In-valed objectId");
};

export const creatproductSchema = joi.object({
  name: joi.string().required().max(30).min(2),
  description: joi.string().required().max(2000).min(10),
  price: joi.number(),
});
export const updateProductSchema = joi.object({
  id: joi.string().custom(validateObgetId),
  title: joi.string().required().max(30).min(2),
  description: joi.string().required().max(2000).min(10),
  price: joi.number(),
});

export const getProductSchema = joi.object({
  id: joi.string().custom(validateObgetId),
});

export const getProductsSchema = joi.object({
  page: joi.number().positive().optional(),
  limit: joi.number().positive().optional(),
});
export const deleteProductSchame = joi.object({
  id: joi.string().custom(validateObgetId),
});
