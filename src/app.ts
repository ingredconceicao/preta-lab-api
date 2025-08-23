import express from "express";
import { createTransaction, getTransactionById, getTransactions } from "./controller/transaction";

const app = express();
app.use(express.json());


app.post("/transactions", createTransaction);
app.get("/transactions", getTransactions);
app.get("/transactions/:id", getTransactionById);

export default app;



