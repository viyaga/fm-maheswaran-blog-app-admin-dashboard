import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/shared/heading';
import { Separator } from '@/components/ui/separator';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import AdminTable from './admin-table';
import { getAllAdmins } from '@/lib/actions/admin';
import ServerError from '../shared/serverError';

export default async function AdminListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const sort = searchParamsCache.get('sort')

  // GET /api/posts?filters[title][$contains]=searchTerm&pagination[page]=1&pagination[pageSize]=10&sort[title]=asc

  const fields = "username,email,first_name,last_name,country,createdAt,admin_status"; // Fetch only username and email fields

  const filters = [
    { field: "role", operator: "$eq", value: 1 }, // Filtering by Role ID = 1 (Admin users)
    { field: "admin_status", operator: "$eq", value: 1 },     // Filtering only active admins
  ];

  // search by email
  if (search) filters.push({ field: "email", operator: "$contains", value: search })

  const pagination = { page, pageSize: pageLimit };

  const admins = await getAllAdmins({ fields, filters, pagination, sort, revalidate: 60 * 60 * 24 * 365, tags: ["admins"] });

  if (admins?.error) return <ServerError message="An error occurred. Please try again later." />

  const count = admins?.count;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Admins (${count})`}
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
        <AdminTable data={admins?.data} totalData={count} />
      </div>
    </PageContainer>
  );
}
