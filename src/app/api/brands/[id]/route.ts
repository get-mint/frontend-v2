import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server/client";
import { isUserAdmin } from "@/lib/supabase/server/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is admin
    const supabase = createAdminClient();
    const isAdmin = await isUserAdmin(supabase);
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const brandId = params.id;
    const body = await request.json();
    
    // Update brand data
    const { error: updateError } = await supabase
      .from("brands")
      .update({
        name: body.name,
        domain: body.domain,
        description: body.description,
        slug: body.slug,
        color: body.color,
        image_url: body.image_url,
        network_id: body.network_id,
        currency_id: body.currency_id,
        priority: body.priority,
        is_enabled: body.is_enabled,
      })
      .eq("id", brandId);
    
    if (updateError) {
      console.error("Error updating brand:", updateError);
      return NextResponse.json(
        { error: `Failed to update brand: ${updateError.message}` },
        { status: 500 }
      );
    }
    
    // Handle categories if provided
    if (body.categories) {
      // First delete existing category associations
      const { error: deleteError } = await supabase
        .from("brands_categories")
        .delete()
        .eq("brand_id", brandId);
      
      if (deleteError) {
        console.error("Error deleting brand categories:", deleteError);
        return NextResponse.json(
          { error: "Failed to update brand categories" },
          { status: 500 }
        );
      }
      
      // Then add new associations if any
      if (body.categories && body.categories.length > 0) {
        const categoriesData = body.categories.map((categoryId: number) => ({
          brand_id: Number(brandId),
          brand_category_id: Number(categoryId),
        }));
        
        console.log("Inserting categories:", categoriesData);
        
        const { error: insertError } = await supabase
          .from("brands_categories")
          .insert(categoriesData);
        
        if (insertError) {
          console.error("Error inserting brand categories:", insertError);
          return NextResponse.json(
            { error: "Failed to add brand categories" },
            { status: 500 }
          );
        }
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error handling brand update:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createAdminClient();
    
    // Check if user is admin
    const isAdmin = await isUserAdmin(supabase);
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const brandId = params.id;
    
    // Get the brand with its network and currency
    const { data: brand, error } = await supabase
      .from("brands")
      .select("*, networks(*), currencies(*)")
      .eq("id", brandId)
      .single();
    
    if (error) {
      console.error("Error fetching brand:", error);
      return NextResponse.json(
        { error: "Brand not found" },
        { status: 404 }
      );
    }
    
    // Get the brand categories
    const { data: brandCategories, error: categoriesError } = await supabase
      .from("brands_categories")
      .select("brand_category_id")
      .eq("brand_id", brandId);
    
    if (categoriesError) {
      console.error("Error fetching brand categories:", categoriesError);
      return NextResponse.json(
        { error: "Failed to fetch brand categories" },
        { status: 500 }
      );
    }
    
    const categoryIds = brandCategories.map((item) => item.brand_category_id);
    
    return NextResponse.json({
      ...brand,
      category_ids: categoryIds,
    });
  } catch (error) {
    console.error("Error fetching brand:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
} 