import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: String
})

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User