import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";
import { EditBlogContent } from "./edit-blog-content";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-full h-[80vh]">
          <Loader className="size-16 text-primary" />
        </div>
      }
    >
      <EditBlogContent id={id} />
    </Suspense>
  );
}
