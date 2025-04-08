import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4 h-[75vh] flex items-center justify-center">
        <Loader2 className="size-12 animate-spin text-primary" />
      </div>
    </div>
  );
}
