"use client";

import { ArrowRight, Play, Zap, Star, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import FreeSampleButton from "@/components/freesample/FreeSampleButton";

const stats = [
    { value: "500+", label: "Projects Delivered", icon: "📐" },
    { value: "15+", label: "Years Experience", icon: "🏆" },
    { value: "98%", label: "Client Satisfaction", icon: "⭐" },
];

const features = [
    "100% Vastu Compliant",
    "AI-Powered Analysis",
    "48-Hour Delivery"
];

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card" />

            {/* Animated Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#f5a623 1px, transparent 1px), linear-gradient(90deg, #f5a623 1px, transparent 1px)`,
                    backgroundSize: "80px 80px"
                }}
            />

            {/* Glow Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-accent/8 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="max-w-2xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                            <Zap size={14} className="text-primary" />
                            <span className="text-sm font-bold text-primary">AI-Powered Vastu Analysis</span>
                            <span className="px-2 py-0.5 bg-primary text-background text-[10px] font-black rounded-full">NEW</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight mb-6">
                            <span className="text-foreground block">Design Your</span>
                            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%] animate-gradient bg-clip-text text-transparent block">
                                Dream Home
                            </span>
                            <span className="text-foreground/40 text-2xl md:text-3xl lg:text-4xl block mt-2 font-bold">with Vastu Precision</span>
                        </h1>

                        {/* Subtext */}
                        <p className="text-base md:text-lg text-foreground/50 max-w-lg mb-8 leading-relaxed">
                            Blend ancient Vastu wisdom with modern architectural excellence.
                            Get AI-powered floor plans that harmonize energy flow.
                        </p>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-3 mb-8">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border">
                                    <CheckCircle2 size={14} className="text-success" />
                                    <span className="text-sm font-bold text-foreground/70">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4 mb-10">
                            <FreeSampleButton size="lg" variant="primary" />
                            <Link
                                href="/services"
                                className="group flex items-center gap-3 px-6 py-4 bg-card border border-border rounded-full font-bold hover:border-primary/50 transition-all"
                            >
                                View Services
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-8 pt-8 border-t border-border">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs font-medium text-foreground/40 mt-1">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="hidden lg:block relative group">
                        <div className="relative w-full aspect-square max-w-[600px] mx-auto">
                            {/* Architectural Line Art Background */}
                            <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 500 500">
                                <circle cx="250" cy="250" r="240" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 10" className="text-primary" />
                                <circle cx="250" cy="250" r="180" fill="none" stroke="currentColor" strokeWidth="1" className="text-secondary" />
                                <path d="M50,250 L450,250 M250,50 L250,450 M100,100 L400,400 M100,400 L400,100" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
                            </svg>

                            {/* Rotating Vastu Compass */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative w-[450px] h-[450px] animate-[spin_60s_linear_infinite]">
                                    {/* Directions */}
                                    {["N", "NE", "E", "SE", "S", "SW", "W", "NW"].map((dir, i) => (
                                        <div
                                            key={dir}
                                            className="absolute top-0 left-1/2 -translate-x-1/2 h-full py-4 flex flex-col justify-between items-center"
                                            style={{ transformOrigin: "center", transform: `translateX(-50%) rotate(${i * 45}deg)` }}
                                        >
                                            <span className="text-[10px] font-black tracking-widest text-primary/40 group-hover:text-primary transition-colors">{dir}</span>
                                            <div className="w-px h-8 bg-gradient-to-b from-primary/20 to-transparent" />
                                        </div>
                                    ))}

                                    {/* Outer Ring */}
                                    <div className="absolute inset-0 rounded-full border border-primary/10 group-hover:border-primary/30 transition-colors" />
                                </div>
                            </div>

                            {/* Center Visual Plate */}
                            <div className="absolute inset-0 flex items-center justify-center p-20">
                                <div className="relative w-full h-full bg-card/40 backdrop-blur-3xl rounded-[3rem] border border-white/5 shadow-2xl flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
                                    <div className="relative z-10 flex flex-col items-center gap-6">
                                        <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/20 scale-110 hover:rotate-12 transition-transform cursor-pointer">
                                            <Play size={32} className="text-background ml-1.5" fill="currentColor" />
                                        </div>
                                        <div className="text-center">
                                            <div className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-1">Architecture v2.0</div>
                                            <div className="text-xl font-bold text-foreground">AI Energy Core</div>
                                        </div>
                                    </div>

                                    {/* Pulse Ring */}
                                    <div className="absolute w-[300%] h-[300%] bg-[radial-gradient(circle,rgba(var(--primary-rgb),0.1)_0%,transparent_70%)] animate-pulse" />
                                </div>
                            </div>

                            {/* AI Floating Nodes */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

                            {/* Floating Metadata Cards */}
                            <div className="absolute top-12 left-0 px-5 py-4 bg-card/80 backdrop-blur-xl rounded-2xl border border-border shadow-2xl animate-float">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                                        <CheckCircle2 size={18} className="text-success" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-foreground/50">Vastu Score</div>
                                        <div className="text-lg font-black text-foreground">98/100</div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-12 right-0 px-5 py-4 bg-card/80 backdrop-blur-xl rounded-2xl border border-border shadow-2xl animate-float" style={{ animationDelay: "2s" }}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Star size={18} className="text-primary" fill="currentColor" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-foreground/50">Client Rating</div>
                                        <div className="text-lg font-black text-foreground">4.9★</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
