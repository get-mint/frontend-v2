"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Editor from "@monaco-editor/react";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  metadata: z.string().optional().refine((val) => {
    if (!val) return true;
    try {
      JSON.parse(val);
      return true;
    } catch {
      return false;
    }
  }, "Must be valid JSON"),
});

type FormValues = z.infer<typeof formSchema>;

type Advertiser = Database["public"]["Tables"]["advertisers"]["Row"];

interface MetadataDialogProps {
  advertiser: Advertiser;
  onMetadataUpdate: (metadata: string) => void;
  trigger?: React.ReactNode;
}

export function MetadataDialog({
  advertiser,
  onMetadataUpdate,
  trigger,
}: MetadataDialogProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(
    advertiser.metadata ? JSON.stringify(advertiser.metadata, null, 2) : ""
  );

  const handleSave = () => {
    onMetadataUpdate(value);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Edit Metadata</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-3xl" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Edit Metadata</DialogTitle>
          <DialogDescription>
            Edit the advertiser's metadata in JSON format.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="h-[400px] w-full rounded-md border border-input">
            <Editor
              height="100%"
              defaultLanguage="json"
              theme="vs-dark"
              value={value}
              onChange={(val) => setValue(val || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: "on",
              }}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 