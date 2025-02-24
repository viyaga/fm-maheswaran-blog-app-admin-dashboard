"use server";

import axios from "axios";
import { errResponse, getUpdatedFields } from "../utils";
import { asyncHandler, createStrapiApiUrl, generateUsername, setAuthToken } from "./common";
import { revalidateTag } from "next/cache";

const SERVER_ONE = process.env.SERVER_ONE;

const getAdminsData = asyncHandler(async (args) => {
    const { url, fields = "", filters = [], pagination = {}, populate = "", sort = "", revalidate = 2, tags = [] } = args;

    const BEARER_API_TOKEN = "Bearer " + process.env.API_TOKEN;

    let apiUrl = createStrapiApiUrl({ url, fields, filters, populate, sort });

    const { page, pageSize } = pagination;

    apiUrl += `&start=${pageSize * (page - 1)}&limit=${pageSize}`;

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

    const count = await getAdminUsersCount({ url, filters, revalidate, tags: ["adminCount"] });

    if (count?.error) {
        return { error: count.error };
    }

    return { data, count };
});

const getAdminUsersCount = asyncHandler(async ({ url, filters, revalidate, tags }) => {
    const apiUrl = createStrapiApiUrl({ url, fields: "id", filters });

    const BEARER_API_TOKEN = "Bearer " + process.env.API_TOKEN;

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

    return data?.length || 0;
});

const getAllAdmins = asyncHandler(async (args) => {
    const { fields = "", filters = [], pagination, sort, revalidate = 2, tags = [] } = args;
    const url = "/users";

    const data = await getAdminsData({ url, fields, filters, pagination, sort, revalidate, tags });
    if (data?.error) return { error: errResponse(data.error) };

    return data;
});

const getAdminById = asyncHandler(async ({ adminId, fields = null }) => {
    let apiUrl = `${SERVER_ONE}/users/${adminId}`;

    if (fields) apiUrl += `?fields=${fields}`;

    
    const admin = await axios.get(apiUrl);
    return admin?.data;
});

const addAdmin = asyncHandler(async (args) => {
    const { first_name, last_name, email, country, password } = args;

    if (!first_name || !last_name || !email || !country || !password) {
        return { error: "Enter Required Field" };
    }

    
    const username = await generateUsername({ first_name, last_name });
    const adminData = { username, first_name, last_name, email, country, password, role: 1, confirmed:true };

    const newAdmin = await axios.post(`${SERVER_ONE}/users`, adminData);

    revalidateTag("admins");
    revalidateTag("adminCount");

    return {
        success: true,
        message: "Admin added successfully",
        admin: newAdmin.data,
    };
});

const updateAdmin = asyncHandler(async ({ id, adminData, defaultValues }) => {
    if (!id) {
        return { error: "Admin ID is required" };
    }

    const updatedFields = getUpdatedFields(adminData, defaultValues);

    if (Object.keys(updatedFields).length === 0) {
        return { error: "No fields to update" };
    }

    if (updatedFields?.password?.length > 0 && updatedFields?.password?.length < 6) {
        return { error: "Password must be at least 6 characters." };
    }

    

    const { data } = await axios.put(`${SERVER_ONE}/users/${id}`, updatedFields);

    revalidateTag("admins");

    return {
        success: true,
        message: "Admin updated successfully",
        admin: data,
    };
});

const deleteAdmin = asyncHandler(async (adminId) => {
    if (!adminId) {
        return { error: "Admin ID is required" };
    }

    

    const { data } = await axios.delete(`${SERVER_ONE}/users/${adminId}`);

    revalidateTag("admins");
    revalidateTag("adminCount");

    return {
        success: true,
        message: "Admin deleted successfully",
        data,
    };
});

export {
    getAllAdmins, getAdminById, addAdmin, updateAdmin, deleteAdmin
};
