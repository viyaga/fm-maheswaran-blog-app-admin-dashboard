"use server"

import axios from "axios";
import { errResponse, getUpdatedFields } from "../utils";
import { generateUsername, getData, setAuthToken } from "./common";
import { revalidateTag } from "next/cache";


const SERVER_ONE = process.env.SERVER_ONE

const getAllBlogs = async (args) => {
    const { fields = "", filters = [], pagination, sort, revalidate = 2, tags = [] } = args
    const url = "/blogs";

    try {
        const { data, count } = await getData({ url, fields, filters, pagination, sort, revalidate, tags });
        console.log({ data });

        if (data?.error) return { error: errResponse(data.error) }

        return { data, count };
    } catch (error) {
        return { error: errResponse(error) };
    }

};

const getBlogById = async ({ blogId, fields = null }) => {
    let apiUrl = `${SERVER_ONE}/blogs/${blogId}`;

    if (fields) apiUrl += `?fields=${fields}`

    try {
        setAuthToken()
        const blog = await axios.get(apiUrl);
        return athor?.data
    } catch (error) {
        return { error: errResponse(error) };
    }

};

const addBlog = async (args) => {

    const { first_name, last_name, email, country, password } = args; //role ID = 1 (blog)

    if (!first_name || !last_name || !email ||
        !country || !password) {
        return { error: "Enter Required Field" }
    }


    try {
        setAuthToken()
        const username = await generateUsername(first_name, last_name)
        const blogData = { username, first_name, last_name, email, country, password, role: 1 }

        const newBlog = await axios.post(`${SERVER_ONE}/blogs`, blogData);

        revalidateTag("athors")
        revalidateTag("athorCount")

        return {
            success: true,
            message: "Blog added successfully",
            blog: newBlog.data,
        };

    } catch (error) {
        return { error: errResponse(error) };
    }
}


const updateBlog = async ({ id, blogData, defaultValues }) => {
    if (!id) {
        return { error: "Blog ID is required" };
    }

    // Filter out undefined fields
    const updatedFields = getUpdatedFields(blogData, defaultValues);

    if (Object.keys(updatedFields).length === 0) {
        return { error: "No fields to update" };
    }

    if (updatedFields?.password?.length > 0 && updatedFields?.password?.length < 6) {
        return { error: "Password must be at least 6 characters." }
    }

    try {
        // Set authentication token
        setAuthToken();

        // Send PUT request to update blog
        const { data } = await axios.put(`${SERVER_ONE}/blogs/${id}`, updatedFields);

        // Revalidate cache or update state
        revalidateTag("blogs");

        // Return response
        return {
            success: true,
            message: "Blog updated successfully",
            blog: data,
        };
    } catch (err) {
        return { error: errResponse(err) };
    }
};


const deleteBlog = async (blogId) => {
    if (!blogId) {
        return { error: "Blog ID is required" };
    }

    try {
        // Set authentication token
        setAuthToken();

        // Send DELETE request to delete the blog
        const { data } = await axios.delete(`${SERVER_ONE}/blogs/${blogId}`);

        // Revalidate cache or update state
        revalidateTag("blogs");
        revalidateTag("blogCount")

        // Return success response
        return {
            success: true,
            message: "Blog deleted successfully",
            data,
        };
    } catch (err) {
        return { error: errResponse(err) };
    }
};

export {
    getAllBlogs, getBlogById, addBlog, updateBlog, deleteBlog
}