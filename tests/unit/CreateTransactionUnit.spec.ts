import { createTransaction } from "../../src/controller/transaction";

describe("createTransaction", () => {
  it("should create a transaction and return 201", () => {
    const mockReq: any = {
      body: {
        date: "2024-08-07T10:00:00Z",
        description: "Create",
        amount: 100,
        type: "income",
        category: "Salário",
      },
    };

    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    createTransaction(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(Number),
        description: "Create",
        amount: 100,
      })
    );
  });
});

