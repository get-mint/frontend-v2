import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4 py-24 flex items-center justify-center">
        <Loader2 className="size-12 animate-spin text-primary" />
      </div>
    </div>
  );
}
