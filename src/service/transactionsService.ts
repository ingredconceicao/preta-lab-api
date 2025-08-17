import { transactions } from "../data";

export type Transaction ={
  id:string;
  date: string;
  description:string;
  amount: number;
  type: "income"|"expense";
  category: string;
};

export const transactionById = (id: string): Transaction | null => {
  return transactions.find((transaction) => transaction.id === id) ?? null;
};

export const createTransaction = (transaction: Transaction): Transaction =>{
  transactions.push(transaction);
  return transaction
}
