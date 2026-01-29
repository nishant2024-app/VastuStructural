"use client";

import { useState } from "react";
import { Gift, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import FreeSampleModal from "./FreeSampleModal";

interface FreeSampleButtonProps {
    className?: string;
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
}

export default function FreeSampleButton({
    className = "",
    variant = "primary",
    size = "md"
}: FreeSampleButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const baseStyles = "relative inline-flex items-center gap-3 font-black rounded-full transition-all overflow-hidden group";

    const variantStyles = {
        primary: "bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%] animate-gradient text-background shadow-lg hover:shadow-xl",
        secondary: "bg-card text-foreground border border-border hover:border-primary",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-background"
    };

    const sizeStyles = {
        sm: "px-5 py-2.5 text-sm",
        md: "px-8 py-4 text-base",
        lg: "px-10 py-5 text-lg"
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
            >
                {/* Shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                {/* FREE badge */}
                <span className="absolute -top-1 -right-1 px-2 py-0.5 bg-success text-white text-[10px] font-black rounded-full">
                    FREE
                </span>

                <Gift size={size === "lg" ? 22 : 18} className="relative z-10" />
                <span className="relative z-10">Get Free Sample</span>
                <Sparkles size={size === "lg" ? 18 : 14} className="relative z-10 opacity-70" />
            </button>

            <FreeSampleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
