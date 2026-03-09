import { Product } from "@/lib/types";
import Image from "next/image";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-panel p-4 shadow-soft">
      <div className="relative mb-3 h-44 overflow-hidden rounded-xl">
        <Image src={product.image_url} alt={product.product_name} fill className="object-cover" />
      </div>
      <h3 className="text-base font-bold text-text">{product.product_name}</h3>
      <p className="text-sm text-muted">{product.brand}</p>
      <p className="mt-2 text-sm text-muted">{product.short_description}</p>
      <p className="mt-2 text-xs text-muted">Key Ingredients: {product.ingredients.join(", ")}</p>
      <a
        href={product.product_link}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90"
      >
        View Product
      </a>
    </article>
  );
}
