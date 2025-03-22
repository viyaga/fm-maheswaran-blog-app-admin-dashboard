"use client";

import { useForm } from "react-hook-form";
import { Modal } from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FileUploader } from "@/components/file-uploader";
import { toast } from "sonner";
import { addMultipleFiles } from "@/lib/strapi/client-actions";

const UploadModal = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFormSubmit = () => {

    toast.promise(addMultipleFiles(uploadedFiles), {
      loading: `Uploading...`,
      success: () => {
        reset();
        setUploadedFiles([]);
        onClose();
        return `uploaded`;
      },
      error: `Failed to upload files`,
    });
    // await addMultipleFiles(uploadedFiles)

    // onSubmit({ ...uploadedFiles });

  };

  return (
    <Modal
      title="Upload Media"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="files"
            className="block text-sm font-medium text-gray-700"
          >
            Choose Files
          </label>
          <FileUploader
            value={uploadedFiles}
            onValueChange={(files) => setUploadedFiles(files)}
            maxFiles={5}
            accept={{ "image/*": [] }}
            multiple
          />
          {errors.files && (
            <p className="text-sm text-red-600">{errors.files.message}</p>
          )}
        </div>

        <div className="flex w-full items-center justify-end space-x-2 pt-6">
          <Button
            type="button"
            disabled={false}
            variant="outline"
            onClick={() => {
              reset();
              setUploadedFiles([]);
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={false}
            variant="default"
          >
            Upload
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UploadModal;
