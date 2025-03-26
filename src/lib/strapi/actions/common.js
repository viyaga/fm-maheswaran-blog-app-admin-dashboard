"use server"

import axios from "axios";
import { errResponse } from "../../utils";
import { revalidateTag } from "next/cache";

const setAuthToken = () => {
    const BEARER_API_TOKEN = "Bearer " + process.env.API_TOKEN;
    axios.defaults.headers.common['Authorization'] = BEARER_API_TOKEN;
}

const removeAuthToken = () => {
    axios.defaults.headers.common["Authorization"] = undefined;
};

const revalidateByTag = (tag) => {
    revalidateTag(tag);
}

const asyncHandler = (fn) => async (...args) => {
    setAuthToken()

    try {
        return await fn(...args);
    } catch (error) {
        return { error: errResponse(error) };
    }
};

const createStrapiApiUrl = (args) => {
    const { url, fields = "", filters = [], pagination = {}, sort = "", populate = "" } = args;
    const STRAPI_API_ENDPOINT = process.env.STRAPI_API_ENDPOINT;

    const fieldsUrl = fields ? `fields=${fields}&` : "";
    let filtersUrl = "";
    if (Array.isArray(filters) && filters?.length > 0) {
        filters.forEach((filter) => {
            const { field, operator, value } = filter;
            if (field && operator && value !== undefined) {
                filtersUrl += `filters[${field}][${operator}]=${value}&`;
            }
        });
    }

    let paginationUrl = "";
    if (pagination.page || pagination.pageSize) {
        const { page, pageSize } = pagination;
        if (page) paginationUrl += `pagination[page]=${page}&`;
        if (pageSize) paginationUrl += `pagination[pageSize]=${pageSize}&`;
    }

    const sortUrl = sort ? `sort=${sort}&` : "";

    const populateUrl = (typeof populate === "string" && populate?.length > 0)
        ? `populate=${populate}&` // Handle when `populate` is a string
        : Object.entries(populate)
            .map(([key, value]) =>
                typeof value === "string"
                    ? `populate[${key}]=${value}&`
                    : `populate[${key}][fields]=${value.join(",")}&`
            )
            .join("&");


    let queryString = `${fieldsUrl}${filtersUrl}${paginationUrl}${sortUrl}${populateUrl}`.slice(0, -1);
    queryString = queryString ? `?${queryString}` : "" // add ? before queryString

    const fullUrl = `${STRAPI_API_ENDPOINT}${url}${queryString}`;

    console.log({ fullUrl });

    return fullUrl;
};

const generateUsername = asyncHandler(async ({ first_name, last_name, attempt = 0, url = "/users" }) => {

    if (!first_name || !last_name) throw new Error("Give the required field");

    const normalizedFirstName = first_name.toLowerCase();
    const normalizedLastName = last_name.toLowerCase();

    const baseUsername = `${normalizedFirstName}${normalizedLastName}`;
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const newUsername = `${baseUsername}${randomNumber}`;

    const existingUser = await getData({ url, fields: "username", filters: [{ field: "username", operator: "$eq", value: newUsername }] });

    if (existingUser?.data?.length > 0) {
        if (attempt >= 10) {
            throw new Error("Unable to generate a unique username after 10 attempts");
        }
        return generateUsername({ first_name, last_name, attempt: attempt + 1 });
    }

    return newUsername;

});

const getData = asyncHandler(async (args) => {
    const { url, fields = "", filters = [], pagination = {}, populate = "", sort = "", revalidate = 2, tags = [] } = args;

    if (!url) throw new Error("Url Required to get data");

    const BEARER_API_TOKEN = "Bearer " + process.env.API_TOKEN;
    let fullUrl = createStrapiApiUrl({ url, fields, filters, pagination, populate, sort });

    const res = await fetch(fullUrl, {
        method: "GET",
        headers: {
            Authorization: BEARER_API_TOKEN,
        },
        next: { revalidate, tags },
    });

    const { data, meta, error } = await res.json();

    console.log({ data, meta, error });

    if (error) return { error };

    return { data, count: meta?.pagination?.total || 0 };
});

const getMediaData = asyncHandler(async (args) => {
    const { url, fields = "", filters = [], pagination = {}, populate = "", sort = "", revalidate = 2, tags = [] } = args;

    if (!url) throw new Error("Url Required to get data");

    const BEARER_API_TOKEN = "Bearer " + process.env.API_TOKEN;
    let fullUrl = createStrapiApiUrl({ url, fields, filters, populate, sort });

    const { page, pageSize } = pagination;
    fullUrl += `&start=${pageSize * (page - 1)}&limit=${pageSize}`;

    const res = await fetch(fullUrl, {
        method: "GET",
        headers: {
            Authorization: BEARER_API_TOKEN,
        },
        next: { revalidate, tags },
    });

    const data = await res.json();

    console.log({ data });

    // if (error) return { error };

    return data;
});

export {
    setAuthToken, removeAuthToken, revalidateByTag, asyncHandler,
    createStrapiApiUrl, generateUsername, getData, getMediaData
};
