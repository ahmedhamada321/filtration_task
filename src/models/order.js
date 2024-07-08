import { Schema, model, Types } from "mongoose";

const orderSchema = new Schema(
  {
    products: [
      {
        productId: {
          type: Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],

    totalAmount: { type: Number, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Order = model("Order", orderSchema);
