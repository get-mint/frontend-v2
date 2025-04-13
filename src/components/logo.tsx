import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/tailwind";
import { LeafIcon } from "lucide-react";

const logoVariants = cva("flex items-center gap-1", {
  variants: {
    size: {
      default: "text-xl",
      sm: "text-base",
      md: "text-xl gap-2",
      lg: "text-2xl gap-2",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface LogoProps extends VariantProps<typeof logoVariants> {
  className?: string;
}

/**
 * This component is used to display the logo of the app. You can edit this
 * component to display whatever you want, and display a different logo on
 * different pages.
 *
 * Unless you have a strong brand or logo, for small projects I just recommend
 * picking a Lucide icon, a cool name, updating this component and the
 * `brand.ts` file and you're pretty much set.
 *
 * @returns The rendered Logo component.
 */
export function Logo({ size, className }: LogoProps) {
  return (
    <div className={cn(logoVariants({ size, className }))}>
      <LeafIcon
        className={cn("text-primary", {
          "size-6": size === "default",
          "size-4": size === "sm",
          "size-7": size === "md",
          "size-8": size === "lg",
        })}
      />
      <span className="font-bold text-secondary">Mint Cashback</span>
    </div>
  );
}
