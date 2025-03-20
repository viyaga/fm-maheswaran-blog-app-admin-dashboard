import PageContainer from "@/components/layout/page-container";
import MediaCard from "./media-card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Heading } from "@/components/shared/heading";
import { getAllMediaFiles } from "@/lib/strapi/actions/media";
import UploadButton from "./upload";
import InfinityScrollMedia from "./Infinity-scroll-media";

const MediaLibrary = async () => {
  const pageLimit = 12; // Default page size
  const sort = "createdAt:DESC"; // Default sorting
  const fields = "name,url,width,height,alternativeText,ext"; // Required fields

  // Fetch initial media files on the server
  const mediaFiles = await getAllMediaFiles({
    fields,
    filters: [],
    pagination: { page: 1, pageSize: pageLimit },
    sort,
    revalidate: 60 * 60 * 24 * 365,
    tags: ["mediaFiles"],
  });

  return (
    <PageContainer scrollable>
      <div className="space-y-4 pb-4">
        <div className="flex items-start justify-between">
          <Heading title="Media Library" description="Manage Images" />
          <UploadButton />
        </div>
        <Separator />
        {/* Client-side infinite scroll */}
        <InfinityScrollMedia initialMediaFiles={mediaFiles} />
      </div>
    </PageContainer>
  );
};

export default MediaLibrary;
