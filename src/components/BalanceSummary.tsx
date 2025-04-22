
import React from "react";
import { Entry } from "./types";

interface BalanceSummaryProps {
  entries: Entry[];
}

export default function BalanceSummary({ entries }: BalanceSummaryProps) {
  const income = entries
    .filter((e) => e.type === "income")
    .reduce((acc, cur) => acc + cur.amount, 0);
  const expenses = entries
    .filter((e) => e.type === "expense")
    .reduce((acc, cur) => acc + cur.amount, 0);
  const balance = income - expenses;

  return (
    <div className="w-full max-w-2xl mx-auto grid grid-cols-3 gap-6 bg-white/70 shadow-lg rounded-xl py-6 mb-8 animate-fade-in">
      <div className="flex flex-col items-center">
        <span className="text-xs uppercase tracking-wide text-gray-500">Income</span>
        <span className="text-2xl font-bold text-green-600">${income.toLocaleString()}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xs uppercase tracking-wide text-gray-500">Expenses</span>
        <span className="text-2xl font-bold text-red-500">${expenses.toLocaleString()}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xs uppercase tracking-wide text-gray-500">Balance</span>
        <span
          className={`text-2xl font-bold ${
            balance >= 0 ? "text-green-700" : "text-red-700"
          }`}
        >
          ${balance.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
