"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LoaderCircle, ExternalLink, Trash2 } from "lucide-react";

import { Tables } from "@/types/supabase";
import { DeleteAdvertiserDialog } from "./delete-dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

type Advertiser = Tables<"brands"> & {
  network?: { name: string };
  currency?: { acronym: string };
};

interface AdvertisersTableProps {
  advertisers: Advertiser[];
  toggleActiveAction: (formData: FormData) => Promise<void>;
}

export function AdvertisersTable({
  advertisers,
  toggleActiveAction,
}: AdvertisersTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRowClick = (id: string) => {
    router.push(`/admin/advertisers/${id}`);
  };

  const handleToggleActive = (id: string, currentActive: boolean) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("active", String(currentActive));

    startTransition(() => {
      toggleActiveAction(formData).then(() => {
        router.refresh();
      });
    });
  };

  const handleUpdate = () => {
    router.refresh();
  };

  if (advertisers.length === 0) {
    return (
      <div className="py-6 text-center text-muted-foreground">
        No advertisers found
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Domain</TableHead>
          <TableHead>Network</TableHead>
          <TableHead>Currency</TableHead>
          <TableHead>Cashback</TableHead>
          <TableHead>Brand Color</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {advertisers.map((advertiser) => (
          <TableRow
            key={advertiser.id}
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => handleRowClick(advertiser.id.toString())}
          >
            <TableCell onClick={(e) => e.stopPropagation()}>
              {advertiser.image_url && (
                <div
                  className={`flex items-center justify-center p-3 rounded-md ${
                    !advertiser.color ? "border" : ""
                  }`}
                  style={
                    advertiser.color
                      ? { backgroundColor: advertiser.color }
                      : undefined
                  }
                >
                  <img
                    src={advertiser.image_url}
                    alt={advertiser.name}
                    className="object-contain w-auto h-8"
                  />
                </div>
              )}
            </TableCell>
            <TableCell className="font-medium">{advertiser.name}</TableCell>
            <TableCell>{advertiser.domain}</TableCell>
            <TableCell>{advertiser.network?.name || "N/A"}</TableCell>
            <TableCell>{advertiser.currency?.acronym || "N/A"}</TableCell>
            <TableCell>
              {advertiser.max_pct_reward ? `Up to ${advertiser.max_pct_reward}%` : "N/A"}
            </TableCell>
            <TableCell>
              {advertiser.color ? (
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: advertiser.color }}
                  ></div>
                  <span className="text-xs">{advertiser.color}</span>
                </div>
              ) : (
                "N/A"
              )}
            </TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
              <div className="relative">
                <Switch checked={advertiser.is_enabled} disabled={true} />
              </div>
            </TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/admin/advertisers/${advertiser.id}`);
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <DeleteAdvertiserDialog
                  advertiser={advertiser}
                  onAdvertiserUpdate={handleUpdate}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
