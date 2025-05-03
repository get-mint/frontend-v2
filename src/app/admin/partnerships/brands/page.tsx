import { createAdminClient } from "@/lib/supabase/server/client";
import { Tables } from "@/types/supabase";
import { BrandsPagination } from "./pagination";
import { BrandsFilters } from "./filters";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const dynamic = "force-dynamic";

const BRANDS_PER_PAGE = 20;

interface FetchBrandsParams {
  page?: number;
  search?: string;
  networkId?: string;
  currencyId?: string;
}

async function fetchBrands({
  page = 1,
  search,
  networkId,
  currencyId,
}: FetchBrandsParams) {
  const supabase = createAdminClient();
  
  const start = (page - 1) * BRANDS_PER_PAGE;
  const end = start + BRANDS_PER_PAGE - 1;
  
  let query = supabase
    .from("brands")
    .select("*", { count: "exact" })
    .order("name", { ascending: true });
  
  // Apply filters if provided
  if (search) {
    query = query.ilike("name", `%${search}%`);
  }
  
  if (networkId && networkId !== "all") {
    query = query.eq("network_id", networkId);
  }
  
  if (currencyId && currencyId !== "all") {
    query = query.eq("currency_id", currencyId);
  }
  
  // Apply pagination
  query = query.range(start, end);
  
  const { data, error, count } = await query;
    
  if (error) throw error;
  
  return {
    brands: data as Tables<"brands">[],
    totalCount: count || 0,
  };
}

export default async function BrandsPage({ 
  searchParams,
}: { 
  searchParams: { 
    page?: string;
    search?: string;
    network?: string;
    currency?: string;
  };
}) {
  const currentPage = Number(searchParams.page) || 1;
  
  const { brands, totalCount } = await fetchBrands({
    page: currentPage,
    search: searchParams.search,
    networkId: searchParams.network,
    currencyId: searchParams.currency,
  });
  
  const totalPages = Math.ceil(totalCount / BRANDS_PER_PAGE);
  
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Brands</h1>
      
      <BrandsFilters />
      
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="py-4 text-base">Name</TableHead>
            <TableHead className="py-4 text-base">Domain</TableHead>
            <TableHead className="py-4 text-base">Description</TableHead>
            <TableHead className="py-4 text-base">Priority</TableHead>
            <TableHead className="py-4 text-base">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brands.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No brands found. Try adjusting your filters.
              </TableCell>
            </TableRow>
          ) : (
            brands.map((brand) => (
              <TableRow 
                key={brand.id} 
                style={{
                  backgroundColor: brand.color ? `${brand.color}10` : undefined,
                  borderLeft: brand.color
                    ? `4px solid ${brand.color}`
                    : undefined,
                  height: "80px"
                }}
                className="hover:bg-muted/20"
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    {brand.image_url && (
                      <div 
                        className="flex items-center justify-center w-12 h-12 rounded-md"
                        style={{ backgroundColor: brand.color || '#f0f0f0' }}
                      >
                        <img 
                          src={brand.image_url} 
                          alt={`${brand.name} logo`} 
                          className="object-contain w-8 h-8"
                        />
                      </div>
                    )}
                    <span className="text-lg font-medium">{brand.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <span className="text-sm font-medium">{brand.domain}</span>
                </TableCell>
                <TableCell className="max-w-md py-4 truncate">
                  <p className="line-clamp-2 text-muted-foreground">
                    {brand.description}
                  </p>
                </TableCell>
                <TableCell className="py-4">{brand.priority}</TableCell>
                <TableCell className="py-4">
                  <a 
                    href={`/admin/partnerships/brands/${brand.id}`}
                    className="text-primary hover:underline font-medium"
                  >
                    Edit
                  </a>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      {totalPages > 1 && (
        <BrandsPagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
