"use server";

import axios from "axios";
import { errResponse, getUpdatedFields } from "../utils";
import { generateUsername, getData, setAuthToken } from "./common";
import { revalidateTag } from "next/cache";
import bcrypt from "bcryptjs";

const SERVER_ONE = process.env.SERVER_ONE;

const getAllUsers = async (args) => {
    const { fields = "", filters = [], pagination, sort, revalidate = 2, tags = [] } = args;
    const url = "/website-users";

    try {
        const { data, count } = await getData({ url, fields, filters, pagination, sort, revalidate, tags });

        if (data?.error) return { error: errResponse(data.error) };

        console.log({ data, count });

        return { data, count };
    } catch (error) {
        return { error: errResponse(error) };
    }
};

const getUserById = async ({ documentId, fields = null, populate = [] }) => {
    if (!documentId) return { error: "User ID is required." };

    let apiUrl = `${SERVER_ONE}/website-users/${documentId}`;
    if (fields) apiUrl += `?fields=${fields}`;

    try {
        setAuthToken();
        const res = await axios.get(apiUrl);
        if (res?.data?.data?.user_status === 0) throw new Error("User Not Found");

        return res?.data?.data;
    } catch (error) {
        return { error: errResponse(error) };
    }
};

const addUser = async (userData) => {
    const requiredFields = ["first_name", "last_name", "email", "password", "country"];
    const missingFields = requiredFields.filter((field) => !userData[field]);

    if (missingFields.length > 0) {
        return { error: `Missing required fields: ${missingFields.join(", ")}` };
    }

    const { first_name, last_name, password } = userData;

    // Encrypt the password before proceeding
    const saltRounds = 10;
    try {
        userData.password = await bcrypt.hash(password, saltRounds);
    } catch (encryptionError) {
        return { error: "Failed to encrypt the password." };
    }

    // Generate username
    userData.username = await generateUsername({ first_name, last_name, url: "/website-users" });

    console.log({ userData });
    try {
        setAuthToken();
        const { data } = await axios.post(`${SERVER_ONE}/website-users`, { data: userData });
        revalidateTag("website-users");

        return {
            success: true,
            message: "User added successfully",
            user: data,
        };
    } catch (error) {
        console.log({ error });

        return { error: errResponse(error) };
    }
};

const updateUser = async ({ documentId, userData, defaultValues }) => {
    if (!documentId) return { error: "User ID is required" };

    const updatedFields = getUpdatedFields(userData, defaultValues);
    if (Object.keys(updatedFields).length === 0) {
        return { error: "No fields to update" };
    }

    const { password } = updatedFields;

    if (password?.length > 0) {

        if (password?.length < 6) {
            return { error: "Password must be at least 6 characters." };
        }

        // Encrypt the password before proceeding
        const saltRounds = 10;
        try {
            updatedFields.password = await bcrypt.hash(password, saltRounds);
        } catch (encryptionError) {
            console.log({ encryptionError });

            return { error: "Failed to encrypt the password." };
        }
    }

    try {
        setAuthToken();
        const { data } = await axios.put(`${SERVER_ONE}/website-users/${documentId}`, { data: updatedFields });
        revalidateTag("website-users");

        return {
            success: true,
            message: "User updated successfully",
            user: data,
        };
    } catch (error) {
        return { error: errResponse(error) };
    }
};

const deleteUser = async (documentId) => {

    if (!documentId) {
        return { error: "User ID is required" };
    }

    try {

        setAuthToken();
        const { data } = await axios.delete(`${SERVER_ONE}/website-users/${documentId}`);
        revalidateTag("website-users");

        return {
            success: true,
            message: "User deleted successfully",
            data,
        };

    } catch (error) {
        console.log({ error });

        return { error: errResponse(error) };
    }
};

export {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
};
