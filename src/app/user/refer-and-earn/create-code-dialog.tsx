"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";
import { Tables } from "@/types/supabase";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const codeSchema = z.object({
  code: z
    .string()
    .min(3, "Code must be at least 3 characters")
    .max(20, "Code must be less than 20 characters")
    .regex(/^[A-Z0-9]+$/, "Code can only contain uppercase letters and numbers")
    .transform(val => val.toUpperCase()),
});

type FormValues = z.infer<typeof codeSchema>;

export default function CreateCodeDialog({
  affiliate,
  onCodeCreated,
  existingCodesCount,
}: {
  affiliate: Tables<"affiliates">;
  onCodeCreated: () => void;
  existingCodesCount: number;
}) {
  const [open, setOpen] = useState(false);
  const [codeExists, setCodeExists] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: "",
    },
  });

  const watchCode = form.watch("code");

  useEffect(() => {
    const checkCodeExists = async () => {
      if (!watchCode || watchCode.length < 3) return;
      
      // Convert to uppercase for comparison
      const upperCode = watchCode.toUpperCase();
      
      setIsChecking(true);
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from("affiliate_codes")
        .select("id")
        .eq("code", upperCode)
        .limit(1);
      
      setIsChecking(false);
      setCodeExists(!!data?.length);
      
      if (data?.length) {
        form.setError("code", { 
          type: "manual", 
          message: "This code already exists" 
        });
      } else {
        form.clearErrors("code");
      }
    };

    const timeoutId = setTimeout(checkCodeExists, 500);
    return () => clearTimeout(timeoutId);
  }, [watchCode, form]);

  const onSubmit = async (values: FormValues) => {
    if (existingCodesCount >= 3) {
      toast.error("You can only have up to 3 referral codes.");
      return;
    }

    if (codeExists) {
      form.setError("code", { 
        type: "manual", 
        message: "This code already exists" 
      });
      return;
    }

    setIsSubmitting(true);
    const supabase = createClient();
    
    // Convert to uppercase before inserting
    const upperCode = values.code.toUpperCase();
    
    const { data, error } = await supabase
      .from("affiliate_codes")
      .insert([
        {
          affiliate_id: affiliate.id,
          code: upperCode,
        },
      ])
      .select();

    setIsSubmitting(false);
    
    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(`Your referral code "${upperCode}" has been created.`);
    
    form.reset();
    setOpen(false);
    onCodeCreated();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={existingCodesCount >= 3}>
          {existingCodesCount >= 3 ? "Max Codes Reached" : "Generate Code"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Referral Code</DialogTitle>
          <DialogDescription>
            Create a unique referral code for others to use. You can have up to 3 codes.
            Codes will be automatically converted to uppercase.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Referral Code</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter a unique code" 
                      {...field} 
                      className={codeExists ? "border-red-500" : ""}
                      // Convert display to uppercase as they type
                      onChange={(e) => {
                        // Filter out non-alphanumeric characters
                        const filtered = e.target.value.replace(/[^A-Za-z0-9]/g, '');
                        field.onChange(filtered.toUpperCase());
                      }}
                      value={field.value}
                    />
                  </FormControl>
                  {isChecking && <p className="text-xs text-muted-foreground">Checking availability...</p>}
                  {codeExists && <p className="text-xs text-red-500">This code already exists</p>}
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="submit" 
                disabled={isSubmitting || codeExists || existingCodesCount >= 3}
              >
                {isSubmitting ? "Creating..." : "Create Code"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 