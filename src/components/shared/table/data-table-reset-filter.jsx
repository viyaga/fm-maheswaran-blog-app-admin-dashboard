'use client';

import { Button } from "@/components/ui/button";


export function DataTableResetFilter({
  isFilterActive,
  onReset
}) {
  return (
    <>
      {isFilterActive ? (
        <Button variant="outline" onClick={onReset}>
          Reset Filters
        </Button>
      ) : null}
    </>
  );
}
