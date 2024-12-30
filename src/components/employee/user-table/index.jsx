'use client';

import { DataTable } from '@/components/shared/table/data-table';
import { DataTableFilterBox } from '@/components/shared/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/shared/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/shared/table/data-table-search';
import { columns } from './columns';
import {
  GENDER_OPTIONS,
  useEmployeeTableFilters
} from './use-employee-table-filters';

export default function EmployeeTable({
  data,
  totalData
}) {
  const {
    genderFilter,
    setGenderFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = useEmployeeTableFilters();

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
          filterKey="gender"
          title="Gender"
          options={GENDER_OPTIONS}
          setFilterValue={setGenderFilter}
          filterValue={genderFilter}
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
