import { products } from "@/lib/data/products";
import { Concern, Product, Suitability } from "@/lib/types";

type SkinQuizAnswers = {
  afterWash: "tight" | "balanced" | "oily-fast";
  breakouts: "yes" | "no";
  visiblePores: "yes" | "no";
  shine: "yes" | "no";
  irritation: "yes" | "no";
};

type HairQuizAnswers = {
  oilyScalp: "yes" | "no";
  dandruff: "yes" | "no";
  hairFall: "yes" | "no";
  dryFrizzy: "yes" | "no";
  chemicallyTreated: "yes" | "no";
  hairPattern: "straight" | "wavy" | "curly" | "coily";
};

export function detectSkinType(answers: SkinQuizAnswers): Suitability {
  if (answers.irritation === "yes") return "sensitive";
  if (answers.afterWash === "tight" && answers.shine === "no") return "dry";
  if (answers.afterWash === "oily-fast" || (answers.shine === "yes" && answers.visiblePores === "yes")) return "oily";
  if (answers.afterWash === "balanced" && answers.shine === "yes") return "combination";
  return "normal";
}

export function detectSkinConcerns(answers: SkinQuizAnswers): Concern[] {
  const concerns: Concern[] = [];
  if (answers.breakouts === "yes") concerns.push("acne");
  if (answers.afterWash === "tight") concerns.push("dryness");
  if (answers.irritation === "yes") concerns.push("redness");
  if (answers.visiblePores === "yes" || answers.shine === "yes") concerns.push("hyperpigmentation");
  concerns.push("aging");
  return Array.from(new Set(concerns));
}

export function detectHairResults(answers: HairQuizAnswers): {
  hairType: Suitability;
  scalpType: Suitability;
  concerns: Concern[];
} {
  const scalpType: Suitability = answers.oilyScalp === "yes" ? "oily-scalp" : answers.dryFrizzy === "yes" ? "dry-scalp" : "balanced-scalp";
  const concerns: Concern[] = [];
  if (answers.hairFall === "yes") concerns.push("hair-fall");
  if (answers.dandruff === "yes") concerns.push("dandruff");
  if (answers.dryFrizzy === "yes") concerns.push("dryness", "frizz");
  if (answers.chemicallyTreated === "yes") concerns.push("damage");
  return {
    hairType: answers.hairPattern,
    scalpType,
    concerns: Array.from(new Set(concerns))
  };
}

export function recommendProducts(suitableFor: Suitability[], concerns: Concern[], types: Product["product_type"][]) {
  return types.map((type) => {
    const ranked = products
      .filter((product) => product.product_type === type)
      .map((product) => {
        const suitabilityScore = suitableFor.filter((x) => product.suitable_for.includes(x)).length * 3;
        const concernScore = concerns.filter((x) => product.concerns.includes(x)).length * 2;
        const ratingScore = product.rating;
        return { product, score: suitabilityScore + concernScore + ratingScore };
      })
      .sort((a, b) => b.score - a.score)
      .map((item) => item.product);

    return {
      type,
      products: ranked.slice(0, 2)
    };
  });
}
