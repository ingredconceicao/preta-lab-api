import dotenv from "dotenv";
import app from "./app";
import { connectMongo } from "./database/MongoConnection";
import { createTransaction, getTransactionById, getTransactions } from "./controller/transaction";

dotenv.config();

const PORT = process.env.PORT || 3000;

console.log("⏳ Conectando ao MongoDB Atlas...");

connectMongo();

app.post("/transactions", createTransaction);
app.get("/transactions", getTransactions);
app.get("/transactions",getTransactionById);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
