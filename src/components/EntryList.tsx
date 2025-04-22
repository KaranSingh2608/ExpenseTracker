
import React, { useState } from "react";
import { Entry } from "./types";
import { Edit, Trash } from "lucide-react";
import ExpenseForm from "./ExpenseForm";

interface EntryListProps {
  entries: Entry[];
  onDelete: (id: string) => void;
  onEdit: (id: string, updated: Omit<Entry, "id">) => void;
}

function formatAmount(entry: Entry) {
  return `$${entry.amount.toLocaleString()}`;
}

export default function EntryList({ entries, onDelete, onEdit }: EntryListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  if (!entries.length) {
    return (
      <div className="pt-12 text-gray-400 text-center">No entries yet. Start adding your expenses or income.</div>
    );
  }

  return (
    <ul className="w-full max-w-2xl mx-auto space-y-3 mt-6">
      {entries.map((entry) =>
        editingId === entry.id ? (
          <li key={entry.id} className="animate-scale-in">
            <ExpenseForm
              initial={entry}
              editing
              onSubmit={(updated) => {
                onEdit(entry.id, updated);
                setEditingId(null);
              }}
              onCancel={() => setEditingId(null)}
            />
          </li>
        ) : (
          <li
            key={entry.id}
            className={`flex items-center justify-between bg-white/90 shadow rounded-xl px-4 py-3 border border-gray-100 animate-fade-in`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block rounded-md px-2 py-1 text-xs font-bold ${
                    entry.type === "income"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {entry.type === "income" ? "INCOME" : "EXPENSE"}
                </span>
                <span className="font-medium text-lg text-gray-800 mr-2">{formatAmount(entry)}</span>
                <span className="text-xs text-gray-400">{entry.category}</span>
                <span className="text-xs text-gray-400 ml-2">{new Date(entry.date).toLocaleDateString()}</span>
              </div>
              {entry.description && (
                <div className="text-sm text-gray-500 mt-1 ml-1">{entry.description}</div>
              )}
            </div>
            <div className="flex-shrink-0 flex gap-2 ml-2">
              <button
                title="Edit"
                aria-label="Edit"
                onClick={() => setEditingId(entry.id)}
                className="p-2 rounded-md hover:bg-blue-100 text-blue-500 hover:text-blue-700 transition-all"
              >
                <Edit size={18} />
              </button>
              <button
                title="Delete"
                aria-label="Delete"
                onClick={() => onDelete(entry.id)}
                className="p-2 rounded-md hover:bg-red-100 text-red-500 hover:text-red-700 transition-all"
              >
                <Trash size={18} />
              </button>
            </div>
          </li>
        )
      )}
    </ul>
  );
}
