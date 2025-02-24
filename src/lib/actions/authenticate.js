"use server"

import { redirect } from "next/navigation";
import { asyncHandler } from "./common";
const { signOut, signIn } = require("@/auth");

export const loginUser = asyncHandler(async (email, password) => {
    await signIn("credentials", { email, password, redirect: false });
    return { success: "Login successful" };
});

export const logoutUser = asyncHandler(async () => {
    await signOut({ redirect: false });
    return { success: "Logout successful" };
});
