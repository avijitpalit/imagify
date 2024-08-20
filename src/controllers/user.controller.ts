'use server'

import User from "@/models/user.model";
import connectDB from "@/utils/db";

export const createUser = async (user: CreateUserParams | null) => {
    try {
        await connectDB()
        const newUser = await User.create(user)
        console.log(newUser)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const deleteUser = async (clerkId: string) => {
    try {
        await connectDB()
        const result = await User.deleteOne({clerkId})
        console.log(result)
        return result.acknowledged
    } catch (error) {
        console.log(error)
        return false
    }
}