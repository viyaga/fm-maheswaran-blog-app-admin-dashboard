"use server"

import axios from "axios";
import { revalidateTag } from "next/cache";

const { getUpdatedFields } = require("../../utils");
const { getData, asyncHandler } = require("./common");

const STRAPI_API_ENDPOINT = process.env.STRAPI_API_ENDPOINT;

const getSettingData = asyncHandler(async () => {
    const { data } = await getData({ url: "/site-setting", revalidate: 60 * 60 * 24 * 365, tags: ["site-setting"] });
    return data;
});

const updateSiteSetting = asyncHandler(async ({ settingData, defaultValues }) => {

    // Validate required fields
    const requiredFields = ["title", "logo", "favicon", "contact_email"];
    const missingFields = requiredFields.filter((field) => !settingData[field]);

    if (missingFields.length > 0) {
        return { error: `Missing required fields: ${missingFields.join(", ")}` };
    }

    // Get fields that have changed
    const updatedFields = getUpdatedFields(settingData, defaultValues);
    if (Object.keys(updatedFields).length === 0) {
        return { error: "No fields to update" };
    }

    console.log({updatedFields});
    

    // Update the record in the database via API
    const { data } = await axios.put(`${STRAPI_API_ENDPOINT}/site-setting`, { data: updatedFields });

    revalidateTag("site-setting"); 

    return {
        success: true,
        message: "Site settings updated successfully",
        siteSetting: data,
    };
});

export {
    getSettingData,
    updateSiteSetting
}