"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactionStore } from "@/store/transaction.store";
import { TransactionType } from "@/types/transaction";
import { categories } from "@/data/categories";
import { Plus, Check } from "lucide-react";

export function TransactionForm() {
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("otros");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (!description.trim() || isNaN(parsedAmount) || parsedAmount <= 0) return;

    setIsSubmitting(true);
    await addTransaction({
      type,
      amount: parsedAmount,
      description: description.trim(),
      date,
      category,
    });

    setAmount("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
    setCategory("otros");
    setType("expense");
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg">Nueva Transaccion</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Tipo</Label>
            <Select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as TransactionType)}
            >
              <option value="expense">Egreso</option>
              <option value="income">Ingreso</option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Monto</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripcion</Label>
            <Input
              id="description"
              placeholder="Ej: Supermercado"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.emoji} {cat.label}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Fecha</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {showSuccess ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Agregada
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Agregar
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
