"use client";

import { BalanceSummary } from "@/components/dashboard/balance-summary";
import { TransactionForm } from "@/components/transactions/transaction-form";
import { TransactionList } from "@/components/transactions/transaction-list";

export default function Home() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <BalanceSummary />
      <TransactionForm />
      <TransactionList />
    </div>
  );
}
