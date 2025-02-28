"use server";

import axios from "axios";
import { errResponse, getUpdatedFields } from "../../utils";
import { asyncHandler, generateUsername, getData, setAuthToken } from "./common";
import { revalidateTag } from "next/cache";
import bcrypt from "bcryptjs";

const STRAPI_API_ENDPOINT = process.env.STRAPI_API_ENDPOINT;

const getAllUsers = asyncHandler(async (args) => {
    const { fields = "", filters = [], pagination, sort, revalidate = 2, tags = [] } = args;
    const url = "/website-users";

    const { data, count } = await getData({ url, fields, filters, pagination, sort, revalidate, tags });

    if (data?.error) return { error: errResponse(data.error) };

    return { data, count };
});

const getUserById = asyncHandler(async ({ documentId, fields = null, populate = [] }) => {
    if (!documentId) return { error: "User ID is required." };

    let apiUrl = `${STRAPI_API_ENDPOINT}/website-users/${documentId}`;
    if (fields) apiUrl += `?fields=${fields}`;

    
    const res = await axios.get(apiUrl);
    if (res?.data?.data?.user_status === 0) throw new Error("User Not Found");

    return res?.data?.data;
});

const addUser = asyncHandler(async (userData) => {
    const requiredFields = ["first_name", "last_name", "email", "password", "country"];
    const missingFields = requiredFields.filter((field) => !userData[field]);

    if (missingFields.length > 0) {
        return { error: `Missing required fields: ${missingFields.join(", ")}` };
    }

    const { first_name, last_name, email, password } = userData;

    // Encrypt the password before proceeding
    const saltRounds = 10;
    userData.password = await bcrypt.hash(password, saltRounds);

    

    // Check if email already exists
    const existingUser = await getData({ url: "/website-users", fields: "email", filters: [{ field: "email", operator: "$eq", value: email }] });

    if (existingUser?.data?.length > 0) {
        throw new Error("Email must be unique");
    }

    // Generate username
    userData.username = await generateUsername({ first_name, last_name, url: "/website-users" });

    const { data } = await axios.post(`${STRAPI_API_ENDPOINT}/website-users`, { data: userData });
    revalidateTag("users");

    return {
        success: true,
        message: "User added successfully",
        user: data,
    };
});

const updateUser = asyncHandler(async ({ documentId, userData, defaultValues }) => {
    if (!documentId) return { error: "User ID is required" };

    const updatedFields = getUpdatedFields(userData, defaultValues);
    if (Object.keys(updatedFields).length === 0) {
        return { error: "No fields to update" };
    }

    const { email, password } = updatedFields;

    if (password?.length > 0) {
        if (password?.length < 6) {
            return { error: "Password must be at least 6 characters." };
        }

        // Encrypt the password before proceeding
        const saltRounds = 10;
        updatedFields.password = await bcrypt.hash(password, saltRounds);
    }

    

    // Check if email already exists
    if (email) {
        const existingUser = await getData({ url: "/website-users", fields: "email", filters: [{ field: "email", operator: "$eq", value: email }] });

        if (existingUser?.data?.length > 0) {
            throw new Error("Email must be unique");
        }
    }

    const { data } = await axios.put(`${STRAPI_API_ENDPOINT}/website-users/${documentId}`, { data: updatedFields });
    revalidateTag("users");

    return {
        success: true,
        message: "User updated successfully",
        user: data,
    };
});

const deleteUser = asyncHandler(async (documentId) => {
    if (!documentId) {
        return { error: "User ID is required" };
    }

    
    const { data } = await axios.delete(`${STRAPI_API_ENDPOINT}/website-users/${documentId}`);
    revalidateTag("users");

    return {
        success: true,
        message: "User deleted successfully",
        data,
    };
});

export {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
};
