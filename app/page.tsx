"use client";
import Card from './components/Card'
import React, { useState } from 'react';

const SetBlogs = {
    title: "Sample Post Title",
    content: "This is a sample post content. It can be anything you want to write aboutIt can be anything you want to write aboutIt can be anything you want to write aboutIt can be anything you want to write aboutIt can be anything you want to write about.",
    author: "John Doe",
    timestamp: "2023-10-01 12:00 PM"
}

export default function Home() {
  const [blogs, setBlogs] = useState([SetBlogs])
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        FEED Page
        <div>
          {blogs.map((blogs, index) => (
            <Card
              key={index}
              title={blogs.title}
              author={blogs.author}
              timestamp={blogs.timestamp}
              content={blogs.content}
            />
          ))}
        </div>
        
    </div>
  );
}
