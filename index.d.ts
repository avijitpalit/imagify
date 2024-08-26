/* eslint-disable no-unused-vars */

declare type CreateUserParams = {
    clerkId: string;
    fname: string;
    lname: string;
    email: string;
    avatar: string;
}

declare type CropOptions = "fill" | "fit" | "crop" | "scale" | "thumb" | "auto" | "pad";