import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils/tailwind";

export function Loader({ className }: { className?: string }) {
  return <Loader2Icon className={cn("animate-spin size-8", className)} />;
}
