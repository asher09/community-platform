import React from "react";

interface InputProps {
    placeholder: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    label: string;
    className?: string;
    type?: string;
}

export function Input({ placeholder, onChange, label, className = "", type }: InputProps) {
    return (
        <div>
            <label className="block mb-1 text-sm font-medium text-neutral-300">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                className={`w-full text-white bg-[#202020] border border-[#424647] rounded-[4px] px-3 py-4 font-poppins text-[14px] focus:outline-none mb-1 ${className}`}
            />
        </div>
    );
}
