import AuthorListingPage from '@/components/pages/author/author-listing-page';
import { searchParamsCache } from '@/lib/searchparams';
import React from 'react';

export const metadata = {
  title: 'Dashboard : Authors',
};

export default async function Page({ searchParams }) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  await searchParamsCache.parse(searchParams);

  return <AuthorListingPage />;
}
