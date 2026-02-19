"use client";

import { BalanceSummary } from "@/components/dashboard/balance-summary";
import { TransactionForm } from "@/components/transactions/transaction-form";
import { TransactionList } from "@/components/transactions/transaction-list";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Dashboard
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Resumen de tus finanzas personales
        </p>
      </div>
      <BalanceSummary />
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <TransactionForm />
        </div>
        <div className="lg:col-span-3">
          <TransactionList />
        </div>
      </div>
    </div>
  );
}
