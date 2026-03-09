import { mythsVsFacts } from "@/lib/data/education";

export default function MythsFactsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold">Myths vs Facts</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {mythsVsFacts.map((entry) => (
          <article key={entry.myth} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-wide text-risk">Myth</p>
            <p className="mt-1 font-semibold">{entry.myth}</p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-ok">Fact</p>
            <p className="mt-1 text-sm text-muted">{entry.fact}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
