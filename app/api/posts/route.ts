import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "../../lib/db";
import PostModel from "../../lib/models/Post";

function getUserId(req: NextRequest): string | null {
    // Read token from cookie instead of Authorization header
    const token = req.cookies.get("token")?.value;
    if (!token) return null;
    try {
        return (jwt.verify(token, process.env.JWT_SECRET || "") as any).id ?? null;
    } catch {
        return null;
    }
}
 
//fetch posts
export async function GET() {
    await connectDB();
    // Fetch posts and return authorName directly
    const posts = await PostModel.find({})
        .sort({ createdAt: -1 })
        .lean();
    const result = posts.map(post => ({
        title: post.title,
        name: post.authorName || "Unknown",
        authorId: post.author ? String(post.author) : "",
        content: post.content,
        createdAt: post.createdAt
    }));
    return NextResponse.json(result);
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
    // Fetch author's name from User table
    const UserModel = (await import("../../lib/models/User")).default;
    const user = await UserModel.findById(userId).select("name");
    const authorName = user?.name || "Unknown";
    const post = await PostModel.create({
        title,
        content,
        author: userId,
        authorName
    });
    return NextResponse.json(post);
}
