'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useTransition } from 'react';

export function DataTableSearch({
  searchKey,
  searchQuery,
  setSearchQuery,
  setPage
}) {
  const [isLoading, startTransition] = useTransition();

  const handleSearch = (value) => {
    setSearchQuery(value, { startTransition });
    setPage(1); // Reset page to 1 when search changes
  };

  return (
    <Input
      placeholder={`Search ${searchKey}...`}
      value={searchQuery ?? ''}
      onChange={(e) => handleSearch(e.target.value)}
      className={cn('w-full md:max-w-sm', isLoading && 'animate-pulse')}
    />
  );
}
