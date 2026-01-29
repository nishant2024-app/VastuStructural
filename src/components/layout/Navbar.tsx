"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Hexagon, Sparkles } from "lucide-react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/experience" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6",
                scrolled
                    ? "py-3 bg-background/90 backdrop-blur-2xl border-b border-border/50"
                    : "py-6 bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full group-hover:bg-primary/50 transition-colors" />
                        <div className="relative w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                            <Hexagon size={24} className="text-background" strokeWidth={2.5} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-black tracking-tight text-foreground">
                            VASTU<span className="text-primary">STRUCTURAL</span>
                        </span>
                        <span className="text-[10px] font-bold text-foreground/40 tracking-[0.3em] uppercase">
                            Architecture • Vastu
                        </span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative px-5 py-2.5 text-sm font-bold text-foreground/70 hover:text-foreground transition-colors group"
                        >
                            {link.name}
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-6 transition-all" />
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden lg:flex items-center gap-4">
                    <Link
                        href="/services"
                        className="group relative px-6 py-3 overflow-hidden rounded-full font-bold text-sm"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%] animate-gradient" />
                        <span className="absolute inset-[2px] bg-background rounded-full" />
                        <span className="relative flex items-center gap-2 text-foreground">
                            <Sparkles size={16} className="text-primary" />
                            Get Started
                        </span>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden p-2.5 rounded-xl bg-card border border-border text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    "fixed inset-0 top-0 bg-background z-40 lg:hidden transition-all duration-500 flex flex-col",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
            >
                <div className="flex justify-between items-center p-6 border-b border-border">
                    <span className="text-xl font-black text-foreground">
                        VASTU<span className="text-primary">STRUCTURAL</span>
                    </span>
                    <button
                        className="p-2.5 rounded-xl bg-card border border-border"
                        onClick={() => setIsOpen(false)}
                    >
                        <X size={22} />
                    </button>
                </div>

                <div className="flex flex-col gap-2 p-6 flex-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="py-4 px-6 text-2xl font-bold text-foreground/80 hover:text-foreground hover:bg-card rounded-2xl transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="p-6 border-t border-border">
                    <Link
                        href="/services"
                        className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-primary to-secondary text-background rounded-2xl font-black text-lg"
                        onClick={() => setIsOpen(false)}
                    >
                        <Sparkles size={20} />
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
}

