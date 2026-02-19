"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTransactionStore } from "@/store/transaction.store";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { Trash2, ClipboardList, TrendingUp, TrendingDown } from "lucide-react";
import { TransactionType } from "@/types/transaction";
import { getCategoryByValue } from "@/data/categories";

type FilterType = "all" | TransactionType;

const filters: { value: FilterType; label: string; icon: React.ElementType }[] = [
  { value: "all", label: "Todos", icon: ClipboardList },
  { value: "income", label: "Ingresos", icon: TrendingUp },
  { value: "expense", label: "Gastos", icon: TrendingDown },
];

export function TransactionList() {
  const { transactions, isLoading, fetchTransactions, removeTransaction } =
    useTransactionStore();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const filteredTransactions = useMemo(
    () =>
      activeFilter === "all"
        ? transactions
        : transactions.filter((t) => t.type === activeFilter),
    [transactions, activeFilter]
  );

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            Cargando transacciones...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            No hay transacciones registradas. Agregá una nueva para comenzar.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg">Transacciones</CardTitle>
        <div className="flex items-center gap-1 rounded-full border p-1">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                activeFilter === filter.value
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <filter.icon className="h-3.5 w-3.5" />
              {filter.label}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="w-36 justify-center gap-1">
                  <span>{getCategoryByValue(transaction.category).emoji}</span>
                  {getCategoryByValue(transaction.category).label}
                </Badge>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(transaction.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`font-semibold ${
                    transaction.type === "income"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTransaction(transaction.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
