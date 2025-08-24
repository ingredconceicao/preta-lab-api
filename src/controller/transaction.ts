import { Request, Response } from "express";

// Banco em memória (array local)
let transactions: any[] = [];

// Criar transação
export const createTransaction = (req: Request, res: Response) => {
  const { date, description, amount, type, category } = req.body;

  const newTransaction = {
    id: transactions.length + 1, 
    date,
    description,
    amount,
    type,
    category,
  };

  transactions.push(newTransaction);

  return res.status(201).json(newTransaction);
};


export const getTransactions = (req: Request, res: Response) => {
  return res.json(transactions);
};


export const getTransactionById = (req: Request, res: Response) => {
  const { id } = req.params;
  const transaction = transactions.find(t => t.id === Number(id));

  if (!transaction) {
    return res.status(404).json({ message: "Transação não encontrada" });
  }

  return res.json(transaction);
};

