import { brand } from "@/lib/constants/brand";

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
export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <brand.lucideIcon className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold">{brand.name}</span>
    </div>
  );
}
