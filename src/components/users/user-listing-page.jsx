import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/shared/heading';
import { Separator } from '@/components/ui/separator';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import UsersTable from './user-table';
import { getUsers } from '@/lib/actions';

export default async function UserListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const prime = searchParamsCache.get('prime');
  const pageLimit = searchParamsCache.get('limit');
  const sort = searchParamsCache.get('sort')

  // GET /api/posts?filters[title][$contains]=searchTerm&pagination[page]=1&pagination[pageSize]=10&sort[title]=asc

  const fields = "username,email,first_name,last_name,prime_membership,country,createdAt"; // Fetch only username and email fields

  const filters = [
    { field: "role][name", operator: "$ne", value: "admin" }, // Exclude admin users
    { field: "user_status", operator: "$eq", value: 1 },     // Include only active users
  ];
  if (prime) filters.push({ field: "prime_membership", operator: "$eq", value: prime })
  if (search) filters.push({ field: "email", operator: "$contains", value: search })  // search by email

  const pagination = { page, pageSize: pageLimit };

  const users = await getUsers({ fields, filters, pagination, sort, revalidate: 60 * 60 * 5, tags: ["users"] });
  const totalUsers = users?.length;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Users (${totalUsers})`}
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
        <UsersTable data={users} totalData={totalUsers} />
      </div>
    </PageContainer>
  );
}
