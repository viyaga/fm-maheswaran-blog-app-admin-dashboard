"use server";

import axios from "axios";
import { errResponse, getUpdatedFields } from "../../utils";
import { asyncHandler, getData, getMediaData } from "./common";
import { revalidateTag } from "next/cache";

const STRAPI_API_ENDPOINT = process.env.STRAPI_API_ENDPOINT;

// Get All Media Files
const getAllMediaFiles = asyncHandler(async (args) => {
  const { fields = "", filters = [], pagination, sort = "", revalidate = 2, tags = [] } = args;
  const url = "/upload/files";

  const data = await getMediaData({ url, fields, filters, pagination, sort, revalidate, tags });

  if (data?.error) return { error: errResponse(data.error) };

  return data;
});

// Get Media File by ID
const getMediaFileById = asyncHandler(async ({ documentId, fields = null }) => {
  if (!documentId) return { error: "Media File ID is required." };

  let apiUrl = `${STRAPI_API_ENDPOINT}/upload/files/${documentId}`;
  if (fields) apiUrl += `?fields=${fields}`;

  const res = await axios.get(apiUrl);

  if (!res?.data) throw new Error("Media File Not Found");

  return res?.data;
});

// Add Media File
const addMediaFile = asyncHandler(async (fileData, additionalData = {}) => {
  if (!fileData) return { error: "File data is required." };

  // Modify the file name to lowercase
  const lowerCaseFileName = fileData.name.toLowerCase();
  const renamedFile = new File([fileData], lowerCaseFileName, { type: fileData.type });

  const formData = new FormData();
  formData.append("files", renamedFile);

  Object.keys(additionalData).forEach((key) => {
    formData.append(`data.${key}`, additionalData[key]);
  });

  const { data } = await axios.post(`${STRAPI_API_ENDPOINT}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  revalidateTag("mediaFiles");

  return {
    success: true,
    message: "File uploaded successfully",
    data,
  };
});


const addMultipleFiles = asyncHandler(async (files, additionalData = {}) => {
  if (!files || files.length === 0) {
    return { error: "No files selected." };
  }

  const formData = new FormData();

  // Append each file to the FormData object after converting the file name to lowercase
  files.forEach((file) => {
    const lowerCaseFileName = file.name.toLowerCase();
    const renamedFile = new File([file], lowerCaseFileName, { type: file.type });
    formData.append("files", renamedFile);
  });

  // Add additional metadata to FormData
  Object.keys(additionalData).forEach((key) => {
    formData.append(`data.${key}`, additionalData[key]);
  });

  try {
    const { data } = await axios.post(`${STRAPI_API_ENDPOINT}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    revalidateTag("mediaFiles");

    return {
      success: true,
      message: "Files uploaded successfully",
      upload: data,
    };
  } catch (error) {
    return { error: "Failed to upload files." };
  }
});



// Update Media File Metadata
const updateMediaFile = asyncHandler(async ({ documentId, updateData }) => {
  if (!documentId) return { error: "Media File ID is required" };

  const updatedFields = getUpdatedFields(updateData);
  if (Object.keys(updatedFields).length === 0) {
    return { error: "No fields to update" };
  }

  const { data } = await axios.put(`${STRAPI_API_ENDPOINT}/upload/files/${documentId}`, { data: updatedFields });
  revalidateTag("mediaFiles");

  return {
    success: true,
    message: "Media File metadata updated successfully",
    upload: data,
  };
});

// Delete Media File
const deleteMediaFile = asyncHandler(async (id) => {
  if (!id) {
    return { error: "Media File ID is required" };
  }

  const { data } = await axios.delete(`${STRAPI_API_ENDPOINT}/upload/files/${id}`);
  revalidateTag("mediaFiles");

  console.log({data});
  
  return {
    success: true,
    message: "Media File deleted successfully",
    data,
  };
});

export {
  getAllMediaFiles,
  getMediaFileById,
  addMediaFile,
  addMultipleFiles,
  updateMediaFile,
  deleteMediaFile,
};
