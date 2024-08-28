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
        const user = await User.findOne({clerkId})
        if(!user) throw 'User not found'
        const result = await User.deleteOne({clerkId})
        console.log(result)
        return result.deletedCount === 1
    } catch (error) {
        console.log(error)
        return false
    }
}

export const getUserIdByClerkId = async (clerkId: string) => {
    try {
        await connectDB()
        const user = await User.findOne({clerkId})
        console.log(user)
        return user
    } catch (error) {
        console.log(error)
        return false
    }
}