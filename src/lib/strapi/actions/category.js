"use server";

import axios from "axios";
import { errResponse, getUpdatedFields } from "../../utils";
import { asyncHandler, getData } from "./common";
import { revalidateTag } from "next/cache";

const STRAPI_API_ENDPOINT = process.env.STRAPI_API_ENDPOINT;

const getAllCategories = asyncHandler(async (args) => {
    const { fields = "", filters = [], pagination, sort, revalidate = 2, tags = [], populate } = args;
    const url = "/categories";

    const { data, count } = await getData({ url, fields, filters, pagination, sort, revalidate, tags, populate });
    if (data?.error) return { error: errResponse(data.error) };

    return { data, count };
});

const getCategoryById = asyncHandler(async ({ documentId, fields = null, populate }) => {
    if (!documentId) return { error: "Category ID is required." };

    const { data } = await getData({ url: `/categories/${documentId}`, fields, populate, tags: ["categories"] })

    if (data?.error)  return { error: errResponse(data.error) };

    return data;
});

const addCategory = asyncHandler(async (categoryData) => {
    const requiredFields = ["name", "slug"];
    const missingFields = requiredFields.filter((field) => !categoryData[field]);

    if (missingFields.length > 0) {
        return { error: `Missing required fields: ${missingFields.join(", ")}` };
    }

    const { data } = await axios.post(`${STRAPI_API_ENDPOINT}/categories`, { data: categoryData });
    revalidateTag("categories");

    return {
        success: true,
        message: "Category added successfully",
        category: data,
    };
});

const updateCategory = asyncHandler(async ({ documentId, categoryData, defaultValues }) => {
    if (!documentId) return { error: "Category ID is required" };

    const updatedFields = getUpdatedFields(categoryData, defaultValues);
    if (Object.keys(updatedFields).length === 0) {
        return { error: "No fields to update" };
    }

    const { data } = await axios.put(`${STRAPI_API_ENDPOINT}/categories/${documentId}`, { data: updatedFields });
    revalidateTag("categories");

    return {
        success: true,
        message: "Category updated successfully",
        category: data,
    };
});

const deleteCategory = asyncHandler(async (documentId) => {
    if (!documentId) {
        return { error: "Category ID is required" };
    }

    const { data } = await axios.delete(`${STRAPI_API_ENDPOINT}/categories/${documentId}`);
    revalidateTag("categories");

    return {
        success: true,
        message: "Category deleted successfully",
        data,
    };
});

export {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory
};
