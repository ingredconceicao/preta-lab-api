import { PurchasesService } from "../../../src/service/purchasesService";
import { purchaseModel } from "../../../src/model/purchasesModel";

jest.mock("../../../src/model/purchasesModel");

describe("PurchaseService - GetPurchase (Unit)", () => {
  let purchaseService: PurchasesService;

  beforeEach(() => {
    jest.clearAllMocks();
    purchaseService = new PurchasesService();
  });

  it("should return purchase data on getPurchase", async () => {
    const items = [
      { productId: "1", name: "Mouse Gamer", price: 200, quantity: 2 },
    ];

    const mockPurchase = {
      _id: "mocked_id",
      date: new Date(),
      total: 400,
      items,
    };

    (purchaseModel.findById as jest.Mock).mockResolvedValue(mockPurchase);

    const result = await purchaseService.getPurchase("mocked_id");

    expect(purchaseModel.findById).toHaveBeenCalledWith("mocked_id");
    expect(result).toEqual({
      id: "mocked_id",
      date: mockPurchase.date,
      total: 400,
      items,
    });
  });

  it("should throw error if purchase not found", async () => {
    (purchaseModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(purchaseService.getPurchase("invalid_id")).rejects.toThrow("Purchase not found");
  });
});
