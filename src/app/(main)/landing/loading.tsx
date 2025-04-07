import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center">
      <Loader2 className="size-12 animate-spin text-primary" />
    </div>
  );
}
