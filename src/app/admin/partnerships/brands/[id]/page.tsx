import { createAdminClient } from "@/lib/supabase/server/client";
import { Tables } from "@/types/supabase";
import { notFound } from "next/navigation";
import { BrandForm } from "./brand-form";

export const dynamic = "force-dynamic";

async function fetchBrand(id: string) {
  const supabase = createAdminClient();
  
  // Get the brand with its network and currency
  const { data: brand, error } = await supabase
    .from("brands")
    .select("*")
    .eq("id", id)
    .single();
    
  if (error || !brand) {
    return null;
  }
  
  return brand as Tables<"brands">;
}

async function fetchNetworks() {
  const supabase = createAdminClient();
  
  const { data, error } = await supabase
    .from("networks")
    .select("*")
    .order("name");
    
  if (error) return [];
  
  return data as Tables<"networks">[];
}

async function fetchCurrencies() {
  const supabase = createAdminClient();
  
  const { data, error } = await supabase
    .from("currencies")
    .select("*")
    .order("name");
    
  if (error) return [];
  
  return data as Tables<"currencies">[];
}

async function fetchBrandCategories() {
  const supabase = createAdminClient();
  
  const { data, error } = await supabase
    .from("brand_categories")
    .select("*")
    .order("name");
    
  if (error) return [];
  
  return data as Tables<"brand_categories">[];
}

async function fetchBrandCategoriesForBrand(brandId: string) {
  const supabase = createAdminClient();
  
  const { data, error } = await supabase
    .from("brands_categories")
    .select("brand_category_id")
    .eq("brand_id", brandId);
    
  if (error) return [];
  
  return data.map(item => item.brand_category_id);
}

export default async function BrandPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const brand = await fetchBrand(id);
  
  if (!brand) {
    notFound();
  }
  
  const networks = await fetchNetworks();
  const currencies = await fetchCurrencies();
  const categories = await fetchBrandCategories();
  const brandCategoryIds = await fetchBrandCategoriesForBrand(id);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Edit Brand: {brand.name}</h1>
        <a 
          href="/admin/partnerships/brands"
          className="px-4 py-2 text-sm font-medium rounded-md text-primary bg-primary/10 hover:bg-primary/20"
        >
          Back to Brands
        </a>
      </div>
      
      <BrandForm 
        brand={brand} 
        networks={networks} 
        currencies={currencies} 
        categories={categories}
        selectedCategoryIds={brandCategoryIds}
      />
    </div>
  );
} 