"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tables } from "@/types/supabase";
import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils/tailwind";
import { Checkbox } from "@/components/ui/checkbox";

interface BrandFormProps {
  brand: Tables<"brands">;
  networks: Tables<"networks">[];
  currencies: Tables<"currencies">[];
  categories: Tables<"brand_categories">[];
  selectedCategoryIds: number[];
}

const brandSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  domain: z.string().min(3, "Domain must be at least 3 characters"),
  description: z.string().optional().nullable(),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  color: z.string().min(1, "Color is required").optional().nullable(),
  image_url: z.string().url("Must be a valid URL").optional().nullable(),
  network_id: z.coerce.number({
    required_error: "Please select a network",
  }),
  currency_id: z.coerce.number({
    required_error: "Please select a currency",
  }),
  priority: z.coerce.number().min(0),
  is_enabled: z.boolean().default(true),
  categories: z.array(z.number()).optional(),
});

type BrandFormValues = z.infer<typeof brandSchema>;

export function BrandForm({
  brand,
  networks,
  currencies,
  categories,
  selectedCategoryIds,
}: BrandFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  console.log("Brand data:", brand);
  console.log("Selected category IDs:", selectedCategoryIds);
  
  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: brand.name || "",
      domain: brand.domain || "",
      description: brand.description || "",
      slug: brand.slug || "",
      color: brand.color || "",
      image_url: brand.image_url || "",
      network_id: brand.network_id,
      currency_id: brand.currency_id,
      priority: brand.priority || 0,
      is_enabled: typeof brand.is_enabled === 'boolean' ? brand.is_enabled : true,
      categories: selectedCategoryIds || [],
    },
  });

  async function onSubmit(values: BrandFormValues) {
    try {
      setIsSubmitting(true);
      toast.loading("Saving brand changes...");
      
      console.log("Submitting form with values:", values);
      
      try {
        const response = await fetch(`/api/brands/${brand.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        
        const data = await response.json();
        console.log("Response from API:", data);
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to update brand');
        }
        
        toast.dismiss();
        toast.success("Brand updated successfully");
        router.refresh();
      } catch (fetchError) {
        console.error("Network or API error:", fetchError);
        toast.dismiss();
        
        if (fetchError instanceof TypeError && fetchError.message.includes('Failed to fetch')) {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error(fetchError instanceof Error ? fetchError.message : "Failed to update brand");
        }
      }
      
    } catch (error) {
      console.error("General form error:", error);
      toast.dismiss();
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General Information</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          
          {/* General Tab */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>
                  Basic information about the brand.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Brand name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="domain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Domain</FormLabel>
                        <FormControl>
                          <Input placeholder="example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="brand-slug" {...field} />
                        </FormControl>
                        <FormDescription>
                          Used in URLs. Should be lowercase with hyphens.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Higher priority brands appear first in listings.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="network_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Network</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select network" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {networks.map(network => (
                              <SelectItem 
                                key={network.id} 
                                value={network.id.toString()}
                              >
                                {network.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="currency_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {currencies.map(currency => (
                              <SelectItem 
                                key={currency.id} 
                                value={currency.id.toString()}
                              >
                                {currency.name} ({currency.symbol})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the brand" 
                          className="min-h-32" 
                          {...field} 
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="is_enabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Enabled
                        </FormLabel>
                        <FormDescription>
                          Brand will be visible to users when enabled.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Brand Appearance</CardTitle>
                <CardDescription>
                  Visual elements for the brand.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand Color</FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input placeholder="#000000" {...field} value={field.value || ""} />
                          </FormControl>
                          <div 
                            className="h-10 w-10 rounded-md border"
                            style={{ backgroundColor: field.value || "#ffffff" }}
                          />
                        </div>
                        <FormDescription>
                          Hex color code (e.g., #FF5500)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Logo URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} value={field.value || ""} />
                        </FormControl>
                        <FormDescription>
                          URL to the brand logo image
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {form.watch("image_url") && (
                  <div className="mt-4 flex justify-center">
                    <div className="relative h-32 w-32 overflow-hidden rounded-lg border bg-muted">
                      <img
                        src={form.watch("image_url") || ""}
                        alt="Brand logo preview"
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/128x128?text=Invalid+URL";
                        }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Categories Tab */}
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Brand Categories</CardTitle>
                <CardDescription>
                  Assign this brand to one or more categories.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="categories"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Categories</FormLabel>
                        <FormDescription>
                          Select all categories that apply to this brand.
                        </FormDescription>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {categories.map((category) => (
                          <FormField
                            key={category.id}
                            control={form.control}
                            name="categories"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={category.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(category.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), category.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== category.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {category.emoji && (
                                      <span className="mr-2">{category.emoji}</span>
                                    )}
                                    {category.name}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/partnerships/brands")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className={isSubmitting ? "opacity-70" : ""}
          >
            {isSubmitting ? (
              <>
                <svg className="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
} 