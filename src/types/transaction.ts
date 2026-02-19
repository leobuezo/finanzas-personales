export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  category: string;
}

export interface TransactionCreate {
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  category: string;
}

export interface BalanceSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}
