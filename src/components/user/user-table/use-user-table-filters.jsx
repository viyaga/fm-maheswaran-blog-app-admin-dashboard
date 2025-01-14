'use client';

import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';

export const PRIME_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' }
];

export function useUserTableFilters() {
  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );

  const [primeFilter, setPrimeFilter] = useQueryState(
    'prime',
    searchParams.prime.withOptions({ shallow: false }).withDefault('')
  );

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1)
  );

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setPrimeFilter(null);

    setPage(1);
  }, [setSearchQuery, setPrimeFilter, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!primeFilter;
  }, [searchQuery, primeFilter]);

  return {
    searchQuery,
    setSearchQuery,
    primeFilter,
    setPrimeFilter,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive
  };
}
