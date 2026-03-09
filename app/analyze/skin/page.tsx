"use client";

import { ProductCard } from "@/components/ProductCard";
import { detectSkinConcerns, detectSkinType, recommendProducts } from "@/lib/recommendation";
import { Product } from "@/lib/types";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";

type SkinPayload = {
  afterWash: "tight" | "balanced" | "oily-fast";
  breakouts: "yes" | "no";
  visiblePores: "yes" | "no";
  shine: "yes" | "no";
  irritation: "yes" | "no";
};

type SkinResponse = {
  skinType: string;
  concerns: string[];
  routine: { type: string; products: Product[] }[];
};

const stepMap: Record<string, string> = {
  cleanser: "Cleanser",
  serum: "Serum",
  moisturizer: "Moisturizer",
  sunscreen: "Sunscreen",
  treatment: "Treatment"
};

export default function SkinAnalysisPage() {
  const [answers, setAnswers] = useState<SkinPayload>({
    afterWash: "balanced",
    breakouts: "no",
    visiblePores: "no",
    shine: "no",
    irritation: "no"
  });
  const [result, setResult] = useState<SkinResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const skinType = detectSkinType(answers);
    const concerns = detectSkinConcerns(answers);
    const routine = recommendProducts([skinType], concerns, ["cleanser", "serum", "moisturizer", "sunscreen", "treatment"]);
    setResult({ skinType, concerns, routine });
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold">Skin Analysis Quiz</h1>
      <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <Question
          label="How does your skin feel after washing?"
          value={answers.afterWash}
          onChange={(value) => setAnswers((s) => ({ ...s, afterWash: value as SkinPayload["afterWash"] }))}
          options={[
            ["tight", "Tight and dry"],
            ["balanced", "Balanced"],
            ["oily-fast", "Oily within a few hours"]
          ]}
        />
        <Binary
          label="Do you experience acne or breakouts?"
          value={answers.breakouts}
          onChange={(value) => setAnswers((s) => ({ ...s, breakouts: value }))}
        />
        <Binary
          label="Are your pores visible?"
          value={answers.visiblePores}
          onChange={(value) => setAnswers((s) => ({ ...s, visiblePores: value }))}
        />
        <Binary
          label="Does your skin become shiny during the day?"
          value={answers.shine}
          onChange={(value) => setAnswers((s) => ({ ...s, shine: value }))}
        />
        <Binary
          label="Do you experience irritation from skincare products?"
          value={answers.irritation}
          onChange={(value) => setAnswers((s) => ({ ...s, irritation: value }))}
        />
        <button type="submit" className="w-fit rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white">
          {loading ? "Analyzing..." : "Get My Skin Results"}
        </button>
      </form>

      {result && (
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm text-muted">Detected Skin Type</p>
            <h2 className="text-2xl font-bold capitalize">{result.skinType}</h2>
            <p className="mt-2 text-sm text-muted">Detected Concerns: {result.concerns.join(", ")}</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold">Recommended Routine</h3>

            <RoutineBlock
              title="Morning Routine"
              steps={[
                ["cleanser", "Step 1"],
                ["serum", "Step 2"],
                ["moisturizer", "Step 3"],
                ["sunscreen", "Step 4"]
              ]}
              routine={result.routine}
            />
            <RoutineBlock
              title="Night Routine"
              steps={[
                ["cleanser", "Step 1"],
                ["treatment", "Step 2"],
                ["moisturizer", "Step 3"]
              ]}
              routine={result.routine}
            />
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

function RoutineBlock({
  title,
  steps,
  routine
}: {
  title: string;
  steps: [string, string][];
  routine: { type: string; products: Product[] }[];
}) {
  return (
    <section className="space-y-3">
      <h4 className="text-lg font-bold">{title}</h4>
      {steps.map(([type, stepNo]) => {
        const item = routine.find((r) => r.type === type);
        if (!item) return null;
        return (
          <div key={`${title}-${type}`} className="space-y-2">
            <p className="text-sm font-semibold">
              {stepNo} {stepMap[type]}
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {item.products.map((product) => (
                <ProductCard key={`${title}-${product.product_id}`} product={product} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
