import { detectSkinConcerns, detectSkinType, recommendProducts } from "@/lib/recommendation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const skinType = detectSkinType(body);
  const concerns = detectSkinConcerns(body);
  const routine = recommendProducts([skinType], concerns, ["cleanser", "serum", "moisturizer", "sunscreen", "treatment"]);

  return NextResponse.json({
    skinType,
    concerns,
    routine
  });
}
