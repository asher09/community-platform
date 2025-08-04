import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import UserModel from "@/app/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    await connectDB();
    const { name, email, password, bio } = await req.json();
    if (!name || !email || !password) {
        return NextResponse.json({ 
            error: "Missing required fields" 
        }, { 
            status: 400 
        });
    }
    const existing = await UserModel.findOne({ email });
    if (existing) {
        return NextResponse.json({ 
            error: "Email already registered" }, { 
            status: 409 

        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ name, email, password: hashedPassword, bio });
    return NextResponse.json({ 
        message: "User registered successfully", 
        user: { 
            name: user.name, 
            email: user.email, 
            bio: user.bio 
        } 
    });
}
