"use server";

import axios from "axios";
import { errResponse, getUpdatedFields } from "../utils";
import { asyncHandler, getData } from "./common";
import { revalidateTag } from "next/cache";

const SERVER_ONE = process.env.SERVER_ONE;

const getAllBlogs = asyncHandler(async (args) => {
    const { fields = "", filters = [], pagination, sort, revalidate = 2, tags = [] } = args;
    const url = "/blogs";

    const { data, count } = await getData({ url, fields, filters, pagination, sort, revalidate, tags });
    
    if (data?.error) return { error: errResponse(data.error) };

    return { data, count };
});

const getBlogById = asyncHandler(async ({ documentId, fields = null, populate = [] }) => {
    if (!documentId) return { error: "Blog ID is required." };

    let apiUrl = `${SERVER_ONE}/blogs/${documentId}`;
    if (fields) apiUrl += `?fields=${fields}`;

    
    const res = await axios.get(apiUrl);
    if(res?.data?.data?.blog_status === "deleted") throw new Error("Blog Not Found");

    return res?.data?.data;
});

const addBlog = asyncHandler(async (blogData) => {
    const requiredFields = ["title", "slug", "free_content", "blog_status"];
    const missingFields = requiredFields.filter((field) => !blogData[field]);

    if (missingFields.length > 0) {
        return { error: `Missing required fields: ${missingFields.join(", ")}` };
    }

    
    const { data } = await axios.post(`${SERVER_ONE}/blogs`, { data: blogData });
    revalidateTag("blogs");

    return {
        success: true,
        message: "Blog added successfully",
        blog: data,
    };
});

const updateBlog = asyncHandler(async ({ documentId, blogData, defaultValues }) => {
    if (!documentId) return { error: "Blog ID is required" };

    const requiredFields = ["title", "slug", "free_content", "blog_status"];
    const missingFields = requiredFields.filter((field) => !blogData[field]);

    if (missingFields.length > 0) {
        return { error: `Missing required fields: ${missingFields.join(", ")}` };
    }

    const updatedFields = getUpdatedFields(blogData, defaultValues);
    if (Object.keys(updatedFields).length === 0) {
        return { error: "No fields to update" };
    }

    
    const { data } = await axios.put(`${SERVER_ONE}/blogs/${documentId}`, { data: updatedFields });
    revalidateTag("blogs");

    return {
        success: true,
        message: "Blog updated successfully",
        blog: data,
    };
});

const deleteBlog = asyncHandler(async (documentId) => {
    if (!documentId) {
        return { error: "Blog ID is required" };
    }

    
    const { data } = await axios.put(`${SERVER_ONE}/blogs/${documentId}`, { data: { blog_status: "deleted" } });
    revalidateTag("blogs");

    return {
        success: true,
        message: "Blog deleted successfully",
        data,
    };
});

export {
    getAllBlogs,
    getBlogById,
    addBlog,
    updateBlog,
    deleteBlog
};
