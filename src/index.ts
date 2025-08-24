import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./database/MongoConnection";

dotenv.config();

if (process.env.NODE_ENV !== "test") {
  console.log("⏳ Conectando ao MongoDB Atlas...");
  connectDB();
}


if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
}

export default app;



