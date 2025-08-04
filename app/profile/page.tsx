"use client";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface User {
  name: string;
  bio?: string;
}

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    type Post = {
        _id: string;
        title: string;
        content: string;
        createdAt: string;
        // add other fields if needed
    };
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");

    useEffect(() => {
        if (!userId || userId === "undefined") {
        setError("Invalid userId");
        setLoading(false);
        return;
        }
        async function fetchProfile() {
        try {
            setLoading(true);
            setError("");
            const [userRes, postsRes] = await Promise.all([
            axios.get(`/api/users/${userId}`),
            axios.get(`/api/users/${userId}/posts`)
            ]);
            setUser(userRes.data);
            setPosts(postsRes.data);
        } catch (err) {
            if (typeof err === "object" && err !== null && "message" in err) {
                setError((err as { message?: string }).message || "Error fetching profile");
            } else {
                setError("Error fetching profile");
            }
        } finally {
            setLoading(false);
        }
        }
        fetchProfile();
    }, [userId]);

    return (
        <div className="font-sans min-h-screen p-8 pb-20 sm:p-20 flex flex-col items-center justify-center relative">
        <div className="w-full max-w-xl bg-neutral-900 rounded-lg shadow-md p-8 mb-8 text-white">
            {loading && <div className="text-neutral-400 mb-4">Loading profile...</div>}
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {user && !error && (
            <>
                <div className="flex items-center mb-4">
                <span className="w-12 h-12 flex items-center justify-center rounded-full bg-[#e43d40] text-white text-2xl mr-4">
                    {user.name?.charAt(0).toUpperCase()}
                </span>
                <div>
                    <div className="font-bold text-xl">{user.name}</div>
                    <div className="text-neutral-400 text-sm">{user.bio || "No bio provided."}</div>
                </div>
                </div>
            </>
            )}
        </div>
        <div className="flex flex-col items-center w-full">
            <div className="mb-4 text-lg font-bold text-white">User's Posts</div>
            {posts.length === 0 && !loading && !error && (
            <div className="text-neutral-400">No posts found.</div>
            )}
            {posts.map((post) => (
            <Card
                key={post._id}
                title={post.title}
                name={user?.name || "Unknown"}
                timestamp={new Date(post.createdAt).toLocaleString()}
                content={post.content}
            />
            ))}
        </div>
        </div>
    );
}
