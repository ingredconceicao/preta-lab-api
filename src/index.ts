import dotenv from "dotenv";
import app from "./app";
import { connectMongo } from "./database/MongoConnection";

dotenv.config();

const PORT = process.env.PORT || 3000;

console.log("⏳ Conectando ao MongoDB Atlas...");

connectMongo();

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
