import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  title: string;
  amount: number;
  type: "income" | "expense";
  createdAt: Date;
}

const TransactionSchema: Schema = new Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Transaction = mongoose.model<ITransaction>("Transaction", TransactionSchema);
