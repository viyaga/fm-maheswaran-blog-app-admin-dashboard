import { errResponse } from "@/lib/utils";
import qs from "qs";

const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
};

// Generic Strapi Fetch Function
export async function strapiFetch({ path, query, method = "GET", body, tags, revalidateTime = 60 * 60 * 24 * 365 }) {
  try {
    const url = `${endpoint}${path}${query ? `?${qs.stringify(query, { encodeValuesOnly: true })}` : ""}`;
    console.log({ url, query });

    const result = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      ...(tags && { next: { tags, revalidate: revalidateTime } }),
    });

    let responseBody = null;
    if (method !== "DELETE") responseBody = await result.json();

    if (!result.ok) {
      throw responseBody;
    }

    return { status: result.status, body: responseBody };
  } catch (e) {
    console.log({ error: e });
    return { error: errResponse(e) };
  }
}


// 🔹 Upload Media File
export async function addMediaFile(fileData, additionalData = {}) {
  if (!fileData) return { error: "File data is required." };

  // Modify the file name to lowercase
  const lowerCaseFileName = fileData.name.toLowerCase();
  const renamedFile = new File([fileData], lowerCaseFileName, { type: fileData.type });

  const formData = new FormData();
  formData.append("files", renamedFile);

  Object.keys(additionalData).forEach((key) => {
    formData.append(`data.${key}`, additionalData[key]);
  });

  console.log({env:process.env.NEXT_PUBLIC_API_TOKEN});
  
  try {
    const response = await fetch(`${endpoint}/upload`, {
      method: "POST",
      body: formData,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
    });

    if (!response.ok) throw new Error("Failed to upload file.");

    const data = await response.json();

    console.log({ data });

    return {
      success: true,
      message: "File uploaded successfully",
      data,
    };
  } catch (error) {
    console.log({ error });

    return { error: errResponse(error) };
  }
}

export async function addMultipleFiles(files, additionalData = {}) {
  if (!files || files.length === 0) {
    return { error: "No files selected." };
  }

  console.log({ files, additionalData });


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
    const response = await fetch(`${endpoint}/upload`, {
      method: "POST",
      body: formData,
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
    });

    if (!response.ok) throw new Error("Failed to upload files.");

    const data = await response.json();

    console.log({ data });

    return {
      success: true,
      message: "Files uploaded successfully",
      data,
    };
  } catch (error) {
    throw error;
    // return { error: errResponse(error) };
  }
}
