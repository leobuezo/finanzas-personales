import { create } from "zustand";
import { Transaction, TransactionCreate } from "@/types/transaction";
import { mockTransactionRepository } from "@/data/repositories/transaction.repository";

interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  fetchTransactions: () => Promise<void>;
  addTransaction: (data: TransactionCreate) => Promise<void>;
  removeTransaction: (id: string) => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  isLoading: false,
  error: null,

  fetchTransactions: async () => {
    set({ isLoading: true, error: null });
    try {
      const transactions = await mockTransactionRepository.getAll();
      set({ transactions, isLoading: false });
    } catch {
      set({ error: "Error al cargar transacciones", isLoading: false });
    }
  },

  addTransaction: async (data: TransactionCreate) => {
    set({ error: null });
    try {
      await mockTransactionRepository.create(data);
      const transactions = await mockTransactionRepository.getAll();
      set({ transactions });
    } catch {
      set({ error: "Error al crear transacción" });
    }
  },

  removeTransaction: async (id: string) => {
    set({ error: null });
    try {
      await mockTransactionRepository.delete(id);
      const transactions = await mockTransactionRepository.getAll();
      set({ transactions });
    } catch {
      set({ error: "Error al eliminar transacción" });
    }
  },
}));
