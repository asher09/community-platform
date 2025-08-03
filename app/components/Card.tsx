import React from "react";

interface CardProps {
    title: string;
    author: string;
    timestamp: string;
    content: string;

}



export default function Card({ title, author, timestamp, content  }: CardProps) {
    return (
        <div className="border border-neutral-800 rounded-lg bg-neutral-900 text-white p-5 mb-6 max-w-xl shadow-md">
            <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">👤</span>
            <span className="font-semibold">{author}</span>
            <span className="ml-auto text-xs text-neutral-400 timestamp">{timestamp}</span>
            </div>
            <p className="text-lg font-bold mb-2">{title}</p>
            <p className="m-0 text-[#75787f] text-base">{content}</p>
        </div>
    );
}
