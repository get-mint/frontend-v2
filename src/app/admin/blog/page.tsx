"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Posts from "@/app/(site)/blog/posts";

export default function BlogPage() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Blog Posts</h1>
        <Button onClick={() => router.push("/admin/blog/create-blog")} size="lg">
          <PlusIcon className="h-5 w-5" />
          Create Blog Post
        </Button>
      </div>
    </div>
  );
}
