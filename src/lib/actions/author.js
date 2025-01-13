"use server";

import axios from "axios";
import { errResponse, getUpdatedFields } from "../utils";
import { generateUsername, getData, setAuthToken } from "./common";
import { revalidateTag } from "next/cache";
import bcrypt from "bcryptjs"

const SERVER_ONE = process.env.SERVER_ONE;

const getAllAuthors = async (args) => {
    const { fields = "", filters = [], pagination, sort, revalidate = 2, tags = [] } = args;
    const url = "/authors";

    try {
        const { data, count } = await getData({ url, fields, filters, pagination, sort, revalidate, tags });

        if (data?.error) return { error: errResponse(data.error) };

        console.log({ data, count });

        return { data, count };
    } catch (error) {
        return { error: errResponse(error) };
    }
};

const getAuthorById = async ({ documentId, fields = null, populate = [] }) => {
    if (!documentId) return { error: "Author ID is required." };

    let apiUrl = `${SERVER_ONE}/authors/${documentId}`;
    if (fields) apiUrl += `?fields=${fields}`;

    try {
        setAuthToken();
        const res = await axios.get(apiUrl);
        if (res?.data?.data?.author_status === 0) throw new Error("Author Not Found");

        return res?.data?.data; // strapi returns { data:[], meta:{} }
    } catch (error) {
        return { error: errResponse(error) };
    }
};

const addAuthor = async (authorData) => {
    const requiredFields = ["first_name", "last_name", "email", "password"];
    const missingFields = requiredFields.filter((field) => !authorData[field]);

    if (missingFields.length > 0) {
        return { error: `Missing required fields: ${missingFields.join(", ")}` };
    }

    const { first_name, last_name, password } = authorData;

    // Encrypt the password before proceeding
    const saltRounds = 10;
    try {
        authorData.password = await bcrypt.hash(password, saltRounds);
    } catch (encryptionError) {
        return { error: "Failed to encrypt the password." };
    }

    // Generate username
    authorData.username = await generateUsername({ first_name, last_name, url: "/authors" });

    console.log({ authorData });
    try {
        setAuthToken();
        const { data } = await axios.post(`${SERVER_ONE}/authors`, { data: authorData });
        revalidateTag("authors");

        return {
            success: true,
            message: "Author added successfully",
            author: data,
        };
    } catch (error) {
        console.log({ error });

        return { error: errResponse(error) };
    }
};

const updateAuthor = async ({ documentId, authorData, defaultValues }) => {
    if (!documentId) return { error: "Author ID is required" };

    const updatedFields = getUpdatedFields(authorData, defaultValues);
    if (Object.keys(updatedFields).length === 0) {
        return { error: "No fields to update" };
    }

    const { password } = updatedFields;

    if (password?.length > 0) {

        if (password?.length < 6) {
            return { error: "Password must be at least 6 characters." }
        }

        // Encrypt the password before proceeding
        const saltRounds = 10;
        try {
            updatedFields.password = await bcrypt.hash(password, saltRounds);
        } catch (encryptionError) {
            console.log({encryptionError});
            
            return { error: "Failed to encrypt the password." };
        }
    }

    try {
        setAuthToken();
        const { data } = await axios.put(`${SERVER_ONE}/authors/${documentId}`, { data: updatedFields });
        revalidateTag("authors");

        return {
            success: true,
            message: "Author updated successfully",
            author: data,
        };
    } catch (error) {
        return { error: errResponse(error) };
    }
};

const deleteAuthor = async (documentId) => {

    if (!documentId) {
        return { error: "Author ID is required" };
    }

    try {

        setAuthToken();
        const { data } = await axios.delete(`${SERVER_ONE}/authors/${documentId}`);
        revalidateTag("authors");

        return {
            success: true,
            message: "Author deleted successfully",
            data,
        };

    } catch (error) {
        console.log({ error });

        return { error: errResponse(error) };
    }
};

export {
    getAllAuthors,
    getAuthorById,
    addAuthor,
    updateAuthor,
    deleteAuthor
};
