"use server"

const { signOut, signIn } = require("@/auth");

export const loginUser = async (email, password) => {
    try {
        await signIn("credentials", { email, password, redirect: false });
        return { success: "Login successfull" }
    } catch (err) {
        return { error: "Wrong Credentials!" }
    }
};

export const logoutUser = async () => {
    await signOut()
}
