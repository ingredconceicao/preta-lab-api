import request from "supertest";
import mongoose from "mongoose";
import app from "../../../src/app";
import { purchaseModel } from "../../../src/model/purchasesModel";

describe("Purchase API - /checkout", () => {
  beforeAll(async () => {
    
    const mongoAtlasURI = process.env.MONGO_URI;
    if (!mongoAtlasURI) {
      throw new Error("MONGO_ATLAS_URI não está definida nas variáveis de ambiente.");
    }

   
    await mongoose.connect(mongoAtlasURI);
    console.log("Conectado ao MongoDB Atlas para testes.");
  });

  afterAll(async () => {
   
    await mongoose.connection.close();
    console.log("Conexão com MongoDB Atlas fechada.");
  });

  beforeEach(async () => {
 
    await purchaseModel.deleteMany({});
  });

  it("should create a purchase successfully and calculate the correct total", async () => {
    const purchaseData = {
      items: [
        { productId: "1", name: "Mouse Gamer", price: 200, quantity: 2 },
        { productId: "2", name: "Headset", price: 400, quantity: 1 },
      ],
    };

    const expectedTotal =
      purchaseData.items[0].price * purchaseData.items[0].quantity +
      purchaseData.items[1].price * purchaseData.items[1].quantity;

    const response = await request(app).post("/checkout").send(purchaseData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(mongoose.Types.ObjectId.isValid(response.body.id)).toBe(true);
    expect(response.body.total).toBe(expectedTotal);
  });
});

