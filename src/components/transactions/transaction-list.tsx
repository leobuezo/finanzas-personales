"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTransactionStore } from "@/store/transaction.store";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { Trash2, ClipboardList, TrendingUp, TrendingDown, SearchX } from "lucide-react";
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
        <CardContent className="flex items-center justify-center p-12">
          <p className="text-muted-foreground">Cargando transacciones...</p>
        </CardContent>
      </Card>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-2 p-12">
          <ClipboardList className="h-10 w-10 text-muted-foreground/50" />
          <p className="text-center text-muted-foreground">
            No hay transacciones registradas.
          </p>
          <p className="text-center text-sm text-muted-foreground/70">
            Agrega una nueva para comenzar.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-col gap-4 space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-lg">Transacciones</CardTitle>
        <div className="flex items-center gap-1 self-start rounded-full border p-1 sm:self-auto">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                activeFilter === filter.value
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <filter.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              {filter.label}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {filteredTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-8">
            <SearchX className="h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              No hay {activeFilter === "income" ? "ingresos" : "gastos"} registrados.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredTransactions.map((transaction) => {
              const cat = getCategoryByValue(transaction.category);
              return (
                <div
                  key={transaction.id}
                  className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50 sm:gap-4 sm:p-4"
                >
                  <Badge
                    variant="secondary"
                    className="hidden w-32 shrink-0 justify-center gap-1 sm:inline-flex"
                  >
                    <span>{cat.emoji}</span>
                    {cat.label}
                  </Badge>
                  <span className="text-lg sm:hidden">{cat.emoji}</span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-sm sm:text-base">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      <span className="sm:hidden">{cat.label} · </span>
                      {formatDate(transaction.date)}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <span
                      className={`text-sm font-semibold sm:text-base ${
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
                      className="h-7 w-7 text-muted-foreground hover:text-destructive sm:h-8 sm:w-8"
                    >
                      <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
