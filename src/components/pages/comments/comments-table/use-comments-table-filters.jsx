'use client';

import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';

export const SPAM_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' }
];

export function useCommentsTableFilters() {
  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );

  const [spamFilter, setSpamFilter] = useQueryState(
    'spam',
    searchParams.spam.withOptions({ shallow: false }).withDefault('')
  );

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1)
  );

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setSpamFilter(null);

    setPage(1);
  }, [setSearchQuery, setSpamFilter, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!spamFilter;
  }, [searchQuery, spamFilter]);

  return {
    searchQuery,
    setSearchQuery,
    spamFilter,
    setSpamFilter,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive
  };
}
