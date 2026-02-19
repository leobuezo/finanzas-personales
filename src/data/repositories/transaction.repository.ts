import { Transaction, TransactionCreate } from "@/types/transaction";
import { mockTransactions } from "@/data/mock/transactions";

export interface TransactionRepository {
  getAll(): Promise<Transaction[]>;
  create(data: TransactionCreate): Promise<Transaction>;
  delete(id: string): Promise<void>;
}

let transactions: Transaction[] = [...mockTransactions];

export const mockTransactionRepository: TransactionRepository = {
  async getAll(): Promise<Transaction[]> {
    return [...transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  },

  async create(data: TransactionCreate): Promise<Transaction> {
    const newTransaction: Transaction = {
      ...data,
      id: crypto.randomUUID(),
    };
    transactions = [newTransaction, ...transactions];
    return newTransaction;
  },

  async delete(id: string): Promise<void> {
    transactions = transactions.filter((t) => t.id !== id);
  },
};
