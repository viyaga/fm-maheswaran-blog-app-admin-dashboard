import PageContainer from "@/components/layout/page-container";
import MediaCard from "./media-card";
import { Plus } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Heading } from "@/components/shared/heading";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";


export default function MediaLibrary() {
  const mediaItems = [
    {
      imageUrl: "https://en.chessbase.com/Portals/all/thumbs/123/123123.jpeg",
      altText: "Image 1",
      title: "https://en.chessbase.com/Portals/all/thumbs/123/123123.jpeg https://en.chessbase.com/Portals/all/thumbs/123/123123.jpeg",
      description: "Image 1 description",
      avatarUrl: "/placeholder-user.jpg",
      avatarAlt: "@johndoe",
      avatarFallback: "JD",
    },
    {
      imageUrl: "https://en.chessbase.com/Portals/all/thumbs/123/123123.jpeg",
      altText: "Image 2",
      title: "Image 2",
      description: "Image 2 description",
      avatarUrl: "/placeholder-user.jpg",
      avatarAlt: "@janedoe",
      avatarFallback: "JD",
    },
    {
      imageUrl: "https://en.chessbase.com/Portals/all/thumbs/123/123123.jpeg",
      altText: "Image 3",
      title: "Image 3",
      description: "Image 3 description",
      avatarUrl: "/placeholder-user.jpg",
      avatarAlt: "@alexdoe",
      avatarFallback: "AD",
    },
    {
      imageUrl: "https://en.chessbase.com/Portals/all/thumbs/123/123123.jpeg",
      altText: "Image 1",
      title: "Image 1",
      description: "Image 1 description",
      avatarUrl: "/placeholder-user.jpg",
      avatarAlt: "@johndoe",
      avatarFallback: "JD",
    },
    {
      imageUrl: "https://en.chessbase.com/Portals/all/thumbs/123/123123.jpeg",
      altText: "Image 2",
      title: "Image 2",
      description: "Image 2 description",
      avatarUrl: "/placeholder-user.jpg",
      avatarAlt: "@janedoe",
      avatarFallback: "JD",
    },
    {
      imageUrl: "https://en.chessbase.com/Portals/all/thumbs/123/123123.jpeg",
      altText: "Image 3",
      title: "Image 3",
      description: "Image 3 description",
      avatarUrl: "/placeholder-user.jpg",
      avatarAlt: "@alexdoe",
      avatarFallback: "AD",
    },
    {
      imageUrl: "https://en.chessbase.com/Portals/all/thumbs/123/123123.jpeg",
      altText: "Image 1",
      title: "Image 1",
      description: "Image 1 description",
      avatarUrl: "/placeholder-user.jpg",
      avatarAlt: "@johndoe",
      avatarFallback: "JD",
    },
    {
      imageUrl: "https://en.chessbase.com/Portals/all/thumbs/123/123123.jpeg",
      altText: "Image 2",
      title: "Image 2",
      description: "Image 2 description",
      avatarUrl: "/placeholder-user.jpg",
      avatarAlt: "@janedoe",
      avatarFallback: "JD",
    },
    {
      imageUrl: "https://en.chessbase.com/Portals/all/thumbs/123/123123.jpeg",
      altText: "Image 3",
      title: "Image 3",
      description: "Image 3 description",
      avatarUrl: "/placeholder-user.jpg",
      avatarAlt: "@alexdoe",
      avatarFallback: "AD",
    },
    {
      imageUrl: "https://en.chessbase.com/Portals/all/thumbs/123/123123.jpeg",
      altText: "Image 1",
      title: "Image 1",
      description: "Image 1 description",
      avatarUrl: "/placeholder-user.jpg",
      avatarAlt: "@johndoe",
      avatarFallback: "JD",
    },
    {
      imageUrl: "https://en.chessbase.com/Portals/all/thumbs/123/123123.jpeg",
      altText: "Image 2",
      title: "Image 2",
      description: "Image 2 description",
      avatarUrl: "/placeholder-user.jpg",
      avatarAlt: "@janedoe",
      avatarFallback: "JD",
    },
    {
      imageUrl: "https://en.chessbase.com/Portals/all/thumbs/123/123123.jpeg",
      altText: "Image 3",
      title: "Image 3",
      description: "Image 3 description",
      avatarUrl: "/placeholder-user.jpg",
      avatarAlt: "@alexdoe",
      avatarFallback: "AD",
    },
  ];

  return (
    <PageContainer scrollable>
      <div className="space-y-4 pb-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Admins`}
            description="Manage Admins"
          />

          <Link
            href={'/dashboard/admins/add'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4 w-full mx-auto">
          {mediaItems.map((item, index) => (
            <MediaCard key={index} {...item} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
