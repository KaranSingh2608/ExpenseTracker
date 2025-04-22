
import React, { useState } from "react";
import { Entry, EntryType } from "./types";

const categories = [
  { label: "Food", value: "Food" },
  { label: "Rent", value: "Rent" },
  { label: "Salary", value: "Salary" },
  { label: "Transport", value: "Transport" },
  { label: "Shopping", value: "Shopping" },
  { label: "Health", value: "Health" },
  { label: "Other", value: "Other" },
];

interface ExpenseFormProps {
  initial?: Partial<Entry>;
  onSubmit: (entry: Omit<Entry, "id">) => void;
  onCancel?: () => void;
  editing?: boolean;
}

export default function ExpenseForm({
  initial = {},
  onSubmit,
  onCancel,
  editing = false,
}: ExpenseFormProps) {
  const [type, setType] = useState<EntryType>(initial.type || "expense");
  const [amount, setAmount] = useState(initial.amount?.toString() || "");
  const [category, setCategory] = useState(initial.category || "");
  const [date, setDate] = useState(
    initial.date || new Date().toISOString().slice(0, 10)
  );
  const [description, setDescription] = useState(initial.description || "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!amount || !category) return;
    onSubmit({
      type,
      amount: Number(amount),
      category,
      date,
      description,
    });
    if (!editing) {
      setType("expense");
      setAmount("");
      setCategory("");
      setDate(new Date().toISOString().slice(0, 10));
      setDescription("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-3 items-end px-3"
    >
      <div>
        <label className="block text-xs font-medium mb-1">Type</label>
        <select
          className="rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-200 text-sm px-3 py-2 w-full bg-white/80"
          value={type}
          onChange={(e) => setType(e.target.value as EntryType)}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium mb-1">Amount</label>
        <input
          type="number"
          min="0"
          required
          step="0.01"
          className="rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-200 text-sm px-3 py-2 w-full bg-white/80"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-xs font-medium mb-1">Category</label>
        <select
          className="rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-200 text-sm px-3 py-2 w-full bg-white/80"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>
            Select
          </option>
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium mb-1">Date</label>
        <input
          type="date"
          className="rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-200 text-sm px-3 py-2 w-full bg-white/80"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-xs font-medium mb-1">Description</label>
        <input
          type="text"
          maxLength={44}
          className="rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-200 text-sm px-3 py-2 w-full bg-white/80"
          placeholder="Details (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="md:col-span-5 flex gap-3 mt-2">
        <button
          type="submit"
          className={`bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-lg px-6 py-2 font-semibold shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 flex-1`}
        >
          {editing ? "Update" : "Add"}
        </button>
        {editing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 rounded-lg px-6 py-2 font-semibold border border-gray-300 flex-1"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
