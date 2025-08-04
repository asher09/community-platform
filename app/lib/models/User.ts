import mongoose, { Schema } from "mongoose";   


export interface IUser{    
    name: string;
    email: string;
    password: string;
    bio?: string;
    createdAt: Date;
}

const UserSchema = new Schema<IUser>({
    name: { 
        type: String,
        required: true 
    },
    password: { 
        type: String,
        required: true 
    },
    email: { 
        type: String, 
        unique: true, 
    },
    bio: {
        type: String,
        default: ""
    },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
