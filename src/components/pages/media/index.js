import PageContainer from "@/components/layout/page-container";
import MediaCard from "./media-card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Heading } from "@/components/shared/heading";
import { searchParamsCache } from "@/lib/searchparams";
import { getAllMediaFiles } from "@/lib/strapi/actions/media";
import ServerError from "@/components/shared/serverError";
import UploadButton from "./upload";

const MediaLibrary = async () => {

  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  let sort = searchParamsCache.get('sort');

  const fields = "name,url,width,height,alternativeText,ext"; // Fetch relevant fields

  const filters = [];

  // Search by name
  if (search) filters.push({ field: "name", operator: "$contains", value: search });

  const pagination = { page, pageSize: pageLimit };

  sort = sort ? sort : "createdAt:DESC";

  const mediaFiles = await getAllMediaFiles({ fields, filters, pagination, sort, revalidate: 60 * 60 * 24 * 365, tags: ["mediaFiles"] });

  console.log({mediaFiles});
  
  if (mediaFiles?.error) return <ServerError message="An error occurred. Please try again later." />;

  const count = mediaFiles?.count;

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
            title="Media library"
            description="Manage Images"
          />

          <UploadButton />
        </div>
        <Separator />
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4 w-full mx-auto">
          {mediaFiles.map((item, index) => (
            <MediaCard key={index} {...item} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}


export default MediaLibrary;