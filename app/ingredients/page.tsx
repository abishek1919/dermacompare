"use client";

import { ingredients } from "@/lib/data/ingredients";
import { useMemo, useState } from "react";

const riskStyles = {
  beneficial: "bg-ok/10 text-ok",
  neutral: "bg-warn/10 text-warn",
  "potential-irritant": "bg-risk/10 text-risk"
};

const riskLabel = {
  beneficial: "Green - beneficial",
  neutral: "Yellow - neutral",
  "potential-irritant": "Red - potential irritant"
};

export default function IngredientsPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(
    () => ingredients.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold">Ingredient Analyzer</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search ingredients (e.g., Niacinamide, Retinol)"
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {results.map((ingredient) => (
          <article key={ingredient.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-xl font-bold">{ingredient.name}</h2>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${riskStyles[ingredient.risk]}`}>{riskLabel[ingredient.risk]}</span>
            </div>
            <p className="mt-3 text-sm text-muted">
              <span className="font-semibold text-text">Function:</span> {ingredient.function}
            </p>
            <p className="mt-1 text-sm text-muted">
              <span className="font-semibold text-text">Skin or Hair Benefit:</span> {ingredient.benefit}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
