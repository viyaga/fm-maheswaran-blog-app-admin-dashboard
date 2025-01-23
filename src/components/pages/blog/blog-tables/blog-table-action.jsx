'use client';

import { DataTableFilterBox } from '@/components/shared/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/shared/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/shared/table/data-table-search';
import {
  STATUS_OPTIONS,
  useBlogTableFilters
} from './use-blog-table-filters';

export default function BlogTableAction() {
  const {
    blogStatusFilter,
    setBlogStatusFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = useBlogTableFilters();
  
  return (
    <div className="flex flex-wrap items-center gap-4">
      <DataTableSearch
        searchKey="title"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />
      <DataTableFilterBox
        filterKey="blog_status"
        title="Status"
        options={STATUS_OPTIONS}
        setFilterValue={setBlogStatusFilter}
        filterValue={blogStatusFilter}
      />
      <DataTableResetFilter
        isFilterActive={isAnyFilterActive}
        onReset={resetFilters}
      />
    </div>
  );
}
