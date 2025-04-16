import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CreateBlog() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create Blog Post</h1>
    </div>
  )
}
