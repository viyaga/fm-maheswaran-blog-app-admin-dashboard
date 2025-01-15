"use server"

const { getUpdatedFields } = require("../utils");
const { getData, asyncHandler } = require("./common");

const SERVER_ONE = process.env.SERVER_ONE;

const getSettingData = asyncHandler(async () => {
    const { data } = await getData({ url: "/site-setting", revalidate: 60 * 60 * 24 * 365, tags: ["site-setting"] });
    return data;
});

const updateSiteSetting = asyncHandler(async ({ settingData, defaultValues }) => {

    // Validate required fields
    const requiredFields = ["site_title", "site_logo_url", "favicon_url", "contact_email"];
    const missingFields = requiredFields.filter((field) => !settingData[field]);

    if (missingFields.length > 0) {
        return { error: `Missing required fields: ${missingFields.join(", ")}` };
    }

    // Get fields that have changed
    const updatedFields = getUpdatedFields(settingData, defaultValues);
    if (Object.keys(updatedFields).length === 0) {
        return { error: "No fields to update" };
    }



    // Update the record in the database via API
    const { data } = await axios.put(`${SERVER_ONE}/site-setting`, { data: updatedFields });

    revalidateTag("site-setting"); // Optional: For cache invalidation if applicable

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