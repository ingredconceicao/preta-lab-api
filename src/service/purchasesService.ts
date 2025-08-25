import { purchaseModel } from "../model/purchasesModel";

export class PurchasesService {
  async createPurchase(data: {
    items: { productId: string; name: string; price: number; quantity: number }[];
  }): Promise<any> {
    const total = data.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const purchase = await purchaseModel.create({
      items: data.items,
      total,
      date: new Date()
    });

    return {
      id: purchase._id.toString(),
      date: purchase.date,
      total: purchase.total,
      items: purchase.items
    };
  }
}
