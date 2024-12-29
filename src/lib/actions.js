"use server"

import { signIn, signOut } from "@/auth";

// login User =========================================================
const loginUser = async (email, password) => {
    try {
        await signIn("credentials", { email, password, redirect: false });
        return { success: "Login successfull" }
    } catch (err) {

        return { error: "Wrong Credentials!" }
    }
};

const logoutUser = async () => {
    await signOut()
} 

export { loginUser, logoutUser }