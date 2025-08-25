import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./database/MongoConnection";

dotenv.config();
const PORT = process.env.PORT || 8080;

async function startServer() {
  if (process.env.NODE_ENV !== "test") {
    console.log("⏳ Conectando ao MongoDB Atlas...");
    await connectDB();
  }

  if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  }
}

startServer();
export default app;




