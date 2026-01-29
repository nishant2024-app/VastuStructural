"use client";

import { useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    href?: string;
}

export default function MagneticButton({
    children,
    className = "",
    onClick,
    href
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const x = (e.clientX - centerX) * 0.3;
        const y = (e.clientY - centerY) * 0.3;

        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
        setIsHovered(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const style = {
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isHovered ? "transform 0.15s ease-out" : "transform 0.5s ease-out"
    };

    const baseClasses = cn(
        "relative inline-flex items-center gap-3 px-10 py-5 rounded-full font-black text-lg",
        "bg-accent text-white overflow-hidden",
        "hover:shadow-[0_20px_50px_-10px_rgba(139,90,43,0.5)]",
        "transition-shadow duration-300",
        className
    );

    const Component = href ? "a" : "button";

    return (
        <Component
            ref={ref as any}
            href={href}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            className={baseClasses}
            style={style}
        >
            {/* Ripple effect on hover */}
            <span
                className={cn(
                    "absolute inset-0 bg-white/20 scale-0 rounded-full transition-transform duration-500",
                    isHovered && "scale-150"
                )}
            />
            <span className="relative z-10 flex items-center gap-3">
                {children}
            </span>
        </Component>
    );
}
