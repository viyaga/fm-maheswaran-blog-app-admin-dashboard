'use client';

import { AlertModal } from '@/components/shared/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { deleteComment, updateComment } from '@/lib/strapi';
import { Ban, Check, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

export const CellAction = ({ data }) => {
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = () => {
    startTransition(async () => {
      const res = await deleteComment(data?.documentId)
      setOpen(false)

      if (res?.success) return toast.success(res?.message) //if success
      return toast.error(res?.error) // if error
    })
  };

  const onApprove = async() => {
    const res = await updateComment({ documentId: data?.documentId, updatedFields: { comment_status: "approved" } })
    if (res?.success) return toast.success(res?.message) //if success
    return toast.error(res?.error) // if error
  }

  const onSpam = async() => {
    const res = await updateComment({ documentId: data?.documentId, updatedFields: { comment_status: "spam" } })
    if (res?.success) return toast.success(res?.message) //if success
    return toast.error(res?.error) // if error
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={isPending}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => onApprove()}>
            <Check className="mr-2 h-4 w-4" /> Approve
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSpam()}>
            <Ban className="mr-2 h-4 w-4" /> Spam 
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};