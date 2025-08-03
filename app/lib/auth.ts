import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import type { NextAuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials) {
                if (!credentials?.phone || !credentials?.password) return null;
                // TODO: Add zod validation, OTP validation here
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const existingUser = await db.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                });

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.number
                        };
                    }
                    return null;
                }

                try {
                    const user = await db.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    });
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.number
                    };
                } catch (e) {
                    console.error(e);
                }
                return null;
            },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: { token: JWT; session: Session }) {
            if (session.user && token.sub) {
                (session.user as User & { id?: string }).id = token.sub;
            }
            return session;
        }
    }
};
