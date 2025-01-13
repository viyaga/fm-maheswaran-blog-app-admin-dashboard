'use client';

import { DataTableFilterBox } from '@/components/shared/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/shared/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/shared/table/data-table-search';
import {
  CATEGORY_OPTIONS,
  useBlogTableFilters
} from './use-blog-table-filters';

export default function BlogTableAction() {
  const {
    categoriesFilter,
    setCategoriesFilter,
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
        filterKey="categories"
        title="Categories"
        options={CATEGORY_OPTIONS}
        setFilterValue={setCategoriesFilter}
        filterValue={categoriesFilter}
      />
      <DataTableResetFilter
        isFilterActive={isAnyFilterActive}
        onReset={resetFilters}
      />
    </div>
  );
}
