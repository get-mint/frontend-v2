"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Tables } from "@/types/supabase";
import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
  const [savingField, setSavingField] = useState<string | null>(null);
  const supabase = createClient();
  
  // Track which fields have been changed to show status indicators
  const [changedFields, setChangedFields] = useState<Record<string, boolean>>({});
  const [savedFields, setSavedFields] = useState<Record<string, boolean>>({});
  
  // Create a ref to store timeout IDs for each field
  const timeoutRefs = useRef<Record<string, NodeJS.Timeout>>({});
  
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
  
  // Custom save function with timeout to delay saving
  const saveWithDelay = (field: string, value: any) => {
    // Clear any existing timeout for this field
    if (timeoutRefs.current[field]) {
      clearTimeout(timeoutRefs.current[field]);
    }
    
    // Set a new timeout
    timeoutRefs.current[field] = setTimeout(async () => {
      try {
        setSavingField(field);
        setChangedFields(prev => ({ ...prev, [field]: false }));
        
        // Get session for authentication
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          throw new Error("No active session. Please log in again.");
        }
        
        // Call the API route for partial update with auth header
        const response = await fetch(`/api/brands/${brand.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`
          },
          body: JSON.stringify({ field, value }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || `Failed to save ${field}`);
        }
        
        setSavedFields(prev => ({ ...prev, [field]: true }));
        toast.success(`${field.charAt(0).toUpperCase() + field.slice(1)} updated`);
        router.refresh();
        
      } catch (error) {
        console.error(`Error saving ${field}:`, error);
        toast.error(`Failed to save ${field}`);
        setChangedFields(prev => ({ ...prev, [field]: true }));
      } finally {
        setSavingField(null);
        
        // Clear the "saved" indicator after 3 seconds
        setTimeout(() => {
          setSavedFields(prev => ({ ...prev, [field]: false }));
        }, 3000);
      }
    }, 1000); // 1 second delay
  };
  
  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(timeoutRefs.current).forEach(timeout => {
        clearTimeout(timeout);
      });
    };
  }, []);
  
  // Watch all form fields for changes
  const formValues = useWatch({ control: form.control });
  
  // Set up field change detection
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name && type === "change") {
        setChangedFields(prev => ({ ...prev, [name]: true }));
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch]);
  
  // Set up auto-save for all fields
  useEffect(() => {
    // Skip the first render
    if (!formValues) return;
    
    Object.keys(formValues).forEach(field => {
      if (changedFields[field]) {
        const value = formValues[field as keyof BrandFormValues];
        saveWithDelay(field, value);
      }
    });
  }, [formValues, changedFields]);
  
  // Field status indicator component
  const FieldStatus = ({ field }: { field: string }) => {
    if (savingField === field) {
      return (
        <div className="ml-2 inline-flex items-center text-muted-foreground">
          <svg className="mr-1 h-3 w-3 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-xs">Saving...</span>
        </div>
      );
    }
    
    if (savedFields[field]) {
      return (
        <div className="ml-2 inline-flex items-center text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-xs">Saved</span>
        </div>
      );
    }
    
    if (changedFields[field]) {
      return (
        <div className="ml-2 inline-flex items-center text-amber-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-xs">Unsaved changes</span>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <Form {...form}>
      <form>
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
                        <div className="flex items-center">
                          <FormLabel>Brand Name</FormLabel>
                          <FieldStatus field="name" />
                        </div>
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
                        <div className="flex items-center">
                          <FormLabel>Domain</FormLabel>
                          <FieldStatus field="domain" />
                        </div>
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
                        <div className="flex items-center">
                          <FormLabel>Slug</FormLabel>
                          <FieldStatus field="slug" />
                        </div>
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
                        <div className="flex items-center">
                          <FormLabel>Priority</FormLabel>
                          <FieldStatus field="priority" />
                        </div>
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
                        <div className="flex items-center">
                          <FormLabel>Network</FormLabel>
                          <FieldStatus field="network_id" />
                        </div>
                        <Select 
                          onValueChange={(value) => {
                            field.onChange(value);
                            setChangedFields(prev => ({ ...prev, network_id: true }));
                          }} 
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
                        <div className="flex items-center">
                          <FormLabel>Currency</FormLabel>
                          <FieldStatus field="currency_id" />
                        </div>
                        <Select 
                          onValueChange={(value) => {
                            field.onChange(value);
                            setChangedFields(prev => ({ ...prev, currency_id: true }));
                          }}
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
                      <div className="flex items-center">
                        <FormLabel>Description</FormLabel>
                        <FieldStatus field="description" />
                      </div>
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
                        <div className="flex items-center">
                          <FormLabel className="text-base">
                            Enabled
                          </FormLabel>
                          <FieldStatus field="is_enabled" />
                        </div>
                        <FormDescription>
                          Brand will be visible to users when enabled.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            setChangedFields(prev => ({ ...prev, is_enabled: true }));
                          }}
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
                        <div className="flex items-center">
                          <FormLabel>Brand Color</FormLabel>
                          <FieldStatus field="color" />
                        </div>
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
                        <div className="flex items-center">
                          <FormLabel>Logo URL</FormLabel>
                          <FieldStatus field="image_url" />
                        </div>
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
                <CardTitle className="flex items-center">
                  <span>Brand Categories</span>
                  <FieldStatus field="categories" />
                </CardTitle>
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
                                        const updatedValues = checked
                                          ? [...(field.value || []), category.id]
                                          : field.value?.filter(
                                              (value) => value !== category.id
                                            );
                                        
                                        field.onChange(updatedValues);
                                        setChangedFields(prev => ({ ...prev, categories: true }));
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
          >
            Back to Brands
          </Button>
        </div>
      </form>
    </Form>
  );
} 