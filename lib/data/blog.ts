export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  recommendedProductIds: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "best-cleanser-for-oily-skin",
    title: "Best Cleanser for Oily Skin",
    excerpt: "How to choose surfactants and active levels for balanced oil control.",
    content: [
      "For oily skin, choose a cleanser that removes excess sebum without stripping the barrier.",
      "Look for salicylic acid, zinc, and non-comedogenic formulas.",
      "Use twice daily and avoid over-cleansing that may trigger rebound oil."
    ],
    recommendedProductIds: ["sc-002", "sc-004", "sc-005"]
  },
  {
    slug: "best-sunscreen-for-acne-prone-skin",
    title: "Best Sunscreen for Acne Prone Skin",
    excerpt: "Filters, texture, and daily adherence for breakout-prone users.",
    content: [
      "Acne-prone skin benefits from lightweight, broad-spectrum SPF with non-greasy textures.",
      "Mineral filters may be preferable for highly reactive skin.",
      "Daily consistent use helps prevent post-acne pigmentation."
    ],
    recommendedProductIds: ["sc-005", "sc-004", "sc-003"]
  },
  {
    slug: "how-to-stop-hair-fall",
    title: "How to Stop Hair Fall",
    excerpt: "Scalp-first approach with cleansing cadence and targeted serums.",
    content: [
      "Hair fall management starts with scalp health and inflammation control.",
      "Use a mild shampoo, avoid high heat, and apply targeted serums.",
      "Persistent shedding should be evaluated by a dermatologist."
    ],
    recommendedProductIds: ["hc-004", "hc-002", "hc-005"]
  },
  {
    slug: "best-shampoo-for-dandruff",
    title: "Best Shampoo for Dandruff",
    excerpt: "Choosing anti-fungal actives and setting wash frequency.",
    content: [
      "Dandruff is frequently linked to Malassezia overgrowth and scalp inflammation.",
      "Ketoconazole and zinc pyrithione shampoos are evidence-supported options.",
      "Follow product-specific contact time and frequency instructions."
    ],
    recommendedProductIds: ["hc-006", "hc-001", "hc-003"]
  },
  {
    slug: "niacinamide-vs-vitamin-c",
    title: "Niacinamide vs Vitamin C",
    excerpt: "A practical guide to combining brightening ingredients safely.",
    content: [
      "Niacinamide supports barrier health and oil control, while Vitamin C targets oxidative stress and pigmentation.",
      "They can often be used together when formulas are well tolerated.",
      "Start with lower frequencies and increase gradually."
    ],
    recommendedProductIds: ["sc-004", "sc-003", "sc-005"]
  }
];
