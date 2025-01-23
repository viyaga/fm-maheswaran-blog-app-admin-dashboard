'use client';


import Image from 'next/image';
import { CellAction } from './cell-action';
import { format } from 'date-fns';
import { capitalize } from '@/lib/utils';

export const columns = [
  {
    accessorKey: 'featured_image',
    header: 'IMAGE',
    cell: ({ row }) => {
      return (
        <div className="relative aspect-square">
          <Image
            src={row.getValue('featured_image')}
            alt={row.getValue('title')}
            fill
            className="rounded-lg"
          />
        </div>
      );
    }
  },
  {
    accessorKey: 'title',
    header: 'TITLE',
    cell: ({ row }) => capitalize(row.original.title) || "-"
  },
  {
    accessorKey: 'views',
    header: 'VIEWS'
  },
  {
    accessorKey: 'comments_count',
    header: 'COMMENTS'
  },
  {
    accessorKey: 'blog_status',
    header: 'STATUS',
    cell: ({ row }) => capitalize(row.original.blog_status) || "-"
  },
  {
    accessorKey: 'createdAt',
    header: 'Created On',
    cell: ({ row }) => format(new Date(row.original.createdAt), "dd/MM/yyyy")
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
