"use server";

import axios from "axios";
import { errResponse, getUpdatedFields } from "../utils";
import { getData, setAuthToken } from "./common";
import { revalidateTag } from "next/cache";

const SERVER_ONE = process.env.SERVER_ONE;

const getAllBlogs = async (args) => {
    const { fields = "", filters = [], pagination, sort, revalidate = 2, tags = [] } = args;
    const url = "/blogs";

    try {
        const { data, count } = await getData({ url, fields, filters, pagination, sort, revalidate, tags });

        if (data?.error) return { error: errResponse(data.error) };

        return { data, count };
    } catch (error) {
        return { error: errResponse(error) };
    }
};

const getBlogById = async ({ blogId, fields = null, populate = [] }) => {
    if (!blogId) return { error: "Blog ID is required." };

    let apiUrl = `${SERVER_ONE}/blogs/${blogId}`;
    if (fields) apiUrl += `?fields=${fields}`;

    console.log({ apiUrl });


    try {
        setAuthToken();
        const res = await axios.get(apiUrl);
        return res?.data?.data;                      // strapi returuns { data:[], meta:{}}
    } catch (error) {
        return { error: errResponse(error) };
    }
};

const addBlog = async (blogData) => {
    const requiredFields = ["title", "slug", "content", "blog_status"];
    const missingFields = requiredFields.filter((field) => !blogData[field]);

    if (missingFields.length > 0) {
        return { error: `Missing required fields: ${missingFields.join(", ")}` };
    }

    try {
        setAuthToken();
        const { data } = await axios.post(`${SERVER_ONE}/blogs`, { data: blogData });
        revalidateTag("blogs");
        revalidateTag("blogCount");

        return {
            success: true,
            message: "Blog added successfully",
            blog: data,
        };
    } catch (error) {
        return { error: errResponse(error) };
    }
};

const updateBlog = async ({ documentId, blogData, defaultValues }) => {
    if (!documentId) return { error: "Blog ID is required" };

    const updatedFields = getUpdatedFields(blogData, defaultValues);
    if (Object.keys(updatedFields).length === 0) {
        return { error: "No fields to update" };
    }

    console.log({ updatedFields });

    try {
        setAuthToken();
        const { data } = await axios.put(`${SERVER_ONE}/blogs/${documentId}`, { data: updatedFields });
        revalidateTag("blogs");

        return {
            success: true,
            message: "Blog updated successfully",
            blog: data,
        };
    } catch (error) {
        return { error: errResponse(error) };
    }
};

const deleteBlog = async (blogId) => {
    if (!blogId) {
        return { error: "Blog ID is required" };
    }

    try {
        setAuthToken();
        const { data } = await axios.delete(`${SERVER_ONE}/blogs/${blogId}`);
        revalidateTag("blogs");
        revalidateTag("blogCount");

        return {
            success: true,
            message: "Blog deleted successfully",
            data,
        };
    } catch (error) {
        return { error: errResponse(error) };
    }
};

export {
    getAllBlogs,
    getBlogById,
    addBlog,
    updateBlog,
    deleteBlog
};
