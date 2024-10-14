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

const getImages = async (clerkId: string, page: number) => {
    try {
        await connectDB()
        const user = await User.findOne({clerkId})
        if(!user) throw 'User not found'
        console.log(user)
        const pageSize = 3
        const total = await Img.find({userId: user._id}, {userId: 0, __v: 0}).countDocuments()
        const images = await Img.find({userId: user._id}, {userId: 0, __v: 0}).skip((page - 1) * pageSize).limit(pageSize)
        
        const totalPages = Math.ceil(total / pageSize)
        // console.log(images)
        return {done: true, images: JSON.parse(JSON.stringify(images)), totalPages, page}
    } catch (error) {
        console.log(error)
        return {done: false}
    }
}

export const getImagesDemo = async() => {
    return {done: true, images: [
        {
            _id: 'regtht',
            name: 'test 1',
            path: 'https://res.cloudinary.com/colbycloud-next-cloudinary/image/upload/e_tint:equalize:80:blue:blueviolet/c_limit,w_1920/f_auto/q_auto/v1/images/turtle?_a=BAVARSBy0',
            conversionType: 'replace_object'
        },
        {
            _id: 'frget',
            name: 'test 2',
            path: 'https://res.cloudinary.com/colbycloud-next-cloudinary/image/upload/b_green/e_gradient_fade/e_gradient_fade:symetric,x_0.5/c_limit,w_1080/f_auto/q_auto/v1/images/turtle?_a=BAVARSBy0',
            conversionType: 'replace_object'
        }
    ]}
}

const deleteImage = async (id: string) => {
    try {
        await connectDB()
        const result = await Img.deleteOne({_id: id})
        if(result.acknowledged && result.deletedCount > 0) return true
    } catch (error) {
        console.log(error)
        return false
    }
    
}

export {createImage, getImages, deleteImage}