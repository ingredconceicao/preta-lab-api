/*import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ Conectado ao MongoDB Atlas");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB", error);
    process.exit(1);
  }
};*/

import mongoose from "mongoose";

export const connectDB= async () => {

  if (process.env.NODE_ENV === "test") {
    console.log("🧪 Ignorando conexão com MongoDB em ambiente de teste");
    return;
  }

  try {
    const uri = process.env.MONGO_URI as string;

    if (!uri) {
      throw new Error("⚠️ MONGO_URI não foi definido no .env");
    }

    await mongoose.connect(uri);
    console.log("✅ Conectado ao MongoDB Atlas");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB Atlas:", error);
    process.exit(1);
  }
};
