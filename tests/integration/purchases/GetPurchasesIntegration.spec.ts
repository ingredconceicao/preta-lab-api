import request from "supertest";
import mongoose from "mongoose";
import app from "../../../src/app";
import { purchaseModel } from "../../../src/model/purchasesModel";

describe("Purchase API - GET /checkout/:id", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await purchaseModel.deleteMany({});
  });

  it("should return a purchase by ID", async () => {
    
    const purchase = await purchaseModel.create({
      items: [
        { productId: "1", name: "Mouse Gamer", price: 200, quantity: 2 },
      ],
      total: 400,
      date: new Date(),
    });

    const response = await request(app).get(`/checkout/${purchase._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", purchase._id.toString());
    expect(response.body.total).toBe(400);
    expect(response.body.items.length).toBe(1);
    expect(response.body.items[0].name).toBe("Mouse Gamer");
  });

 it("should return 404 if purchase not found", async () => {
  const fakeId = new mongoose.Types.ObjectId();
  const response = await request(app).get(`/checkout/${fakeId}`);

  expect(response.status).toBe(404);
  expect(response.body).toHaveProperty("message", "Purchase not found");
});
});
