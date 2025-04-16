"use client";

import { UseFormReturn, useWatch } from "react-hook-form";
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
  // Watch both the image_url and brand_hex_color to update the preview dynamically
  const imageUrl = useWatch({
    control: form.control,
    name: "image_url",
    defaultValue: form.getValues("image_url"),
  });
  
  const brandColor = useWatch({
    control: form.control,
    name: "brand_hex_color",
    defaultValue: form.getValues("brand_hex_color"),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Manage how the advertiser appears visually
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Logo Preview Section - Show at the top if both values exist */}
        {(imageUrl || brandColor) && (
          <div className="mb-6">
            <p className="mb-2 text-sm font-medium">Logo Preview:</p>
            <div 
              className="flex justify-center items-center p-6 border rounded-md"
              style={{ 
                backgroundColor: brandColor || 'transparent',
                minHeight: '120px'
              }}
            >
              {imageUrl && (
                <img 
                  src={imageUrl} 
                  alt="Logo Preview" 
                  className="object-contain max-h-32 max-w-full"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/200x100?text=No+Image";
                  }}
                />
              )}
            </div>
          </div>
        )}

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
  );
} 