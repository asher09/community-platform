import mongoose, { Schema } from "mongoose";

export interface IPost {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  authorName?: string;
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
    authorName: {
        type: String,
        required: false
    },
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);
