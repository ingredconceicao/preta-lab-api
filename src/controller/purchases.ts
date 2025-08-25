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

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const purchase = await purchaseService.getPurchase(id);
      return res.status(200).json(purchase);
    } catch (error: any) {
      if (error.message === "Purchase not found") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}