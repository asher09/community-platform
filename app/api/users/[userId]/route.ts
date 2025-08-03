import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import UserModel from "@/app/lib/models/User";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  
    await connectDB();
    const userId = params.userId;
    const user = await UserModel.findById(userId).select("name bio");
    if (!user) {
        return NextResponse.json({ 
            error: "User not found" 
        }, { 
            status: 404 
        });
    }
    return NextResponse.json(user);
}
