import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server/client";
import { isUserAdmin } from "@/lib/supabase/server/auth";
import { SupabaseClient } from "@supabase/supabase-js";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createAdminClient();
    
    // Get the Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }
    
    // Extract the token
    const token = authHeader.replace('Bearer ', '');
    
    // Verify the session
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Invalid session", details: authError?.message },
        { status: 401 }
      );
    }
    
    // For security - verify the user is an admin
    const isAdmin = await isUserAdmin(supabase, user.id);
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }
    
    const brandId = id;
    const body = await request.json();
    
    console.log("API: Updating brand", brandId, "with data:", body);
    
    // Handle partial updates (only one field)
    if (body.field && body.value !== undefined) {
      const fieldName = body.field;
      const value = body.value;
      
      // Special handling for categories
      if (fieldName === "categories") {
        await updateCategories(supabase, brandId, value);
        return NextResponse.json({ 
          success: true, 
          message: "Categories updated successfully",
          field: fieldName
        });
      }
      
      // Update a single field
      const { error } = await supabase
        .from("brands")
        .update({ [fieldName]: value })
        .eq("id", brandId);
      
      if (error) {
        console.error(`Error updating field ${fieldName}:`, error);
        return NextResponse.json(
          { error: `Failed to update ${fieldName}: ${error.message}` },
          { status: 500 }
        );
      }
      
      return NextResponse.json({ 
        success: true,
        message: `${fieldName} updated successfully`,
        field: fieldName
      });
    }
    
    // Handle full brand update (all fields at once)
    else {
      // Only update valid fields
      const validFields = ["name", "domain", "description", "slug", "color", 
        "image_url", "network_id", "currency_id", "priority", "is_enabled"];
      
      const updateData: Record<string, any> = {};
      
      validFields.forEach(field => {
        if (body[field] !== undefined) {
          updateData[field] = body[field];
        }
      });
      
      // Update brand data
      const { error: updateError } = await supabase
        .from("brands")
        .update(updateData)
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
        await updateCategories(supabase, brandId, body.categories);
      }
      
      return NextResponse.json({ 
        success: true,
        message: "Brand updated successfully"
      });
    }
  } catch (error) {
    console.error("Error handling brand update:", error);
    return NextResponse.json(
      { error: "Something went wrong", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

async function updateCategories(
  supabase: SupabaseClient,
  brandId: string | number,
  categoryIds: number[]
) {
  // First delete all existing category associations
  const { error: deleteError } = await supabase
    .from("brands_categories")
    .delete()
    .eq("brand_id", brandId);
  
  if (deleteError) {
    console.error("Error deleting brand categories:", deleteError);
    throw deleteError;
  }
  
  // Skip if no categories to add
  if (!categoryIds || categoryIds.length === 0) return;
  
  // Add new category associations
  const categoriesData = categoryIds.map((categoryId: number) => ({
    brand_id: Number(brandId),
    brand_category_id: Number(categoryId),
  }));
  
  const { error: insertError } = await supabase
    .from("brands_categories")
    .insert(categoriesData);
  
  if (insertError) {
    console.error("Error inserting brand categories:", insertError);
    throw insertError;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createAdminClient();
    
    // Get the Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }
    
    // Extract the token
    const token = authHeader.replace('Bearer ', '');
    
    // Verify the session
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Invalid session", details: authError?.message },
        { status: 401 }
      );
    }
    
    // For security - verify the user is an admin
    const isAdmin = await isUserAdmin(supabase, user.id);
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }
    
    const brandId = id;
    
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
    
    const categoryIds = brandCategories.map(item => item.brand_category_id);
    
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