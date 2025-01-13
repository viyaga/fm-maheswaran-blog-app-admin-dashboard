"use server"

import axios from "axios";
import { errResponse, getUpdatedFields } from "../utils";
import { generateUsername, getData, setAuthToken } from "./common";
import { revalidateTag } from "next/cache";


const SERVER_ONE = process.env.SERVER_ONE

const getAllAuthors = async (args) => {
    const { fields = "", filters = [], pagination, sort, revalidate = 2, tags = [] } = args
    const url = "/authors";
    
    try {
        const data = await getData({ url, fields, filters, pagination, sort, revalidate, tags });
        
        if (data?.error) return { error: errResponse(data.error) }

        return data;
    } catch (error) {
        return { error: errResponse(error) };
    }

};

const getAuthorById = async ({ authorId, fields = null }) => {
    let apiUrl = `${SERVER_ONE}/authors/${authorId}`;

    if (fields) apiUrl += `?fields=${fields}`

    try {
        setAuthToken()
        const author = await axios.get(apiUrl);
        return athor?.data
    } catch (error) {
        return { error: errResponse(error) };
    }

};

const addAuthor = async (args) => {

    const { first_name, last_name, email, country, password } = args; //role ID = 1 (Author)

    if (!first_name || !last_name || !email ||
        !country || !password) {
        return { error: "Enter Required Field" }
    }


    try {
        setAuthToken()
        const username = await generateUsername(first_name, last_name)
        const authorData = { username, first_name, last_name, email, country, password, role: 1 }

        const newAuthor = await axios.post(`${SERVER_ONE}/authors`, authorData);

        revalidateTag("athors")
        revalidateTag("athorCount")

        return {
            success: true,
            message: "Author added successfully",
            author: newAuthor.data,
        };

    } catch (error) {
        return { error: errResponse(error) };
    }
}


const updateAuthor = async ({ id, authorData, defaultValues }) => {
    if (!id) {
        return { error: "Author ID is required" };
    }

    // Filter out undefined fields
    const updatedFields = getUpdatedFields(authorData, defaultValues);

    if (Object.keys(updatedFields).length === 0) {
        return { error: "No fields to update" };
    }

    if (updatedFields?.password?.length > 0 && updatedFields?.password?.length < 6) {
        return { error: "Password must be at least 6 characters." }
    }

    try {
        // Set authentication token
        setAuthToken();

        // Send PUT request to update author
        const { data } = await axios.put(`${SERVER_ONE}/authors/${id}`, updatedFields);

        // Revalidate cache or update state
        revalidateTag("authors");

        // Return response
        return {
            success: true,
            message: "Author updated successfully",
            author: data,
        };
    } catch (err) {
        return { error: errResponse(err) };
    }
};


const deleteAuthor = async (authorId) => {
    if (!authorId) {
        return { error: "Author ID is required" };
    }

    try {
        // Set authentication token
        setAuthToken();

        // Send DELETE request to delete the author
        const { data } = await axios.delete(`${SERVER_ONE}/authors/${authorId}`);

        // Revalidate cache or update state
        revalidateTag("authors");
        revalidateTag("authorCount")

        // Return success response
        return {
            success: true,
            message: "Author deleted successfully",
            data,
        };
    } catch (err) {
        return { error: errResponse(err) };
    }
};

export {
    getAllAuthors, getAuthorById, addAuthor, updateAuthor, deleteAuthor
}