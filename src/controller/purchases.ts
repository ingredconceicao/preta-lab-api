import { Request, Response } from "express";
import { PurchasesService } from "../service/purchasesService";

const purchaseService = new PurchasesService();

export class PurchaseController {
  static async checkout(req: Request, res: Response) {
    try {
      const result = await purchaseService.createPurchase(req.body);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
