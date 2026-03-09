import Link from "next/link";
import { quickScienceFacts, rotatingTips } from "@/lib/data/education";
import { TipCarousel } from "@/components/TipCarousel";

const features = [
  "Skin Type Analyzer",
  "Hair Care Analyzer",
  "Product Ingredient Analysis",
  "Product Comparison Engine",
  "Personalized Routine Generator"
];

export default function HomePage() {
  return (
    <div className="space-y-10 pb-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft sm:p-12">
        <p className="mb-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Science-led personalization</p>
        <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">
          Find the Right Skin and Hair Care Products for Your Unique Biology
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
          Answer a few questions and get personalized product recommendations based on your skin type, hair type, and concerns.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/analyze/skin" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white">
            Analyze My Skin
          </Link>
          <Link href="/analyze/hair" className="rounded-xl border border-primary px-5 py-3 text-sm font-semibold text-primary">
            Analyze My Hair
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {features.map((feature) => (
          <div key={feature} className="rounded-2xl border border-slate-200 bg-panel p-4 text-sm font-semibold text-text shadow-soft">
            {feature}
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 text-2xl font-bold">Education Center</h2>
          <TipCarousel tips={rotatingTips} />
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">Quick Science Facts</h2>
          {quickScienceFacts.map((fact) => (
            <div key={fact} className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-muted">
              {fact}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-2xl font-bold">Myths vs Facts</h2>
        <p className="mt-2 text-sm text-muted">Evidence-based clarifications for common skincare and haircare misconceptions.</p>
        <Link href="/myths-facts" className="mt-4 inline-block text-sm font-semibold text-primary">
          Explore myths and facts
        </Link>
      </section>
    </div>
  );
}
