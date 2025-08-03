
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "../../lib/db";
import PostModel from "../../lib/models/Post";

function getUserId(req: NextRequest): string | null {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return null;
    return (jwt.verify(token, process.env.JWT_SECRET || "") as any).id ?? null;

}
 
//fetch posts
export async function GET() {
    await connectDB();
    const posts = await PostModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(posts);
}


//create post
export async function POST(req: NextRequest) {
    await connectDB();
    const userId = getUserId(req);

    if (!userId) {
        return NextResponse.json({ 
            error: "Unauthorized" 
        }, { 
            status: 401 
        });
    }
    const { title, content } = await req.json();
    if (!title || !content) {
        return NextResponse.json({ 
            error: "Missing title or content" 
        }, { 
            status: 400 
        });
    }
    const post = await PostModel.create({
        title,
        content,
        author: userId
    });
    return NextResponse.json(post);
}
