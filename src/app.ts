import express from "express";
import { createTransaction, getTransactionById, getTransactions } from "./controller/transaction";
import { PurchaseController} from "./controller/purchases";
import { connectDB } from "./database/MongoConnection";
import dotenv from "dotenv";


const app = express();
app.use(express.json());
dotenv.config();

if (process.env.NODE_ENV !== "test") {
  connectDB();
}

app.post("/checkout", PurchaseController.checkout);
app.post("/transactions", createTransaction);
app.get("/transactions", getTransactions);
app.get("/transactions/:id", getTransactionById);

app.get("/checkout/:id", PurchaseController.getById);
app.post("/checkout", PurchaseController.checkout);


export default app;



