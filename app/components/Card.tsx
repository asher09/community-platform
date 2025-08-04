import React from "react";

interface CardProps {
    title: string;
    name: string;
    timestamp: string;
    content: string;

}



export default function Card({ title, name, timestamp, content  }: CardProps) {
    const fLetter = name.charAt(0).toUpperCase();
    return (
        <div className="border border-neutral-800 rounded-lg bg-neutral-900 text-white p-5 mb-6 shadow-md" style={{ width: 1000, minWidth: 600 }}>
            <div className="flex items-center mb-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                <span className="w-10 h-8 flex items-center justify-center rounded-full bg-[#e43d40] text-white text-lg mr-2">
                    {fLetter}
                </span>
                <span className="font-semibold">{name}</span>
                <span className="ml-auto text-xs text-neutral-400 timestamp">{timestamp}</span>
            </div>
            <p className="text-lg font-bold mb-2">{title}</p>
            <p className="m-0 text-[#75787f] text-base">{content}</p>
        </div>
    );
}
