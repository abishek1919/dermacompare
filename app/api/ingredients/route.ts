import { ingredients } from "@/lib/data/ingredients";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(ingredients);
}
