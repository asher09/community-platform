import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from './models/User';

import type { NextAuthOptions, Session, User as NextAuthUser } from "next-auth";
import type { JWT } from "next-auth/jwt";
import connectDB from './db';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "JohnDoe@mail.com", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials) {
                await connectDB();
                // both sign-in and sign-up handled here
                type AuthCredentials = {
                    email?: string;
                    password?: string;
                    name?: string;
                    bio?: string;
                };
                const { email, password, name, bio } = credentials as AuthCredentials;
                if (!email || !password) {
                    const error: any = new Error("Missing email or password");
                    error.status = 411;
                    throw error;
                }
                const existingUser = await UserModel.findOne({ email });

                if (existingUser) {
                    // login validate password
                    const passwordValidation = await bcrypt.compare(password, existingUser.password);
                    if (passwordValidation) {
                        const token = jwt.sign(
                            { id: String(existingUser._id), email: existingUser.email },
                            process.env.JWT_SECRET || "secret",
                            { expiresIn: "7d" }
                        );
                        return {
                            id: String(existingUser._id),
                            userId: String(existingUser._id),
                            name: existingUser.name,
                            email: existingUser.email,
                            bio: existingUser.bio || "",
                            token
                        };
                    }
                    return null;
                } else {
                    if (!name || !bio) {
                        // missing required signup fields
                        const error: any = new Error("Missing name or bio");
                        error.status = 411;
                        throw error;
                    }
                    try {
                        const hashedPassword = await bcrypt.hash(password, 10);
                        const user = await UserModel.create({
                            name,
                            email,
                            password: hashedPassword,
                            bio
                        });
                        return {
                            id: String(user._id),
                            userId: String(user._id),
                            name: user.name,
                            email: user.email,
                            bio: user.bio || ""
                        };
                    } catch (e) {
                        console.error(e);
                    }
                    return null;
                }
            },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
            if (user && user.id) {
                token.userId = user.id;
            }
            return token;
        },
        async session({ token, session }: { token: JWT; session: Session }) {
            if (session.user && token.userId) {
                (session.user as NextAuthUser & { id?: string }).id = token.userId as string;
            }
            return session;
        }
    }
};
