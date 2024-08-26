'use server'

import Img from "@/models/image.model"
import User from "@/models/user.model";
import connectDB from "@/utils/db"

const createImage = async (name: string, path: string, clerkId: string, cType: string) => {
    try {
        await connectDB()
        const user = await User.findOne({clerkId})
        if(!user) throw 'User not found'
        const newImage = await Img.create({name, path, conversionType: cType, userId: user})
        console.log(newImage)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export {createImage}