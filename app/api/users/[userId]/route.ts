import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import UserModel from "@/app/lib/models/User";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  await connectDB();
  const { userId } = await context.params;
    if (!userId || userId === "undefined") {
        return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
    }
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
