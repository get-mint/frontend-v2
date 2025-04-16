"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, LoaderCircle, Save } from "lucide-react";
import Editor from "@monaco-editor/react";

import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/hooks/use-auth";
import { Database } from "@/types/supabase";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

type Advertiser = Database["public"]["Tables"]["advertisers"]["Row"];

type Network = {
  id: string;
  name: string;
};

type Currency = {
  id: string;
  name: string;
  acronym: string;
};

const formSchema = z.object({
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

type FormValues = z.infer<typeof formSchema>;

export default function AdvertiserDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [advertiser, setAdvertiser] = useState<Advertiser | null>(null);
  const [networks, setNetworks] = useState<Network[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch advertiser data
        const { data: advertiserData, error: advertiserError } = await supabase
          .from("advertisers")
          .select("*")
          .eq("id", params.id)
          .single();

        if (advertiserError) {
          throw advertiserError;
        }

        // Fetch networks and currencies
        const [networksResult, currenciesResult] = await Promise.all([
          supabase.from("networks").select("id, name").order("name"),
          supabase.from("currencies").select("id, name, acronym").order("name"),
        ]);

        if (networksResult.data) setNetworks(networksResult.data);
        if (currenciesResult.data) setCurrencies(currenciesResult.data);

        if (advertiserData) {
          setAdvertiser(advertiserData);
          setMetadata(advertiserData.metadata ? JSON.stringify(advertiserData.metadata, null, 2) : "");
          
          // Set form values
          form.reset({
            name: advertiserData.name,
            domain: advertiserData.domain,
            slug: advertiserData.slug,
            description: advertiserData.description || "",
            network_id: advertiserData.network_id || "",
            currency_id: advertiserData.currency_id || "",
            image_url: advertiserData.image_url || "",
            brand_hex_color: advertiserData.brand_hex_color || "",
            up_to_pct: advertiserData.up_to_pct || undefined,
            active: advertiserData.active,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && params.id) {
      fetchData();
    }
  }, [isAuthenticated, params.id, supabase, form]);

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
        alert("The metadata contains invalid JSON. Please correct it before saving.");
        setIsSaving(false);
        return;
      }

      const { error } = await supabase
        .from("advertisers")
        .update({
          ...values,
          metadata: parsedMetadata,
        })
        .eq("id", params.id);

      if (error) throw error;
      alert("Advertiser updated successfully");
    } catch (error) {
      console.error("Error updating advertiser:", error);
      alert("Error updating advertiser");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoaderCircle className="animate-spin size-8" />
      </div>
    );
  }

  if (!advertiser) {
    return <div>Advertiser not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-4xl font-bold">Edit {advertiser.name}</h1>
      </div>

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
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Manage the basic details of the advertiser
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Advertiser name" {...field} />
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
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="advertiser-name" {...field} />
                        </FormControl>
                        <FormDescription>
                          URL-friendly identifier used in links
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Brief description of the advertiser"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Active Status
                          </FormLabel>
                          <FormDescription>
                            Enable or disable this advertiser on the platform
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
            
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Manage how the advertiser appears visually
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Logo/Image URL</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://example.com/logo.png" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          URL to the advertiser's logo or representative image
                        </FormDescription>
                        <FormMessage />
                        
                        {field.value && (
                          <div className="mt-2">
                            <p className="mb-2 text-sm font-medium">Logo Preview:</p>
                            <div className="flex justify-center p-4 border rounded-md">
                              <img 
                                src={field.value} 
                                alt="Logo Preview" 
                                className="object-contain max-h-32"
                                onError={(e) => {
                                  e.currentTarget.src = "https://placehold.co/200x100?text=No+Image";
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="brand_hex_color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand Color</FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input 
                              placeholder="#FF0000" 
                              {...field} 
                            />
                          </FormControl>
                          {field.value && (
                            <div 
                              className="w-10 h-10 border rounded-md" 
                              style={{ backgroundColor: field.value }}
                            />
                          )}
                        </div>
                        <FormDescription>
                          Hex color code representing the brand's primary color
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="financial">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Information</CardTitle>
                  <CardDescription>
                    Manage cashback and commission details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="currency_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a currency" />
                              </SelectTrigger>
                              <SelectContent>
                                {currencies.map((currency) => (
                                  <SelectItem
                                    key={currency.id}
                                    value={currency.id}
                                  >
                                    {currency.name} ({currency.acronym})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription>
                            The currency used for transactions with this advertiser
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
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a network" />
                              </SelectTrigger>
                              <SelectContent>
                                {networks.map((network) => (
                                  <SelectItem
                                    key={network.id}
                                    value={network.id}
                                  >
                                    {network.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription>
                            The affiliate network this advertiser belongs to
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="up_to_pct"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Cashback Percentage</FormLabel>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.01"
                              min="0" 
                              max="100"
                              placeholder="5.00" 
                              {...field}
                              value={field.value || ""}
                              onChange={(e) => {
                                const value = e.target.value === "" ? undefined : parseFloat(e.target.value);
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <span>%</span>
                        </div>
                        <FormDescription>
                          The maximum cashback percentage a user can earn
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="advanced">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                  <CardDescription>
                    Manage technical details and metadata
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <FormLabel>Metadata (JSON)</FormLabel>
                    <Editor
                      height="300px"
                      defaultLanguage="json"
                      value={metadata}
                      onChange={(value) => setMetadata(value || "")}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 12,
                      }}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Advanced configuration in JSON format. Must be valid JSON.
                    </p>
                  </div>
                </CardContent>
              </Card>
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
    </div>
  );
} 