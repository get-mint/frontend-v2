"use client";

import { UseFormReturn } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormValues } from "./advertiser-form";

interface AppearanceTabProps {
  form: UseFormReturn<FormValues>;
}

export function AppearanceTab({ form }: AppearanceTabProps) {
  return (
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
                  <div 
                    className={`flex justify-center p-4 rounded-md ${!form.watch("brand_hex_color") ? "border" : ""}`}
                    style={
                      form.watch("brand_hex_color")
                        ? { backgroundColor: form.watch("brand_hex_color") }
                        : undefined
                    }
                  >
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
        
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <Input 
                  type="number"
                  min="0"
                  placeholder="100" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Display priority (lower values = higher priority, default is 100)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
} 