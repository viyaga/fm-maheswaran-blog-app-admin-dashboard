"use client";

import { useForm } from "react-hook-form";
import { Modal } from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FileUploader } from "@/components/file-uploader";
import { toast } from "sonner";
import { revalidateByTag } from "@/lib/strapi/actions/common";

const UploadModal = ({ isOpen, onClose }) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Function to upload multiple files to Strapi
  const addMultipleFiles = async (files) => {
    if (!files.length) {
      throw new Error("No files selected");
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload files.");
      }

      revalidateByTag("mediaFiles");
      return await response.json();
    } catch (error) {
      throw new Error(error.message || "Upload failed.");
    }
  };

  // Handle form submission
  const handleFormSubmit = () => {
    toast.promise(addMultipleFiles(uploadedFiles), {
      loading: "Uploading...",
      success: () => {
        reset();
        setUploadedFiles([]);
        onClose();
        return "Files uploaded successfully!";
      },
      error: "Failed to upload files.",
    });
  };

  return (
    <Modal title="Upload Media" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label htmlFor="files" className="block text-sm font-medium text-gray-700">
            Choose Files
          </label>
          <FileUploader
            value={uploadedFiles}
            onValueChange={(files) => setUploadedFiles(files)}
            maxFiles={5}
            accept={{ "image/*": [] }}
            multiple
          />
          {errors.files && <p className="text-sm text-red-600">{errors.files.message}</p>}
        </div>

        <div className="flex w-full items-center justify-end space-x-2 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset();
              setUploadedFiles([]);
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="default">
            Upload
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UploadModal;
