import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/shared/heading';
import { Separator } from '@/components/ui/separator';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import AuthorTable from './author-table';
import { getAllAuthors } from '@/lib/strapi/actions/author';
import ServerError from '../../shared/serverError';

export default async function AuthorListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const sort = searchParamsCache.get('sort');

  const fields = "username,email,first_name,last_name,country,createdAt,author_status"; // Fetch relevant fields

  const filters = [
    { field: "author_status", operator: "$eq", value: 1 },  // Filtering only active authors
  ];

  // Search by email
  if (search) filters.push({ field: "email", operator: "$contains", value: search });

  const pagination = { page, pageSize: pageLimit };

  const authors = await getAllAuthors({ fields, filters, pagination, sort, revalidate: 60 * 60 * 24 * 365, tags: ["authors"] });

  if (authors?.error) return <ServerError message="An error occurred. Please try again later." />;

  const count = authors?.count;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Authors (${count})`}
            description="Manage Authors"
          />

          <Link
            href={'/dashboard/authors/add'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <AuthorTable data={authors?.data} totalData={count} />
      </div>
    </PageContainer>
  );
}
