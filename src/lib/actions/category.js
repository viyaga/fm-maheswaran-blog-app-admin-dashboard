"use server";

import axios from "axios";
import { errResponse, getUpdatedFields } from "../utils";
import { asyncHandler, getData } from "./common";
import { revalidateTag } from "next/cache";

const SERVER_ONE = process.env.SERVER_ONE;

const getAllCategories = asyncHandler(async (args) => {
    const { fields = "", filters = [], pagination, sort, revalidate = 2, tags = [] } = args;
    const url = "/blog-categories";

    const { data, count } = await getData({ url, fields, filters, pagination, sort, revalidate, tags });
    if (data?.error) return { error: errResponse(data.error) };

    return { data, count };
});

const getCategoryById = asyncHandler(async ({ documentId, fields = null }) => {
    if (!documentId) return { error: "Category ID is required." };

    let apiUrl = `${SERVER_ONE}/blog-categories/${documentId}`;
    if (fields) apiUrl += `?fields=${fields}`;

    const res = await axios.get(apiUrl);
    if (!res?.data?.data) throw new Error("Category Not Found");

    return res?.data?.data;
});

const addCategory = asyncHandler(async (categoryData) => {
    const requiredFields = ["name", "slug"];
    const missingFields = requiredFields.filter((field) => !categoryData[field]);

    if (missingFields.length > 0) {
        return { error: `Missing required fields: ${missingFields.join(", ")}` };
    }

    const { data } = await axios.post(`${SERVER_ONE}/blog-categories`, { data: categoryData });
    revalidateTag("blog-categories");

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

    const { data } = await axios.put(`${SERVER_ONE}/blog-categories/${documentId}`, { data: updatedFields });
    revalidateTag("blog-categories");

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

    const { data } = await axios.delete(`${SERVER_ONE}/blog-categories/${documentId}`);
    revalidateTag("blog-categories");

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
