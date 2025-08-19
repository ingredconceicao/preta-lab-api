import { Request, Response } from "express";
import { transactionById } from "../service/transactionsService";
import { Transaction } from "../model/modelTransaction";


export const getTransactionById = (req: Request, res: Response) => {
  const transaction = transactionById(req.params.id);
  res.json({ transaction });
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { title, amount, type } = req.body;
    const transaction = new Transaction({ title, amount, type });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar transação", error });
  }
};


export const getTransactions = async (_req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar transações", error });
  }
};
