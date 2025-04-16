"use client";

import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface AdvertisersPaginationProps {
  currentPage: number;
  totalPages: number;
  searchQuery?: string;
}

export function AdvertisersPagination({
  currentPage,
  totalPages,
  searchQuery = "",
}: AdvertisersPaginationProps) {
  const getPageUrl = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (searchQuery) {
      params.set("search", searchQuery);
    }
    return `/admin/advertisers?${params.toString()}`;
  };

  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Link 
            href={getPageUrl(Math.max(1, currentPage - 1))}
            passHref
            legacyBehavior
          >
            <PaginationPrevious
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </Link>
        </PaginationItem>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <Link 
              href={getPageUrl(page)}
              passHref
              legacyBehavior
            >
              <PaginationLink isActive={currentPage === page}>
                {page}
              </PaginationLink>
            </Link>
          </PaginationItem>
        ))}
        
        <PaginationItem>
          <Link 
            href={getPageUrl(Math.min(totalPages, currentPage + 1))}
            passHref
            legacyBehavior
          >
            <PaginationNext
              className={
                currentPage === totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </Link>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
