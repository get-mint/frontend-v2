"use client";

import { useRouter } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function BrandsPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    const url = `/brands?${params.toString()}`;

    router.push(url, { scroll: false });

    setTimeout(() => {
      const brandsTitle = document.querySelector(".brands-title");
      if (brandsTitle) {
        brandsTitle.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center mt-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <button
              onClick={() => navigateToPage(Math.max(1, currentPage - 1))}
              className={`${
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }`}
              aria-label="Previous page"
            >
              <PaginationPrevious />
            </button>
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <button
                onClick={() => navigateToPage(page)}
                className="w-full h-full"
                aria-label={`Page ${page}`}
              >
                <PaginationLink isActive={currentPage === page}>
                  {page}
                </PaginationLink>
              </button>
            </PaginationItem>
          ))}

          <PaginationItem>
            <button
              onClick={() =>
                navigateToPage(Math.min(totalPages, currentPage + 1))
              }
              className={`${
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
              aria-label="Next page"
            >
              <PaginationNext />
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
