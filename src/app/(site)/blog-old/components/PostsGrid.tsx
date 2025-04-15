import Link from "next/link";
import Image from "next/image";
import { type SanityDocument } from "next-sanity";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PostsGridProps {
  posts: SanityDocument[];
}

export default function PostsGrid({ posts }: PostsGridProps) {
  return (
    <ul className="flex flex-col gap-y-6">
      {posts.map((post) => (
        <li key={post._id}>
          <Card className="overflow-hidden transition-all hover:shadow-md">
            {post.imageUrl && (
              <div className="p-4 pt-6">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="object-contain w-full h-auto rounded-md"
                />
              </div>
            )}
            <CardContent>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                {post.authorName && <span>By {post.authorName}</span>}
                {post.authorName && post.publishedAt && (
                  <Separator orientation="vertical" className="h-4" />
                )}
                {post.publishedAt && (
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                )}
              </div>

              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.categories.map((category: any) => (
                    <Badge key={category._id} variant="outline">
                      {category.title}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Link href={`/blog/${post.slug.current}`}>
                <Button>Read more</Button>
              </Link>
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
} 