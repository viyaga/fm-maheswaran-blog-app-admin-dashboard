'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { CellAction } from './cell-action';
import { format } from 'date-fns';
import { capitalize, Utils } from '@/lib/utils';

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
    accessorKey: 'website_user',
    header: 'USERNAME',
    cell: ({ row }) => "@" + row.original.website_user.username.toLowerCase()
  },
  {
    accessorKey: 'blog',
    header: 'Blog',
    cell: ({ row }) => Utils.textTruncate(row.original.blog.title, 20) || "-"
  },
  {
    accessorKey: 'content',
    header: 'CONTENT',
    cell: ({ row }) => row.original.content || "-"
  },
  {
    accessorKey: 'comment_status',
    header: 'STATUS',
    cell: ({ row }) => capitalize(row.original.comment_status) || "-"
  },
  {
    accessorKey: 'createdAt',
    header: 'COMMENTED ON',
    cell: ({ row }) => format(new Date(row.original.createdAt), "dd/MM/yyyy")
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];