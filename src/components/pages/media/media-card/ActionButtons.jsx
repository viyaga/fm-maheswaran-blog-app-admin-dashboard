"use client"

import { useState, useTransition } from "react";
import { Copy, Trash2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertModal } from "@/components/shared/modal/alert-modal";
import { toast } from "sonner";
import { deleteMediaFile } from "@/lib/strapi/actions/media";

const ActionButtons = ({ id, imgUrl }) => {
    const [copied, setCopied] = useState(false);
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleCopy = () => {
        navigator.clipboard.writeText(imgUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copy status after 2 seconds
    };

    const handleDelete = () => {
        startTransition(async () => {
            const res = await deleteMediaFile(id)
            setOpen(false)

            console.log({res});
            
            if (res?.success) return toast.success(res?.message) //if success
            return toast.error(res?.error) // if error
        })
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={handleDelete}
                loading={isPending}
            />
            <div className="flex gap-2">
                {/* Copy Button */}
                <button
                    onClick={handleCopy}
                    className={cn(buttonVariants({ variant: "ghost" }), "p-2")}
                    title="Copy URL"
                >
                    {copied ? (
                        <span className="text-green-500 dark:text-green-400">✔</span>
                    ) : (
                        <Copy className="h-5 w-5 text-gray-600 dark:text-gray-300 hover:text-primary" />
                    )}
                </button>

                <button
                    onClick={() => setOpen(true)}
                    className={cn(buttonVariants({ variant: "ghost" }), "p-2")}
                    title="Delete"
                >
                    <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-500" />
                </button>

            </div>
        </>
    )
}

export default ActionButtons
