import { PurchasesService } from "../../../src/service/purchasesService";
import { purchaseModel } from "../../../src/model/purchasesModel";

jest.mock("../../../src/model/purchasesModel");

describe("PurchaseService - Unit", () => {
  let purchaseService: PurchasesService;

  beforeEach(() => {
    jest.clearAllMocks();
    purchaseService = new PurchasesService();
  });

  it("should calculate total and return purchase data", async () => {
    const items = [
      { productId: "1", name: "Mouse Gamer", price: 200, quantity: 2 },
      { productId: "2", name: "Headset", price: 400, quantity: 1 },
    ];

    const mockPurchase = {
      _id: "mocked_id",
      date: new Date(),
      total: 800,
      items,
    };

    
    (purchaseModel.create as jest.Mock).mockResolvedValue(mockPurchase);

    const result = await purchaseService.createPurchase({ items });

    expect(purchaseModel.create).toHaveBeenCalledWith({
      items,
      total: 800,
      date: expect.any(Date),
    });

    expect(result).toEqual({
      id: "mocked_id",
      date: mockPurchase.date,
      total: 800,
      items,
    });
  });
});
