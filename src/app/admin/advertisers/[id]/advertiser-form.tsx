"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/supabase";
import { sendFormattedMessage } from "@/lib/utils/discord";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

import { BasicInfoTab } from "./basic-info-tab";
import { AppearanceTab } from "./appearance-tab";
import { FinancialTab } from "./financial-tab";
import { AdvancedTab } from "./advanced-tab";

export type Advertiser = Database["public"]["Tables"]["advertisers"]["Row"];

export type Network = {
  id: string;
  name: string;
};

export type Currency = {
  id: string;
  name: string;
  acronym: string;
};

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  domain: z.string().min(1, "Domain is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  network_id: z.string().min(1, "Network is required"),
  currency_id: z.string().min(1, "Currency is required"),
  image_url: z.string().url().optional().or(z.literal("")),
  brand_hex_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Must be a valid hex color code (e.g. #FF0000)",
  }).optional().or(z.literal("")),
  up_to_pct: z.coerce.number().min(0).max(100).optional(),
  active: z.boolean().default(true),
});

export type FormValues = z.infer<typeof formSchema>;

interface AdvertiserFormProps {
  advertiserId: string;
  advertiser: Advertiser | null;
  networks: Network[];
  currencies: Currency[];
}

export function AdvertiserForm({ 
  advertiserId, 
  advertiser, 
  networks, 
  currencies 
}: AdvertiserFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [metadata, setMetadata] = useState<string>("");
  const supabase = createClient();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      domain: "",
      slug: "",
      description: "",
      network_id: "",
      currency_id: "",
      image_url: "",
      brand_hex_color: "",
      up_to_pct: undefined,
      active: true,
    },
  });

  useEffect(() => {
    if (advertiser) {
      setMetadata(advertiser.metadata ? JSON.stringify(advertiser.metadata, null, 2) : "");
      
      form.reset({
        name: advertiser.name,
        domain: advertiser.domain,
        slug: advertiser.slug,
        description: advertiser.description || "",
        network_id: advertiser.network_id || "",
        currency_id: advertiser.currency_id || "",
        image_url: advertiser.image_url || "",
        brand_hex_color: advertiser.brand_hex_color || "",
        up_to_pct: advertiser.up_to_pct || undefined,
        active: advertiser.active,
      });
    }
  }, [advertiser, form]);

  const onSubmit = async (values: FormValues) => {
    setIsSaving(true);
    try {
      let parsedMetadata = null;
      try {
        if (metadata.trim()) {
          parsedMetadata = JSON.parse(metadata);
        }
      } catch (e) {
        console.error("Invalid JSON in metadata:", e);
        toast.error("The metadata contains invalid JSON. Please correct it before saving.");
        setIsSaving(false);
        return;
      }

      const { error } = await supabase
        .from("advertisers")
        .update({
          ...values,
          metadata: parsedMetadata,
        })
        .eq("id", advertiserId);

      if (error) throw error;
      
      // Send webhook notification to Discord
      try {
        await sendFormattedMessage(
          "site",
          "update",
          "Advertiser Updated",
          `Advertiser "${values.name}" has been updated.`,
          [
            {
              name: "ID",
              value: advertiserId,
              inline: true
            },
            {
              name: "Domain",
              value: values.domain,
              inline: true
            },
            {
              name: "Status",
              value: values.active ? "Active" : "Inactive",
              inline: true
            }
          ]
        );
      } catch (webhookError) {
        console.error("Failed to send Discord notification:", webhookError);
        // Don't show error to user as the advertiser update was successful
      }
      
      toast.success("Advertiser updated successfully");
    } catch (error) {
      console.error("Error updating advertiser:", error);
      toast.error("Error updating advertiser");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs defaultValue="basic">
          <TabsList className="mb-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic">
            <BasicInfoTab form={form} />
          </TabsContent>
          
          <TabsContent value="appearance">
            <AppearanceTab form={form} />
          </TabsContent>
          
          <TabsContent value="financial">
            <FinancialTab form={form} networks={networks} currencies={currencies} />
          </TabsContent>
          
          <TabsContent value="advanced">
            <AdvancedTab metadata={metadata} setMetadata={setMetadata} />
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button 
            type="button"
            variant="outline" 
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
} 