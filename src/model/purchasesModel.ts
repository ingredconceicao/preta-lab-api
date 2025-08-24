import { Schema, model, Document, Types } from "mongoose";

interface Item {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Purchase extends Document {
  _id: Types.ObjectId; 
  date: Date;
  total: number;
  items: Item[];
}

const itemSchema = new Schema<Item>({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const purchaseSchema = new Schema<Purchase>({
  date: { type: Date, default: Date.now },
  total: { type: Number, required: true },
  items: { type: [itemSchema], required: true },
});



export const purchaseModel = model<Purchase>("Purchase", purchaseSchema);
