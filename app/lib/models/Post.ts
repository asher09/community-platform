import mongoose, { Schema, model } from "mongoose";

export interface IPost {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
}


const PostSchema = new Schema<IPost>({
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    author: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
}, { timestamps: true });

export default mongoose.model<IPost>("Post", PostSchema);

