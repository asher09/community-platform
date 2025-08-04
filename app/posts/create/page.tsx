"use client";
import React, { useState } from "react";
import Button from "../../components/Button";
import { Input } from "../../components/InputBox";
import axios from "axios";

export default function CreatePostPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            await axios.post("/api/posts", { title, content });
            setSuccess("Post created successfully!");
            setTitle("");
            setContent("");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || err.message || "Error creating post");
            } else if (err instanceof Error) {
                setError(err.message || "Error creating post");
            } else {
                setError("Error creating post");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="font-sans min-h-screen flex flex-col items-center justify-center p-8 pb-20 sm:p-20">
        <div className="rounded-lg bg-neutral-900 text-white p-8 max-w-2xl shadow-md w-full">
            <div className="mb-6 text-xl font-bold">Create a New Post</div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  label="Title"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-[400px] h-[48px]"
                />
                <div>
                  <label className="block mb-1 text-sm font-medium text-neutral-300">Content</label>
                  <textarea
                    placeholder="Content"
                    value={content}
                    onChange={e => {
                      setContent(e.target.value);
                      const textarea = e.target as HTMLTextAreaElement;
                      textarea.style.height = "auto";
                      textarea.style.height = Math.max(120, textarea.scrollHeight) + "px";
                    }}
                    className="w-[600px] min-h-[200px] max-h-[600px] text-white bg-[#202020] border border-[#424647] rounded-[4px] px-3 py-4 font-poppins text-[16px] focus:outline-none mb-1 resize-none text-left align-top"
                    style={{ fontFamily: 'var(--font-geist-sans)' }}
                  />
                </div>
                <Button 
                    ButtonText={loading ? "Creating..." : "Create Post"}
                    className={loading ? "opacity-50 cursor-not-allowed" : ""}
                />
                {error && <div className="text-red-500 mt-2">{error}</div>}
                {success && <div className="text-green-500 mt-2">{success}</div>}
            </form>
        </div>
    </div>
    );
}
