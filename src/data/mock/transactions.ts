import { Transaction } from "@/types/transaction";

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "income",
    amount: 350000,
    description: "Salario mensual",
    date: "2025-02-01",
    category: "salario",
  },
  {
    id: "2",
    type: "expense",
    amount: 45000,
    description: "Alquiler",
    date: "2025-02-03",
    category: "vivienda",
  },
  {
    id: "3",
    type: "expense",
    amount: 12000,
    description: "Supermercado",
    date: "2025-02-05",
    category: "supermercado",
  },
  {
    id: "4",
    type: "income",
    amount: 80000,
    description: "Freelance diseño web",
    date: "2025-02-10",
    category: "freelance",
  },
  {
    id: "5",
    type: "expense",
    amount: 8500,
    description: "Streaming y servicios",
    date: "2025-02-12",
    category: "servicios",
  },
  {
    id: "6",
    type: "expense",
    amount: 15000,
    description: "Uber mensual",
    date: "2025-02-15",
    category: "uber",
  },
];
