import Link from "next/link";
import { blogPosts } from "@/lib/data/blog";

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold">DermaCompare Blog</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {blogPosts.map((post) => (
          <article key={post.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-semibold text-primary">
              Read article
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
