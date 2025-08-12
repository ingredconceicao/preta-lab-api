import express from "express";
import { getTransactionById } from "./controller/transaction";

const app = express();

app.get("/transactions/:id", (req, res) => getTransactionById(req, res));

export default app;