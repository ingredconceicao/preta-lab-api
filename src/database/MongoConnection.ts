import mongoose from "mongoose";

export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "", {
      dbName: "financeApp",
    });
    console.log("✅ Conectado ao MongoDB Atlas!");
  } catch (err) {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
    process.exit(1);
  }
};