'use server'

import User from "@/models/user.model";
import connectDB from "@/utils/db";
import mongoose from "mongoose";

export const createUser = async (user: CreateUserParams | null) => {
    try {
        await connectDB()
        const newUser = User.create(user)
        console.log(newUser)
        // return newUser
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async (clerkId: string) => {
    try {
        await connectDB()
        const result = User.deleteOne({clerkId})
        console.log(result)
        return true
    } catch (error) {
        return false
    }
}