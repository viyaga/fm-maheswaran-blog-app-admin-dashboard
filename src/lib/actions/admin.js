"use server"

import axios from "axios";
import { errResponse, getUpdatedFields } from "../utils";
import { createStrapiApiUrl, generateUsername, setAuthToken } from "./common";
import { revalidateTag } from "next/cache";


const SERVER_ONE = process.env.SERVER_ONE


const getAdminsData = async (args) => {

    const { url, fields = "", filters = [], pagination = {}, populate = "", sort = "", revalidate = 2, tags = [] } = args

    const BEARER_API_TOKEN = "Bearer " + process.env.API_TOKEN

    let apiUrl = createStrapiApiUrl({ url, fields, filters, populate, sort })

    //add pagination to Api url
    const { page, pageSize } = pagination

    apiUrl += `&start=${pageSize * (page - 1)}&limit=${pageSize}`

    try {
        const res = await fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: BEARER_API_TOKEN,
                "Content-Type": "application/json",
            },
            next: { revalidate, tags },
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(`Fetch failed: ${errResponse(error) || "Unknown error"}`);
        }

        const data = await res.json();

        const count = await getAdminUsersCount({ url, filters, revalidate, tags: ["adminCount"] })

        if (count?.error) {
            return { error: count.error };
        }


        return { data, count };

    } catch (error) {
        return { error: errResponse(error) };
    }
};


const getAdminUsersCount = async ({ url, filters, revalidate, tags }) => {

    const apiUrl = createStrapiApiUrl({ url, fields: "id", filters })

    const BEARER_API_TOKEN = "Bearer " + process.env.API_TOKEN

    const res = await fetch(apiUrl, {
        method: "GET",
        headers: { Authorization: BEARER_API_TOKEN },
        next: { revalidate, tags },
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(`Fetch failed: ${errResponse(error) || "Unknown error"}`);
    }

    const data = await res.json();

    if (!data || data.length === 0) {
        return 0;
    }

    return data.length;
}

const getAllAdmins = async (args) => {
    const { fields = "", filters = [], pagination, sort, revalidate = 2, tags = [] } = args
    const url = "/users";

    try {
        const data = await getAdminsData({ url, fields, filters, pagination, sort, revalidate, tags });
        if (data?.error) return { error: errResponse(data.error) }

        return data;
    } catch (error) {
        return { error: errResponse(error) };
    }

};

const getAdminById = async ({ adminId, fields = null }) => {
    let apiUrl = `${SERVER_ONE}/users/${adminId}`;

    if (fields) apiUrl += `?fields=${fields}`

    try {
        setAuthToken()
        const admin = await axios.get(apiUrl);
        return admin?.data
    } catch (error) {
        return { error: errResponse(error) };
    }

};

const addAdmin = async (args) => {

    const { first_name, last_name, email, country, password } = args; //role ID = 1 (ADMIN)

    if (!first_name || !last_name || !email ||
        !country || !password) {
        return { error: "Enter Required Field" }
    }


    try {
        setAuthToken()
        const username = await generateUsername(first_name, last_name)
        const adminData = { username, first_name, last_name, email, country, password, role: 1 } //Role Id 1 = Admin

        const newAdmin = await axios.post(`${SERVER_ONE}/users`, adminData);

        revalidateTag("admins")
        revalidateTag("adminCount")

        return {
            success: true,
            message: "Admin added successfully",
            admin: newAdmin.data,
        };

    } catch (error) {
        return { error: errResponse(error) };
    }
}


const updateAdmin = async ({ id, adminData, defaultValues }) => {
    if (!id) {
        return { error: "Admin ID is required" };
    }

    // Filter out undefined fields
    const updatedFields = getUpdatedFields(adminData, defaultValues);

    if (Object.keys(updatedFields).length === 0) {
        return { error: "No fields to update" };
    }

    if (updatedFields?.password?.length > 0 && updatedFields?.password?.length < 6) {
        return { error: "Password must be at least 6 characters." }
    }

    try {
        // Set authentication token
        setAuthToken();

        // Send PUT request to update admin
        const { data } = await axios.put(`${SERVER_ONE}/users/${id}`, updatedFields);

        // Revalidate cache or update state
        revalidateTag("admins");

        // Return response
        return {
            success: true,
            message: "Admin updated successfully",
            admin: data,
        };
    } catch (err) {
        return { error: errResponse(err) };
    }
};


const deleteAdmin = async (adminId) => {
    if (!adminId) {
        return { error: "Admin ID is required" };
    }

    try {
        // Set authentication token
        setAuthToken();

        // Send DELETE request to delete the admin
        const { data } = await axios.delete(`${SERVER_ONE}/users/${adminId}`);

        // Revalidate cache or update state
        revalidateTag("admins");
        revalidateTag("adminCount")

        // Return success response
        return {
            success: true,
            message: "Admin deleted successfully",
            data,
        };
    } catch (err) {
        return { error: errResponse(err) };
    }
};

export {
    getAllAdmins, getAdminById, addAdmin, updateAdmin, deleteAdmin
}