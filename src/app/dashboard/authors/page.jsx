import UserListingPage from '@/components/admin-users/user-listing-page';
import { searchParamsCache } from '@/lib/searchparams';
import React from 'react';

export const metadata = {
  title: 'Dashboard : Employees'
};

export default async function Page({ searchParams }) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  await searchParamsCache.parse(searchParams);

  return <UserListingPage />;
}
