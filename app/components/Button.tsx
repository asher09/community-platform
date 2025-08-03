import React from "react";

interface ButtonProps {
    ButtonText: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
}

export default function Button({ ButtonText, onClick, type = "button", className = "" }: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-4 py-2 rounded-lg bg-[#ff3b3d] text-white font-semibold hover:bg-blue-700 transition ${className}`}
        >
            {ButtonText}
        </button>
    );
}
