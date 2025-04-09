"use client";

import { useState } from "react";
import { LoaderCircle, Trash2 } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/supabase";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Advertiser = Database["public"]["Tables"]["advertisers"]["Row"];

interface DeleteAdvertiserDialogProps {
  advertiser: Advertiser;
  onAdvertiserUpdate: () => void;
}

export function DeleteAdvertiserDialog({
  advertiser,
  onAdvertiserUpdate,
}: DeleteAdvertiserDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("advertisers")
        .delete()
        .eq("id", advertiser.id);

      if (error) throw error;
      setOpen(false);
      onAdvertiserUpdate();
    } catch (error) {
      console.error("Error deleting advertiser:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
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
            disabled={isLoading}
          >
            {isLoading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
