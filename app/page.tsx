"use client";
import Card from './components/Card'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Home() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get('/api/posts');
        setBlogs(res.data);
      } catch (err: any) {
        setError(err.message || "Error fetching blogs");
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className="font-sans min-h-screen pb-20 flex flex-col items-center justify-center relative">
      <div className="flex flex-col items-center w-full">
        {loading && <div className="text-neutral-400 mb-4">Loading blogs...</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {blogs.length === 0 && !loading && !error && (
          <div className="text-neutral-400">No blogs found.</div>
        )}
        {blogs.map((blog: any, index: number) => (
          <div
            key={index}
            className="flex justify-center w-full"
            onClick={() => {
              const userId = blog.authorId;
              if (userId) {
                router.push(`/profile?userId=${userId}`);
              } else {
                alert("User ID not found for this blog post.");
              }
            }}
            style={{ cursor: 'pointer', marginTop: 0 }}
          >
            <Card
                title={blog.title}
                name={blog.name }
                timestamp={new Date(blog.createdAt).toLocaleString()}
                content={blog.content}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
