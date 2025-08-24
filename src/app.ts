import express from "express";
import { createTransaction, getTransactionById, getTransactions } from "./controller/transaction";
import { connectDB } from "./database/MongoConnection";
import dotenv from "dotenv";


const app = express();
app.use(express.json());
dotenv.config();

connectDB();

app.post("/transactions", createTransaction);
app.get("/transactions", getTransactions);
app.get("/transactions/:id", getTransactionById);

export default app;



