export interface Category {
  value: string;
  label: string;
  emoji: string;
}

export const categories: Category[] = [
  { value: "salario", label: "Salario", emoji: "💰" },
  { value: "freelance", label: "Freelance", emoji: "💻" },
  { value: "inversiones", label: "Inversiones", emoji: "📈" },
  { value: "regalo", label: "Regalo", emoji: "🎁" },
  { value: "comida", label: "Comida", emoji: "🍔" },
  { value: "supermercado", label: "Supermercado", emoji: "🛒" },
  { value: "transporte", label: "Transporte", emoji: "🚗" },
  { value: "uber", label: "Uber", emoji: "🚕" },
  { value: "vivienda", label: "Vivienda", emoji: "🏠" },
  { value: "servicios", label: "Servicios", emoji: "📡" },
  { value: "entretenimiento", label: "Entretenimiento", emoji: "🎬" },
  { value: "ropa", label: "Ropa", emoji: "👕" },
  { value: "salud", label: "Salud", emoji: "🏥" },
  { value: "educacion", label: "Educación", emoji: "📚" },
  { value: "cursos", label: "Cursos", emoji: "🎓" },
  { value: "gimnasio", label: "Gimnasio", emoji: "🏋️" },
  { value: "mascotas", label: "Mascotas", emoji: "🐾" },
  { value: "viajes", label: "Viajes", emoji: "✈️" },
  { value: "ahorro", label: "Ahorro", emoji: "🏦" },
  { value: "otros", label: "Otros", emoji: "📌" },
];

export function getCategoryByValue(value: string): Category {
  return categories.find((c) => c.value === value) ?? { value: "otros", label: "Otros", emoji: "📌" };
}
