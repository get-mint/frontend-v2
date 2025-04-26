"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Trash2 } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { Tables } from "@/types/supabase";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Advertiser = Tables<"brands">;

interface DeleteAdvertiserDialogProps {
  advertiser: Advertiser;
  onAdvertiserUpdate: () => void;
}

export function DeleteAdvertiserDialog({
  advertiser,
  onAdvertiserUpdate,
}: DeleteAdvertiserDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const supabase = createClient();

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        const { error } = await supabase
          .from("brands")
          .delete()
          .eq("id", advertiser.id);

        if (error) throw error;
        
        // Attempt to revalidate cache
        try {
          await fetch(`/api/revalidate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tag: 'advertisers' }),
          });
        } catch (revalidateError) {
          console.error("Failed to revalidate:", revalidateError);
        }
        
        setOpen(false);
        onAdvertiserUpdate();
      } catch (error) {
        console.error("Error deleting advertiser:", error);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Advertiser</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {advertiser.name}? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending && (
              <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
            )}
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
