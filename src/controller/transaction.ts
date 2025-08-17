import { Request, Response } from "express";
import { transactionById } from "../service/transactionsService";

export const getTransactionById = (req: Request, res: Response) => {
  const transaction = transactionById(req.params.id);
  res.json({ transaction });
};
