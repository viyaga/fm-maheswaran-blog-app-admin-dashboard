import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/shared/heading';
import { Separator } from '@/components/ui/separator';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { getAllComments } from '@/lib/actions/comment';
import CommentsTable from './comments-table';
import ServerError from '@/components/shared/serverError';

export default async function CommentListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const sort = searchParamsCache.get('sort');

  const fields = "content,comment_status,createdAt"; // Fetch relevant fields

  const filters = [];

  // Search by username
  if (search) filters.push({ field: "username", operator: "$contains", value: search });

  const pagination = { page, pageSize: pageLimit };

  const comments = await getAllComments({ fields, filters, pagination, sort, revalidate: 60 * 60 * 24 * 365, tags: ["comments"] });

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

          <Link
            href={'/dashboard/comments/add'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <CommentsTable data={comments?.data} totalData={count} />
      </div>
    </PageContainer>
  );
}