'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { CellAction } from './cell-action';
import { format } from 'date-fns';
import { capitalize } from '@/lib/utils';

export const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: 'CATEGORY NAME',
    cell: ({ row }) => capitalize(row.original.name) || "-"
  },
  {
    accessorKey: 'slug',
    header: 'SLUG',
    cell: ({ row }) => row.original.slug || "-"
  },
  {
    accessorKey: 'description',
    header: 'DESCRIPTION',
    cell: ({ row }) => row.original.description || "-"
  },
  {
    accessorKey: 'parent_id',
    header: 'PARENT CATEGORY',
    cell: ({ row }) => row.original.parent_id ? capitalize(row.original.parent_id) : "None"
  },
  {
    accessorKey: 'status',
    header: 'STATUS',
    cell: ({ row }) => (row.original.status === 1 ? "Active" : "Inactive")
  },
  {
    accessorKey: 'createdAt',
    header: 'CREATED ON',
    cell: ({ row }) => format(new Date(row.original.createdAt), "dd/MM/yyyy")
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
