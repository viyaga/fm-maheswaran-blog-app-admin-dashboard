import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/shared/heading';
import { Separator } from '@/components/ui/separator';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import AdminTable from './admin-table';
import { getAdmins } from '@/lib/actions/admin';
import ServerError from '../shared/serverError';

export default async function AdminListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const sort = searchParamsCache.get('sort')

  // GET /api/posts?filters[title][$contains]=searchTerm&pagination[page]=1&pagination[pageSize]=10&sort[title]=asc

  const fields = "username,email,first_name,last_name,country,createdAt"; // Fetch only username and email fields

  const filters = [
    { field: "role", operator: "$eq", value: 3 }, // Filtering by Role ID = 3 (Admin users)
    { field: "user_status", operator: "$eq", value: 1 },     // Filtering only active users
  ];

  // search by email
  if (search) filters.push({ field: "email", operator: "$contains", value: search })

  const pagination = { page, pageSize: pageLimit };
  console.log({pagination});
  
  const admins = await getAdmins({ fields, filters, pagination, sort, revalidate: 60 * 60 * 5, tags: ["admins"] });
  console.log({adminError: admins?.error});
  
  if (admins?.error) return <ServerError message="An error occurred. Please try again later." />

  const count = admins?.count;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Users (${count})`}
            description="Manage users"
          />

          <Link
            href={'/dashboard/users/add'}
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
