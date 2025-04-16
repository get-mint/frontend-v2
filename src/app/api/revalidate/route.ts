import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    // Extract the tag to revalidate from the request
    const { tag } = await request.json();
    
    if (!tag) {
      return NextResponse.json(
        { error: "Missing revalidation tag" },
        { status: 400 }
      );
    }
    
    // Revalidate the tag
    revalidateTag(tag);
    
    return NextResponse.json({ success: true, revalidated: tag });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
} 