import request from "supertest";
import app from "../../src/app";

describe("GET /transactions/:id", () => {
  it("should return transaction data", async () => {
    const res = await request(app).get("/transactions/1");
    expect(res.status).toBe(200);
  });
});