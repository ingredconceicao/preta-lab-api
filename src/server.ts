import app from "./app";
import { connectDB } from "../src/database/MongoConnection";


async function startServer() {
  try {
    await connectDB();
    console.log("✅ Database connected!");
    app.listen( () => {
      console.log(`Server is running on port`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();