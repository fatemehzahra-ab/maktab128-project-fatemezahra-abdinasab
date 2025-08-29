import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderProduct {
  product: Schema.Types.ObjectId;
  count: number;
}
export interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  products: IOrderProduct[];
  totalPrice: number;
  deliveryDate: Date;
  deliveryStatus: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user is required"],
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "products.product is required"],
        },
        count: { type: Number, required: [true, "products.count is required"] },
      },
    ],
    totalPrice: { type: Number, default: 0 },
    deliveryDate: {
      type: Date,
      default: () => {
        const now = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(now.getDate() + 1);
        return tomorrow;
      },
    },
    deliveryStatus: { type: Boolean, default: false },
  },
  { timestamps: true }
);

OrderSchema.pre("save", async function (next) {
  let total = 0;
  const doc = this as any;
  const { products } = await doc.populate("products.product", { price: 1 });
  for (const { product, count } of products) {
    total += product.price * count;
  }
  doc.totalPrice = total;
  next();
});

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
