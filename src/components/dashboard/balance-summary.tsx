"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactionStore } from "@/store/transaction.store";
import { calculateBalance } from "@/services/transaction.service";
import { formatCurrency } from "@/lib/formatters";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

export function BalanceSummary() {
  const transactions = useTransactionStore((state) => state.transactions);

  const { totalIncome, totalExpenses, balance } = useMemo(
    () => calculateBalance(transactions),
    [transactions]
  );

  const cards = [
    {
      title: "Ingresos",
      value: totalIncome,
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Egresos",
      value: totalExpenses,
      icon: TrendingDown,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Balance",
      value: balance,
      icon: Wallet,
      color: balance >= 0 ? "text-emerald-600" : "text-red-600",
      bgColor: balance >= 0 ? "bg-emerald-50" : "bg-red-50",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {card.title}
            </CardTitle>
            <div className={`rounded-full p-2 ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${card.color}`}>
              {formatCurrency(card.value)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
