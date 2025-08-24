import request from "supertest";
import mongoose from "mongoose";
import app from "../../../src/app";
import { purchaseModel } from "../../../src/model/purchasesModel";

describe("Purchase API - /checkout", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await purchaseModel.deleteMany({});
  });

  it("should create a purchase successfully", async () => {
    const response = await request(app)
      .post("/checkout")
      .send({
        items: [
          { productId: "1", name: "Mouse Gamer", price: 200, quantity: 2 },
          { productId: "2", name: "Headset", price: 400, quantity: 1 },
        ],
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.total).toBe(800);
  });

});
