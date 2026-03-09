import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/80">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 text-sm text-muted sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="font-semibold text-text">DermaCompare</div>
        <Link href="/analyze/skin">Skin Care</Link>
        <Link href="/analyze/hair">Hair Care</Link>
        <Link href="/ingredients">Ingredient Library</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/about">About</Link>
      </div>
    </footer>
  );
}
