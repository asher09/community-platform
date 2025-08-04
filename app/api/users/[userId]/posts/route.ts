import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import PostModel from "@/app/lib/models/Post";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    await connectDB();
    const userId = context?.params?.userId;
    if (!userId || userId === "undefined") {
        return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
    }
    const posts = await PostModel.find({
        author: userId
    }).sort({
        createdAt: -1
    });
    // Return posts with authorName
    const result = posts.map(posts => ({
        title: posts.title,
        name: posts.authorName,
        content: posts.content,
        createdAt: posts.createdAt
    }));
    return NextResponse.json(result);
}