"use client";

import { ProductCard } from "@/components/ProductCard";
import { detectHairResults, recommendProducts } from "@/lib/recommendation";
import { Product } from "@/lib/types";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";

type HairPayload = {
  oilyScalp: "yes" | "no";
  dandruff: "yes" | "no";
  hairFall: "yes" | "no";
  dryFrizzy: "yes" | "no";
  chemicallyTreated: "yes" | "no";
  hairPattern: "straight" | "wavy" | "curly" | "coily";
};

type HairResponse = {
  hairType: string;
  scalpType: string;
  concerns: string[];
  routine: { type: string; products: Product[] }[];
};

export default function HairAnalysisPage() {
  const [answers, setAnswers] = useState<HairPayload>({
    oilyScalp: "no",
    dandruff: "no",
    hairFall: "no",
    dryFrizzy: "no",
    chemicallyTreated: "no",
    hairPattern: "straight"
  });
  const [result, setResult] = useState<HairResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const analysis = detectHairResults(answers);
    const routine = recommendProducts([analysis.hairType, analysis.scalpType], analysis.concerns, ["shampoo", "conditioner", "hair-serum", "hair-mask"]);
    setResult({ ...analysis, routine });
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold">Hair Analysis Quiz</h1>
      <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <Binary label="Does your scalp become oily quickly?" value={answers.oilyScalp} onChange={(value) => setAnswers((s) => ({ ...s, oilyScalp: value }))} />
        <Binary label="Do you experience dandruff?" value={answers.dandruff} onChange={(value) => setAnswers((s) => ({ ...s, dandruff: value }))} />
        <Binary label="Do you experience hair fall?" value={answers.hairFall} onChange={(value) => setAnswers((s) => ({ ...s, hairFall: value }))} />
        <Binary label="Is your hair dry or frizzy?" value={answers.dryFrizzy} onChange={(value) => setAnswers((s) => ({ ...s, dryFrizzy: value }))} />
        <Binary
          label="Is your hair chemically treated or colored?"
          value={answers.chemicallyTreated}
          onChange={(value) => setAnswers((s) => ({ ...s, chemicallyTreated: value }))}
        />
        <Question
          label="What is your natural hair pattern?"
          value={answers.hairPattern}
          onChange={(value) => setAnswers((s) => ({ ...s, hairPattern: value as HairPayload["hairPattern"] }))}
          options={[
            ["straight", "Straight"],
            ["wavy", "Wavy"],
            ["curly", "Curly"],
            ["coily", "Coily"]
          ]}
        />
        <button type="submit" className="w-fit rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white">
          {loading ? "Analyzing..." : "Get My Hair Results"}
        </button>
      </form>

      {result && (
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm text-muted">Detected Hair Type</p>
            <h2 className="text-2xl font-bold capitalize">{result.hairType}</h2>
            <p className="mt-1 text-sm text-muted">Scalp Type: {result.scalpType}</p>
            <p className="mt-1 text-sm text-muted">Detected Concerns: {result.concerns.join(", ") || "None"}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Weekly Hair Routine</h3>
            {result.routine.map((step, idx) => (
              <div key={step.type} className="space-y-2">
                <p className="text-sm font-semibold capitalize">
                  Step {idx + 1}: {step.type.replace("-", " ")}
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  {step.products.map((product) => (
                    <ProductCard key={product.product_id} product={product} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}

function Question({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <label className="text-sm">
      <span className="mb-1 block font-semibold text-text">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
        {options.map(([val, labelText]) => (
          <option key={val} value={val}>
            {labelText}
          </option>
        ))}
      </select>
    </label>
  );
}

function Binary({ label, value, onChange }: { label: string; value: "yes" | "no"; onChange: (v: "yes" | "no") => void }) {
  return (
    <Question
      label={label}
      value={value}
      onChange={(v) => onChange(v as "yes" | "no")}
      options={[
        ["yes", "Yes"],
        ["no", "No"]
      ]}
    />
  );
}
