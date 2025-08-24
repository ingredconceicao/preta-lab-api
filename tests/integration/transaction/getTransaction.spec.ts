import request from "supertest";
import app from "../../../src/app";

describe("Integration Test - Transactions", () => {
  it("should return a transaction by ID with status 200", async () => {

    const newTransaction = {
      id: "123",
      date: "2024-07-28T14:45:12Z",
      description: "Compra de notebook",
      amount: 3500,
      type: "expense",
      category: "eletronicos"
    };

    await request(app).post("/transactions").send(newTransaction);

   
    const response = await request(app).get(`/transactions/${newTransaction.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(newTransaction);
  });

  it("should return 404 if transaction not found", async () => {
    const response = await request(app).get("/transactions/nao-existe");
    
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});
