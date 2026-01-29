"use client";

import { CheckCircle2, Sparkles } from "lucide-react";
import FreeSampleButton from "@/components/freesample/FreeSampleButton";

const benefits = [
    "AI-powered Vastu analysis",
    "Room layout recommendations",
    "Direction-wise placement guide",
    "Completely free, no strings attached"
];

const roomPreview = [
    { name: "Master BR", dir: "SW", color: "bg-primary/20 border-primary/30" },
    { name: "Kitchen", dir: "SE", color: "bg-secondary/20 border-secondary/30" },
    { name: "Living", dir: "NE", color: "bg-accent/20 border-accent/30" },
    { name: "Bedroom 2", dir: "W", color: "bg-purple-500/20 border-purple-500/30" },
    { name: "Puja", dir: "NE", color: "bg-yellow-500/20 border-yellow-500/30" },
    { name: "Bedroom 3", dir: "NW", color: "bg-blue-500/20 border-blue-500/30" },
];

export default function FreeSampleSection() {
    return (
        <section className="py-24 px-6 bg-card relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background to-card pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 text-success text-sm font-bold">
                            <Sparkles size={16} />
                            100% Free • No Credit Card
                        </div>

                        <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight">
                            <span className="text-foreground">Get Your Free</span>
                            <br />
                            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                Sample Plan
                            </span>
                        </h2>

                        <p className="text-lg text-foreground/50 leading-relaxed max-w-lg">
                            Experience AI-driven Vastu analysis. Enter your plot details and receive
                            personalized floor plan recommendations instantly.
                        </p>

                        <div className="space-y-3">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 size={14} className="text-success" />
                                    </div>
                                    <span className="text-foreground/70">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-2">
                            <FreeSampleButton size="lg" />
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="relative">
                        <div className="bg-background rounded-3xl border border-border p-6 md:p-8 relative">
                            {/* Glow Effect */}
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl pointer-events-none" />

                            {/* Preview Header */}
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                                <div>
                                    <div className="text-xs font-bold text-primary uppercase tracking-wider">Sample Preview</div>
                                    <div className="text-lg font-black text-foreground">3 BHK Floor Plan</div>
                                </div>
                                <div className="px-3 py-1 bg-success/10 text-success text-xs font-bold rounded-full">
                                    AI Generated
                                </div>
                            </div>

                            {/* Room Grid */}
                            <div className="grid grid-cols-3 gap-3 mb-6">
                                {roomPreview.map((room, idx) => (
                                    <div
                                        key={idx}
                                        className={`aspect-square rounded-xl p-3 flex flex-col justify-between border ${room.color}`}
                                    >
                                        <span className="text-[10px] font-black text-primary">{room.dir}</span>
                                        <span className="text-xs font-bold text-foreground/70">{room.name}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Vastu Tip */}
                            <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                                <div className="text-xs font-black text-primary uppercase tracking-wider mb-1">Vastu Tip</div>
                                <p className="text-sm text-foreground/60 italic">
                                    "Place master bedroom in South-West for stability energy."
                                </p>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-background rounded-full font-black text-sm shadow-xl whitespace-nowrap">
                            100% Vastu Compliant
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
