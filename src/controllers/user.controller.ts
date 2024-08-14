import User from "@/models/user.model";
import { DBConnect } from "@/utils/db";

export const createUser = async (user: CreateUserParams) => {
    try {
        await DBConnect()
        const newUser = await User.create(user)
        return newUser
    } catch (error) {
        console.log(error)
    }
}