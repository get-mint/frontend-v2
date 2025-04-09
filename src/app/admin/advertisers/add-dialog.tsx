"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import Editor from "@monaco-editor/react";

import { createClient } from "@/lib/supabase/client";
import { MetadataDialog } from "./metadata-dialog";

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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  domain: z.string().min(1, "Domain is required"),
  network_id: z.string().min(1, "Network is required"),
  currency_id: z.string().min(1, "Currency is required"),
  image_url: z.string().url().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type Network = {
  id: string;
  name: string;
};

type Currency = {
  id: string;
  name: string;
  acronym: string;
};

export function AddNewAdvertiser() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [networks, setNetworks] = useState<Network[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const supabase = createClient();
  const [metadata, setMetadata] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const [networksResult, currenciesResult] = await Promise.all([
        supabase.from("networks").select("id, name").order("name"),
        supabase.from("currencies").select("id, name, acronym").order("name"),
      ]);

      if (networksResult.data) setNetworks(networksResult.data);
      if (currenciesResult.data) setCurrencies(currenciesResult.data);
    };

    if (open) {
      fetchData();
    }
  }, [open, supabase]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      domain: "",
      network_id: "",
      currency_id: "",
      image_url: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.from("advertisers").insert([{
        ...values,
        metadata: metadata ? JSON.parse(metadata) : null,
      }]);
      if (error) throw error;
      setOpen(false);
      form.reset();
      setMetadata("");
    } catch (error) {
      console.error("Error adding advertiser:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Advertiser</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Advertiser</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new advertiser to the system.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <FormField
              control={form.control}
              name="network_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Network</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a network" />
                      </SelectTrigger>
                      <SelectContent className="text-foreground">
                        {networks.map((network) => (
                          <SelectItem key={network.id} value={network.id}>
                            {network.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
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
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem
                            key={currency.id}
                            value={currency.id}
                            className="text-foreground"
                          >
                            {currency.name} ({currency.acronym})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.png"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <FormLabel>Metadata</FormLabel>
              <MetadataDialog
                advertiser={{
                  id: "new",
                  name: "",
                  domain: "",
                  metadata: metadata ? JSON.parse(metadata) : null,
                } as any}
                onMetadataUpdate={(value) => setMetadata(value)}
                trigger={
                  <Button variant="outline" size="sm">
                    {metadata ? "Edit Metadata" : "Add Metadata"}
                  </Button>
                }
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
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                Add Advertiser
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
