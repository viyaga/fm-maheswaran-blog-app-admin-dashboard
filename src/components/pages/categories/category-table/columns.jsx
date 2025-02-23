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
    accessorKey: 'username',
    header: 'USERNAME',
    cell: ({ row }) => "@" + row.original.username.toLowerCase()
  },
  {
    accessorKey: 'email',
    header: 'EMAIL'
  },
  {
    accessorKey: 'first_name',
    header: 'FIRST NAME',
    cell: ({ row }) => capitalize(row.original.first_name) || "-"
  },
  {
    accessorKey: 'last_name',
    header: 'LAST NAME',
    cell: ({ row }) => capitalize(row.original.last_name) || "-"
  },
  {
    accessorKey: 'country',
    header: 'COUNTRY',
    cell: ({ row }) => capitalize(row.original.country) || "-"
  },
  {
    accessorKey: 'createdAt',
    header: 'REGISTERED ON',
    cell: ({ row }) => format(new Date(row.original.createdAt), "dd/MM/yyyy")
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
