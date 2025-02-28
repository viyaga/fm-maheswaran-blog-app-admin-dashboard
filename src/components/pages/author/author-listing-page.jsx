import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/shared/heading';
import { Separator } from '@/components/ui/separator';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import AuthorTable from './author-table';
import ServerError from '../../shared/serverError';
import { getAllAuthors } from '@/lib/strapi';

export default async function AuthorListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageSize = searchParamsCache.get('limit');
  const sort = searchParamsCache.get('sort');

  const authors = await getAllAuthors({ page, pageSize, sort, search });
  console.log({authors:authors.data});
  
  const count = authors.meta.pagination.total;

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
