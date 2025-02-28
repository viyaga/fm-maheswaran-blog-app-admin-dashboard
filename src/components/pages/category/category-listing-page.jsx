import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/shared/heading';
import { Separator } from '@/components/ui/separator';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import CategoryTable from './category-table';
import { getAllCategories } from '@/lib/strapi/actions/category';
import ServerError from '../../shared/serverError';

export default async function CategoryListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const sort = searchParamsCache.get('sort');

  const fields = "name,slug,description,parent_id,createdAt"; // Fetch relevant fields

  const filters = [];

  // Search by name
  if (search) filters.push({ field: "name", operator: "$contains", value: search });

  const pagination = { page, pageSize: pageLimit };

  const categories = await getAllCategories({ fields, filters, pagination, sort, revalidate: 60 * 60 * 24 * 365, tags: ["categories"] });

  if (categories?.error) return <ServerError message="An error occurred. Please try again later." />;

  const count = categories?.count;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Categories (${count})`}
            description="Manage Categories"
          />

          <Link
            href={'/dashboard/categories/add'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <CategoryTable data={categories?.data} totalData={count} />
      </div>
    </PageContainer>
  );
}
