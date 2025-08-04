import React from "react";

interface ButtonProps {
    ButtonText: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export default function Button({ ButtonText, onClick, className = "" }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`px-15 py-2 rounded-full bg-[#e43d40] text-white font-normal cursor-pointer hover:bg-[#9c6c6c] transition ${className}`}
            // style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
            {ButtonText}
        </button>
    );
}
