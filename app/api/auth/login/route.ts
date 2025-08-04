import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import UserModel from "@/app/lib/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  await connectDB();
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ 
      error: "Missing email or password" 
    }, { 
      status: 400 
    });
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return NextResponse.json({ 
      error: "Invalid credentials" 
    }, { 
      status: 401 
    });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json({ 
      error: "Invalid credentials" 
    }, { 
      status: 401 
    });
  }
  const token = jwt.sign({ 
      id: user._id, 
      email: user.email 
    }, process.env.JWT_SECRET || "secret"
  );
  const response = NextResponse.json({ 
    message: "Login successful",  
    user: { 
      name: user.name, 
      email: user.email, 
      bio: user.bio 
    } 
  });
  response.cookies.set(
    "token", token, { 
      httpOnly: true, 
      path: "/", 
      maxAge: 7 * 24 * 60 * 60 
    }
  );
  return response;
}
