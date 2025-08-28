import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import app from "../../../src/app";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  
  await mongoose.connect(uri);
}, 30000); 

afterEach(async () => {
  
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Purchase API - GET /checkout/:id", () => {
  it("should return a purchase by ID with all correct properties", async () => {
    
    const purchase = await mongoose.connection
      .collection("purchases")
      .insertOne({
        items: [{ name: "Book", price: 50 }],
        date: new Date(),
      });

    const response = await request(app).get(`/checkout/${purchase.insertedId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.items[0]).toHaveProperty("name", "Book");
    expect(response.body.items[0]).toHaveProperty("price", 50);
  });

  it("should return 404 and a specific message if the purchase is not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/checkout/${fakeId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Purchase not found");
  });

  it("should return 400 for an invalid ID format", async () => {
    const response = await request(app).get(`/checkout/invalid-id`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid ID format");
  });
});

