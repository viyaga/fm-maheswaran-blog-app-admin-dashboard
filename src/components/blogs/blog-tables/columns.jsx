'use client';


import Image from 'next/image';
import { CellAction } from './cell-action';

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
    header: 'TITLE'
    
  },
  {
    accessorKey: 'subtitle',
    header: 'SUBTITLE'
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
    header: 'STATUS'
  },
  {
    accessorKey: 'createdAt',
    header: 'Created On'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
