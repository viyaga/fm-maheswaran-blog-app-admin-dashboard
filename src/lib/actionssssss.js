"use server"

import { signIn, signOut } from "@/auth";
import axios from "axios";
import { revalidateTag } from "next/cache";
const { errResponse, getUpdatedFields } = require("./utils")

const BEARER_API_TOKEN = "Bearer " + process.env.API_TOKEN
const SERVER_ONE = process.env.SERVER_ONE

// Data fetching =========================================================



export {
    generateUsername, createStrapiApiUrl, loginUser, logoutUser, getData,
    getAdminUsersData, getUsers, addUser, updateUser, deleteUser
}