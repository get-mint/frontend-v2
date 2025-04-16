import { Suspense } from "react";
import { Search } from "lucide-react";

import { Metadata } from "next";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { CreateAdvertiser } from "./create-dialog";
import { Loader } from "@/components/loader";
import { AdvertisersContent } from "./content";

export const metadata: Metadata = {
  title: "Admin | Advertisers",
  description: "Manage all advertisers in the system",
};

export default async function AdvertisersPage({
  params,
}: {
  params: Promise<{ page: string; search: string }>;
}) {
  const { page, search } = await params;

  const currentPage = parseInt(page || "1", 10);
  const searchQuery = search || "";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Advertisers</h1>
        <CreateAdvertiser />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Advertisers</CardTitle>
          <CardDescription>
            View and manage all advertisers in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <form action="/admin/advertisers" method="GET">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  name="search"
                  placeholder="Search advertisers..."
                  className="pl-8"
                  defaultValue={searchQuery}
                />
                <input type="hidden" name="page" value="1" />
              </div>
            </form>
          </div>

          <div className="space-y-4">
            <Suspense fallback={<Loader />}>
              <AdvertisersContent
                page={currentPage}
                searchQuery={searchQuery}
              />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
