"use client";

import { products } from "@/lib/data/products";
import { ProductType } from "@/lib/types";
import { useMemo, useState } from "react";

const compareTypes: ProductType[] = ["cleanser", "serum", "shampoo", "conditioner", "sunscreen"];

export default function ComparePage() {
  const [type, setType] = useState<ProductType>("cleanser");
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          p.product_type === type &&
          `${p.product_name} ${p.brand} ${p.ingredients.join(" ")}`.toLowerCase().includes(search.toLowerCase())
      ),
    [type, search]
  );

  const chosen = filtered.filter((p) => selected.includes(p.product_id));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold">Product Comparison Tool</h1>
      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft md:grid-cols-3">
        <select value={type} onChange={(e) => setType(e.target.value as ProductType)} className="rounded-lg border border-slate-300 px-3 py-2">
          {compareTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products or ingredients"
          className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => {
          const active = selected.includes(product.product_id);
          return (
            <button
              key={product.product_id}
              onClick={() =>
                setSelected((old) =>
                  old.includes(product.product_id) ? old.filter((id) => id !== product.product_id) : old.length < 3 ? [...old, product.product_id] : old
                )
              }
              className={`rounded-xl border p-4 text-left ${active ? "border-primary bg-primary/5" : "border-slate-200 bg-white"}`}
            >
              <p className="font-semibold">{product.product_name}</p>
              <p className="text-sm text-muted">{product.brand}</p>
            </button>
          );
        })}
      </div>

      {chosen.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-soft">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Key Ingredients</th>
                <th className="px-4 py-3">Skin/Hair Suitability</th>
                <th className="px-4 py-3">Rating</th>
              </tr>
            </thead>
            <tbody>
              {chosen.map((product) => (
                <tr key={product.product_id} className="border-t border-slate-200">
                  <td className="px-4 py-3">{product.product_name}</td>
                  <td className="px-4 py-3">{product.brand}</td>
                  <td className="px-4 py-3">INR {product.price}</td>
                  <td className="px-4 py-3">{product.ingredients.join(", ")}</td>
                  <td className="px-4 py-3">{product.suitable_for.join(", ")}</td>
                  <td className="px-4 py-3">{product.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
