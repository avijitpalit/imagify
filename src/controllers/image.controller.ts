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
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

const getImages = async (clerkId: string) => {
    try {
        await connectDB()
        const user = await User.findOne({clerkId})
        if(!user) throw 'User not found'
        // console.log(user)
        const images = await Img.find({userId: '66c466a08e07621e73d04064'}, {userId: 0, __v: 0})
        // console.log(images)
        return {done: true, images: JSON.parse(JSON.stringify(images))}
    } catch (error) {
        console.log(error)
        return {done: false}
    }
}

export {createImage, getImages}