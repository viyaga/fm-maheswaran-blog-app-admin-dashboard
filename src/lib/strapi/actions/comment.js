"use server";

import axios from "axios";
import { errResponse, getUpdatedFields } from "../../utils";
import { asyncHandler, getData } from "./common";
import { revalidateTag } from "next/cache";

const STRAPI_API_ENDPOINT = process.env.STRAPI_API_ENDPOINT;

const getAllComments = asyncHandler(async (args) => {
    const { fields = "", filters = [], pagination, sort, revalidate = 2, tags = [] } = args;
    const url = "/comments";
    populate = "website_user";

    const { data, count } = await getData({ url, fields, filters, pagination, sort, revalidate, tags });
    if (data?.error) return { error: errResponse(data.error) };

    return { data, count };
});

const getCommentById = asyncHandler(async ({ documentId, fields = null }) => {
    if (!documentId) return { error: "Comment ID is required." };

    let apiUrl = `${STRAPI_API_ENDPOINT}/comments/${documentId}`;
    if (fields) apiUrl += `?fields=${fields}`;

    const res = await axios.get(apiUrl);
    if (!res?.data?.data) throw new Error("Comment Not Found");

    return res?.data?.data;
});

const addComment = asyncHandler(async (commentData) => {
    const requiredFields = ["content", "username", "blog"];
    const missingFields = requiredFields.filter((field) => !commentData[field]);

    if (missingFields.length > 0) {
        return { error: `Missing required fields: ${missingFields.join(", ")}` };
    }

    const { data } = await axios.post(`${STRAPI_API_ENDPOINT}/comments`, { data: commentData });
    revalidateTag("comments");

    return {
        success: true,
        message: "Comment added successfully",
        comment: data,
    };
});

const updateComment = asyncHandler(async ({ documentId, commentData, defaultValues }) => {
    if (!documentId) return { error: "Comment ID is required" };

    const updatedFields = getUpdatedFields(commentData, defaultValues);
    if (Object.keys(updatedFields).length === 0) {
        return { error: "No fields to update" };
    }

    const { data } = await axios.put(`${STRAPI_API_ENDPOINT}/comments/${documentId}`, { data: updatedFields });
    revalidateTag("comments");

    return {
        success: true,
        message: "Comment updated successfully",
        comment: data,
    };
});

const deleteComment = asyncHandler(async (documentId) => {
    if (!documentId) {
        return { error: "Comment ID is required" };
    }

    const { data } = await axios.delete(`${STRAPI_API_ENDPOINT}/comments/${documentId}`);
    revalidateTag("comments");

    return {
        success: true,
        message: "Comment deleted successfully",
        data,
    };
});

export {
    getAllComments,
    getCommentById,
    addComment,
    updateComment,
    deleteComment
};
