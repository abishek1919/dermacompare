import { detectHairResults, recommendProducts } from "@/lib/recommendation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const analysis = detectHairResults(body);
  const routine = recommendProducts([analysis.hairType, analysis.scalpType], analysis.concerns, [
    "shampoo",
    "conditioner",
    "hair-serum",
    "hair-mask"
  ]);

  return NextResponse.json({
    ...analysis,
    routine
  });
}
