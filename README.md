# Finanzas Personales

Aplicacion web de manejo de finanzas personales construida con Next.js 14, TypeScript y shadcn/ui.

## Getting Started

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

---

## Plan de Ejecucion Detallado

### 1. Arquitectura General del Proyecto

#### Estructura de carpetas

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Layout raiz con header y providers
│   ├── page.tsx                # Dashboard principal
│   └── globals.css             # Estilos globales (Tailwind + CSS variables shadcn)
│
├── components/                 # Componentes UI
│   ├── ui/                     # Componentes shadcn/ui (Card, Button, Input, etc.)
│   ├── dashboard/              # BalanceSummary
│   └── transactions/           # TransactionForm, TransactionList
│
├── lib/                        # Utilidades y configuracion
│   ├── utils.ts                # cn() helper para clases CSS
│   └── formatters.ts           # Formateo de moneda (ARS) y fechas
│
├── types/                      # Tipos TypeScript del dominio
│   └── transaction.ts          # Transaction, TransactionCreate, BalanceSummary
│
├── data/                       # Data layer (mocks -> API futura)
│   ├── categories.ts           # Catalogo de categorias con emojis
│   ├── repositories/           # Interfaz + implementacion mock
│   │   └── transaction.repository.ts
│   └── mock/
│       └── transactions.ts     # Datos semilla
│
├── services/                   # Logica de negocio (funciones puras)
│   └── transaction.service.ts  # calculateBalance()
│
└── store/                      # Estado global (Zustand)
    └── transaction.store.ts    # Store de transacciones
```

#### Separacion entre UI, dominio y data layer

| Capa        | Carpeta              | Responsabilidad                              |
|-------------|----------------------|----------------------------------------------|
| **UI**      | `components/`        | Renderizado, interaccion con el usuario       |
| **Dominio** | `services/`, `types/`| Logica de negocio, tipos, calculos financieros|
| **Data**    | `data/`              | Acceso a datos (mock hoy, API manana)         |
| **Estado**  | `store/`             | Estado global reactivo con Zustand            |

#### Estrategia para mocks y futura migracion a API real

El directorio `data/repositories/` define una **interfaz** (`TransactionRepository`) con metodos como `getAll()`, `create()`, `delete()`. La implementacion actual usa un array en memoria. Para migrar a un backend real, se reemplaza la implementacion por una que llame a una API REST/GraphQL **sin modificar ni UI ni servicios**.

---

### 2. Modelo de Datos Inicial

#### Entidad Transaction

```typescript
export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;        // ISO 8601 — serializable
  category: string;    // clave del catalogo de categorias
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
```

#### Catalogo de categorias

Cada categoria tiene un `value`, `label` y `emoji`:

| Emoji | Categoria       | Emoji | Categoria       |
|-------|-----------------|-------|-----------------|
| 💰    | Salario         | 👕    | Ropa            |
| 💻    | Freelance       | 🏥    | Salud           |
| 📈    | Inversiones     | 📚    | Educacion       |
| 🎁    | Regalo          | 🎓    | Cursos          |
| 🍔    | Comida          | 🏋️    | Gimnasio        |
| 🛒    | Supermercado    | 🐾    | Mascotas        |
| 🚗    | Transporte      | ✈️    | Viajes          |
| 🚕    | Uber            | 🏦    | Ahorro          |
| 🏠    | Vivienda        | 📌    | Otros           |
| 📡    | Servicios       | 🎬    | Entretenimiento |

---

### 3. Funcionalidades Minimas del MVP

- **Listado de transacciones** — Lista con categoria (emoji + label), descripcion, fecha y monto con color segun tipo
- **Alta de transaccion** — Formulario con tipo, monto, descripcion, categoria y fecha
- **Eliminacion de transaccion** — Boton de eliminar por cada fila
- **Filtro por tipo** — Botones pill "Todos", "Ingresos", "Gastos"
- **Calculo automatico de:**
  - Total ingresos
  - Total egresos
  - Balance final
- **UI clara con componentes reutilizables** basados en shadcn/ui

---

### 4. Estado y Manejo de Datos

#### Decision: Zustand

| Opcion      | Pros                                          | Contras                              |
|-------------|-----------------------------------------------|--------------------------------------|
| `useState`  | Simple                                        | No escala, prop drilling             |
| Context API | Nativo React                                  | Re-renders innecesarios, boilerplate |
| **Zustand** | Minimo boilerplate, selectores, persiste facil | Dependencia externa (3KB)            |

**Justificacion:**

- El store se puede hidratar desde mocks hoy y desde API manana
- Selectores evitan re-renders innecesarios
- Middleware `persist` permite localStorage gratis en el futuro
- Escala naturalmente a multiples stores (categorias, usuarios, reportes)

#### Separacion de logica de negocio

Los calculos financieros viven en `services/transaction.service.ts` como **funciones puras** (ej: `calculateBalance(transactions)`), completamente separadas del store y la UI.

---

### 5. Componentes UI Necesarios

| Componente          | Descripcion                                  | shadcn/ui utilizado                  |
|---------------------|----------------------------------------------|--------------------------------------|
| `BalanceSummary`    | 3 cards: ingresos, egresos, balance          | `Card`                               |
| `TransactionForm`   | Formulario de alta con validacion            | `Input`, `Select`, `Button`, `Label` |
| `TransactionList`   | Lista de transacciones con filtros           | `Card`, `Badge`, `Button`            |
| Layout (en `layout.tsx`) | Header con titulo, container principal  | —                                    |

#### Componentes base shadcn/ui creados

- `Card` (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- `Button` (variantes: default, destructive, outline, secondary, ghost, link)
- `Input`
- `Label`
- `Select`
- `Badge` (variantes: default, secondary, destructive, outline, income, expense)

---

### 6. Buenas Practicas

- **Tipado estricto** — `strict: true` en tsconfig, sin `any`
- **Funciones puras** — `calculateBalance(transactions)` no muta estado
- **Repository pattern** — Interfaz abstracta para data layer, facilita migracion a backend real
- **Componentes pequenos** — Single responsibility principle
- **Preparado para escalar** — Catalogo de categorias extensible, estructura de carpetas lista para agregar rutas, reportes, autenticacion
- **Codigo limpio** — Separacion clara de capas, imports con alias `@/*`

---

## Fases de Implementacion

### Fase 1 — Setup y estructura base ✅

- Proyecto Next.js 14 con TypeScript, Tailwind CSS, ESLint
- Configuracion de shadcn/ui (components.json, CSS variables, tailwind.config.ts)
- Estructura de carpetas (types, data, services, store, components)
- Tipos TypeScript (`Transaction`, `TransactionCreate`, `BalanceSummary`)
- Datos mock de transacciones
- Repository pattern con implementacion mock
- Zustand store con acciones (fetch, add, remove)
- Servicio de calculo de balance (funcion pura)

### Fase 2 — Logica de negocio y UI funcional ✅

- Componentes shadcn/ui base (Card, Button, Input, Label, Select, Badge)
- `BalanceSummary` — 3 cards con iconos, colores y montos formateados
- `TransactionForm` — Formulario con tipo, monto, descripcion, categoria y fecha
- `TransactionList` — Lista con badge de categoria (emoji), filtros por tipo (pill buttons)
- Pagina dashboard integrando los 3 componentes
- Layout con header y container

### Fase 3 — Mejoras visuales y optimizacion (pendiente)

- Pulido visual y responsive
- Optimizacion de rendimiento
- Limpieza general de codigo

---

## Escalabilidad futura

La arquitectura del MVP esta disenada para escalar sin reescritura a:

- **Manejo de categorias** — Catalogo ya implementado, listo para CRUD
- **Reportes mensuales** — Funciones puras en `services/` facilitan agregar calculos
- **Persistencia en base de datos** — Reemplazar implementacion del repository
- **Autenticacion de usuarios** — Agregar middleware y providers en el layout
- **Dashboard con graficos** — Agregar componentes en `components/dashboard/`
