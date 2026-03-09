import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/data/blog";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/ProductCard";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) notFound();

  const recs = products.filter((product) => post.recommendedProductIds.includes(product.product_id));

  return (
    <article className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-extrabold">{post.title}</h1>
        <p className="mt-2 text-muted">{post.excerpt}</p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        {post.content.map((paragraph) => (
          <p key={paragraph} className="mb-3 leading-7 text-muted">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold">Recommended Products</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recs.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      </section>
    </article>
  );
}
