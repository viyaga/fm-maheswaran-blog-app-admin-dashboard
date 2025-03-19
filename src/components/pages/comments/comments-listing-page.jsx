import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/shared/heading';
import { Separator } from '@/components/ui/separator';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import CommentsTable from './comments-table';
import ServerError from '@/components/shared/serverError';
import { getAllComments } from '@/lib/strapi';

export default async function CommentListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageSize = searchParamsCache.get('limit');
  const sort = searchParamsCache.get('sort');


  const comments = await getAllComments({ page, pageSize, sort, search });
  console.log({ comments:comments.data });
  
  if (comments?.error) return <ServerError message="An error occurred. Please try again later." />;

  const count = comments?.count;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Comments (${count})`}
            description="Manage Comments"
          />

        </div>
        <Separator />
        <CommentsTable data={comments?.data} totalData={count} />
      </div>
    </PageContainer>
  );
}