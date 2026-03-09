export type Category = "skincare" | "haircare";

export type ProductType =
  | "cleanser"
  | "serum"
  | "moisturizer"
  | "sunscreen"
  | "treatment"
  | "shampoo"
  | "conditioner"
  | "hair-serum"
  | "hair-mask";

export type Suitability =
  | "dry"
  | "oily"
  | "combination"
  | "sensitive"
  | "normal"
  | "straight"
  | "wavy"
  | "curly"
  | "coily"
  | "dry-scalp"
  | "oily-scalp"
  | "balanced-scalp";

export type Concern =
  | "acne"
  | "hyperpigmentation"
  | "dryness"
  | "redness"
  | "aging"
  | "hair-fall"
  | "dandruff"
  | "frizz"
  | "damage";

export interface Product {
  product_id: string;
  product_name: string;
  brand: string;
  category: Category;
  product_type: ProductType;
  ingredients: string[];
  suitable_for: Suitability[];
  concerns: Concern[];
  price: number;
  rating: number;
  product_link: string;
  image_url: string;
  short_description: string;
}

export interface IngredientInfo {
  name: string;
  function: string;
  benefit: string;
  risk: "beneficial" | "neutral" | "potential-irritant";
}
