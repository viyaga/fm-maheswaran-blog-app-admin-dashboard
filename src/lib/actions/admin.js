"use server"

import { errResponse } from "../utils";
import { createStrapiApiUrl } from "./common";


const BEARER_API_TOKEN = "Bearer " + process.env.API_TOKEN
const SERVER_ONE = process.env.SERVER_ONE


const getAdminsData = async (args) => {
    const { url, fields = "", filters = [], pagination = {}, populate = "", sort = "", revalidate = 2, tags = [] } = args

    let apiUrl = createStrapiApiUrl({ url, fields, filters, populate, sort })

    //add pagination to Api url
    const { page, pageSize } = pagination
    console.log({ pagination });

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
            return { error: res?.error?.message };
        }

        const count = await getAdminUsersCount({ url, filters, revalidate, tags })

        if (count?.error) {
            return { error: count.error };
        }

        const data = await res.json();

        console.log({count, data});
        
        return { data, count };

    } catch (error) {
        return { error: errResponse(error) };
    }
};


const getAdminUsersCount = async ({ url, filters, revalidate, tags }) => {
    const apiUrl = createStrapiApiUrl({ url, fields: "id", filters })

    const res = await fetch(apiUrl, {
        method: "GET",
        headers: { Authorization: BEARER_API_TOKEN, "Content-Type": "application/json" },
        next: { revalidate, tags },
    });

    if (!res.ok) {
        return { error: errResponse(res?.error) };
    }

    const data = await res.json();

    if (!data || data.length === 0) {
        return 0
    }

    return data.length
}

const getAdmins = async (args) => {
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

const addAdmin = async (args) => {

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


const updateAdmin = async ({ id, userData, defaultValues }) => {
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


const deleteAdmin = async (adminId) => {
    if (!adminId) {
        return { error: "Admin ID is required" };
    }

    try {
        // Set authentication token
        setAuthToken();

        // Send DELETE request to delete the user
        const { data } = await axios.delete(`${process.env.SERVER_ONE}/users/${userId}`);

        // Revalidate cache or update state
        revalidateTag("admins");

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
    getAdmins, addAdmin, updateAdmin, deleteAdmin
}