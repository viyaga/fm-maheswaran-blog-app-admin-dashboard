"use server"


import axios from "axios";
import { errResponse } from "../utils";

const setAuthToken = () => {
    const BEARER_API_TOKEN = "Bearer " + process.env.API_TOKEN
    axios.defaults.headers.common['Authorization'] = BEARER_API_TOKEN
}

const createStrapiApiUrl = (args) => {
    const { url, fields = "", filters = [], pagination = {}, sort = "", populate = "" } = args
    const SERVER_ONE = process.env.SERVER_ONE;

    // Construct fields query
    const fieldsUrl = fields ? `fields=${fields}&` : "";

    // Construct filters query
    let filtersUrl = "";
    if (Array.isArray(filters) && filters?.length > 0) {
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

    return newUsername;
};

const getData = async (args) => {
    const { url, fields = "", filters = [], pagination = {}, populate = "", sort = "", revalidate = 2, tags = [] } = args

    const BEARER_API_TOKEN = "Bearer " + process.env.API_TOKEN

    let fullUrl = createStrapiApiUrl({ url, fields, filters, pagination, populate, sort })
    console.log({ fullUrl });

    try {
        const res = await fetch(fullUrl, {
            method: "GET",
            headers: {
                Authorization: BEARER_API_TOKEN,
            },
            next: { revalidate, tags },
        });

        console.log({ res });


        const { data, meta, error } = await res.json(); //strapi

        if (error) return { error }

        return { data, count: meta?.pagination?.total || 0 };

    } catch (error) {
        return { error: errResponse(error) };
    }
}

export { setAuthToken, createStrapiApiUrl, generateUsername, getData }
