"use client"

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import UploadModal from "../../../shared/modal/upload-modal";

const UploadButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={cn(buttonVariants({ variant: "default" }))}
      >
        <Plus className="mr-2 h-4 w-4" /> Upload
      </button>
      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => console.log(data)}
      />
    </>
  );
}

export default UploadButton;