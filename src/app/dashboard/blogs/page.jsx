import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/shared/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/shared/table/data-table-skeleton';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import BlogListingPage from '@/components/blog/blog-listing';
import BlogTableAction from '@/components/blog/blog-tables/blog-table-action';

export const metadata = {
  title: 'Dashboard: Blogs'
};

export default async function Page({ searchParams }) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  const params = await searchParams
  searchParamsCache.parse(params);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...params });

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Blogs"
            description="Manage Blogs"
          />
          <Link
            href="/dashboard/blogs/add"
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <BlogTableAction />
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <BlogListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
