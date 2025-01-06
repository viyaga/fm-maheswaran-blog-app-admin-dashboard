'use client';

import { DataTable } from '@/components/shared/table/data-table';
import { DataTableFilterBox } from '@/components/shared/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/shared/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/shared/table/data-table-search';
import { columns } from './columns';
import { PRIME_OPTIONS, useUserTableFilters } from './use-user-table-filters';

export default function AdminTable({ data, totalData}) {
  
  const {
    primeFilter,
    setPrimeFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = useUserTableFilters();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <DataTableFilterBox
          filterKey="prime"
          title="Subscribtion"
          options={PRIME_OPTIONS}
          setFilterValue={setPrimeFilter}
          filterValue={primeFilter}
        />
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
      <DataTable columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
