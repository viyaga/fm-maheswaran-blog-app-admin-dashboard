"use server"

import { signIn, signOut } from "@/auth";
import axios from "axios";
import { revalidateTag } from "next/cache";
const { errResponse, getUpdatedFields } = require("./utils")

const BEARER_API_TOKEN = "Bearer " + process.env.API_TOKEN
const SERVER_ONE = process.env.SERVER_ONE


// services ==========================================


const setAuthToken = () => {
    axios.defaults.headers.common['Authorization'] = BEARER_API_TOKEN
}

const createStrapiApiUrl = (args) => {
    const { url, fields = "", filters = [], pagination = {}, sort = "", populate = "" } = args
    const SERVER_ONE = process.env.SERVER_ONE;

    // Construct fields query
    const fieldsUrl = fields ? `fields=${fields}&` : "";

    // Construct filters query
    let filtersUrl = "";
    if (Array.isArray(filters) && filters.length > 0) {
        filters.forEach((filter) => {
            const { field, operator, value } = filter;
            if (field && operator && value !== undefined) {
                filtersUrl += `filters[${field}][${operator}]=${value}&`;
            }
        });
    }

    // Construct pagination query
    let paginationUrl = "";
    if (pagination.page || pagination.pageSize) {
        const { page, pageSize } = pagination;
        if (page) paginationUrl += `pagination[page]=${page}&`;
        if (pageSize) paginationUrl += `pagination[pageSize]=${pageSize}&`;
    }

    // Construct sort query
    const sortUrl = sort ? `sort=${sort}&` : "";

    // Construct populate query
    const populateUrl = populate ? `populate=${populate}&` : "";

    // Combine all query strings
    const queryString = `${fieldsUrl}${filtersUrl}${paginationUrl}${sortUrl}${populateUrl}`.slice(0, -1); // Remove trailing '&'

    // Construct the full URL
    const fullUrl = `${SERVER_ONE}${url}?${queryString}`;

    return fullUrl;
};


const generateUsername = async (firstName, lastName, attempt = 0) => {
    const normalizedFirstName = firstName.toLowerCase();
    const normalizedLastName = lastName.toLowerCase();

    const baseUsername = `${normalizedFirstName}${normalizedLastName}`;
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const newUsername = `${baseUsername}${randomNumber}`;

    const existingUser = await getData("/users", "username", [
        { field: "username", operator: "$eq", value: newUsername },
    ]);

    if (existingUser?.length > 0) {
        if (attempt >= 10) {
            throw new Error("Unable to generate a unique username after 10 attempts");
        }
        return generateUsername(firstName, lastName, attempt + 1);
    }

    console.log({ newUsername });

    return newUsername;
};


// Data fetching =========================================================
const loginUser = async (email, password) => {
    try {
        await signIn("credentials", { email, password, redirect: false });
        return { success: "Login successfull" }
    } catch (err) {
        console.log({ err });
        return { error: "Wrong Credentials!" }
    }
};

const logoutUser = async () => {
    await signOut()
}

const getData = async (args) => {
    const { url, fields = "", filters = [], pagination = {}, populate = "", sort = "", revalidate = 2, tags = [] } = args

    const fullUrl = createStrapiApiUrl({ url, fields, filters, pagination, populate, sort })
    console.log({ fullUrl });

    try {
        const res = await fetch(fullUrl, {
            method: "GET",
            headers: {
                Authorization: BEARER_API_TOKEN,
                "Content-Type": "application/json",
            },
            next: { revalidate, tags },
        });

        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }

        const data = await res.json();
        return data;

    } catch (error) {
        return { error: errResponse(error) };
    }
};


const getUsers = async (args) => {
    const { fields = "", filters = [], pagination, sort, revalidate = 2, tags = [] } = args
    const url = "/users";

    try {
        const data = await getData({ url, fields, filters, pagination, sort, revalidate, tags });
        if (data.error) return { error: errResponse(error) }

        return data;
    } catch (error) {
        return { error: errResponse(error) };
    }

};

const addUser = async (args) => {

    const { first_name, last_name, email, country, role, password } = args;

    if (!first_name || !last_name || !email ||
        !country || !role || !password) {
        return { error: "Enter Required Field" }
    }


    try {
        setAuthToken()
        const username = await generateUsername(first_name, last_name)
        const userData = { username, first_name, last_name, email, country, role, password }
        console.log({ userData });

        const newUser = await axios.post(`${SERVER_ONE}/users`, userData);
        console.log({ newUser: newUser.data });
        revalidateTag("users")
        return {
            success: true,
            message: "User added successfully",
            user: newUser.data,
        };

    } catch (error) {
        return { error: errResponse(error) };
    }
}

const updateUser = async ({ id, userData, defaultValues }) => {
    if (!id) {
        return { error: "User ID is required" };
    }

    // Filter out undefined fields
    const updatedFields = getUpdatedFields(userData, defaultValues);

    if (Object.keys(updatedFields).length === 0) {
        return { error: "No fields to update" };
    }

    try {
        // Set authentication token
        setAuthToken();

        // Send PUT request to update user
        const { data } = await axios.put(`${process.env.SERVER_ONE}/users/${id}`, updatedFields);

        // Revalidate cache or update state
        revalidateTag("users");

        // Return response
        return {
            success: true,
            message: "User updated successfully",
            user: data,
        };
    } catch (err) {
        console.error("Error updating user:", err);
        return { error: errResponse(err) };
    }
};


const deleteUser = async (userId) => {
    if (!userId) {
        return { error: "User ID is required" };
    }

    try {
        // Set authentication token
        setAuthToken();

        // Send DELETE request to delete the user
        const { data } = await axios.delete(`${process.env.SERVER_ONE}/users/${userId}`);

        // Revalidate cache or update state
        revalidateTag("users");

        // Return success response
        return {
            success: true,
            message: "User deleted successfully",
            data,
        };
    } catch (err) {
        console.error("Error deleting user:", err);
        return { error: errResponse(err) };
    }
};


export {
    generateUsername, createStrapiApiUrl, loginUser, logoutUser, getData,
    getUsers, addUser, updateUser, deleteUser
}