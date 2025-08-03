import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import PostModel from "@/app/lib/models/Post";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    await connectDB();
    const userId = params.userId;
    const posts = await PostModel.find({ 
        author: userId 
    }).sort({ 
        createdAt: -1
    });
    return NextResponse.json(posts);
}