"use client";

import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/data/products";
import { Concern, Suitability } from "@/lib/types";
import { useMemo, useState } from "react";

const suitabilityOptions: Suitability[] = [
  "dry",
  "oily",
  "combination",
  "sensitive",
  "normal",
  "straight",
  "wavy",
  "curly",
  "coily",
  "dry-scalp",
  "oily-scalp",
  "balanced-scalp"
];

const concernOptions: Concern[] = ["acne", "hyperpigmentation", "dryness", "redness", "aging", "hair-fall", "dandruff", "frizz", "damage"];

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [suitability, setSuitability] = useState<Suitability | "all">("all");
  const [concern, setConcern] = useState<Concern | "all">("all");

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const textMatch = `${product.product_name} ${product.brand} ${product.ingredients.join(" ")}`.toLowerCase().includes(query.toLowerCase());
      const suitabilityMatch = suitability === "all" || product.suitable_for.includes(suitability);
      const concernMatch = concern === "all" || product.concerns.includes(concern);
      return textMatch && suitabilityMatch && concernMatch;
    });
  }, [query, suitability, concern]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold">Product Library</h1>
      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft md:grid-cols-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products or ingredients"
          className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-3"
        />
        <select value={suitability} onChange={(e) => setSuitability(e.target.value as Suitability | "all")} className="rounded-lg border border-slate-300 px-3 py-2">
          <option value="all">All Skin/Hair Types</option>
          {suitabilityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select value={concern} onChange={(e) => setConcern(e.target.value as Concern | "all")} className="rounded-lg border border-slate-300 px-3 py-2">
          <option value="all">All Concerns</option>
          {concernOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
}
