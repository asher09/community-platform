"use client";
import React, { useState } from "react";
import Button from "../../components/Button";
import { Input } from "../../components/InputBox";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            await axios.post("/api/auth/register", { name, email, password, bio });
            setSuccess("Registration successful! You can now log in.");
            setName(""); setEmail(""); setPassword(""); setBio("");
            router.push("/auth/login");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || err.message || "Error registering user");
            } else if (err instanceof Error) {
                setError(err.message || "Error registering user");
            } else {
                setError("Error registering user");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-sans min-h-screen flex flex-col items-center justify-center p-8 pb-20">
            <div className="rounded-lg bg-neutral-900 text-white p-8 max-w-md shadow-md w-full">
                <div className="mb-6 text-xl font-bold">Register</div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input 
                        label="Name" 
                        placeholder="Name" 
                        onChange={e => setName(e.target.value)} 
                        className="w-full" 
                    />
                    <Input 
                        label="Email" 
                        placeholder="Email" 
                        onChange={e => setEmail(e.target.value)} 
                        className="w-full" 
                    />
                    <Input 
                        label="Password" 
                        placeholder="Password" 
                        onChange={e => setPassword(e.target.value)} 
                        className="w-full" 
                    />
                    <Input 
                        label="Bio" 
                        placeholder="Bio (optional)" 
                        onChange={e => setBio(e.target.value)} 
                        className="w-full" 
                    />
                    <Button 
                        ButtonText={loading ? "Registering..." : "Register"} 
                        className={loading ? "opacity-50 cursor-not-allowed" : ""} 
                    />
                    <p>
                        Already a user?{" "}
                        <span
                            style={{ color: "#e43d40", cursor: "pointer", textDecoration: "underline" }}
                            onClick={() => router.push("/auth/login")}
                        >
                            Sign in
                        </span>
                    </p>
                    {error && <div className="text-red-500 mt-2">{error}</div>}
                    {success && <div className="text-green-500 mt-2">{success}</div>}
                </form>
            </div>
        </div>
    );
    }
