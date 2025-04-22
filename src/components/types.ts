
export type EntryType = "income" | "expense";

export interface Entry {
  id: string;
  type: EntryType;
  amount: number;
  category: string;
  date: string; // ISO string
  description: string;
}
