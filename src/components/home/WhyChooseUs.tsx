"use client";

import { Shield, Zap, Clock, Heart, Award, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
    {
        icon: Shield,
        title: "100% Vastu Compliant",
        description: "Every design passes our 108-point Vastu verification system.",
        color: "from-emerald-500 to-green-600",
        highlight: true
    },
    {
        icon: Zap,
        title: "AI-Powered Analysis",
        description: "Gemini AI integration for instant, accurate recommendations.",
        color: "from-primary to-yellow-500"
    },
    {
        icon: Clock,
        title: "48-Hour Delivery",
        description: "Express turnaround on standard floor plans guaranteed.",
        color: "from-accent to-cyan-500"
    },
    {
        icon: Heart,
        title: "Personalized Care",
        description: "Dedicated project manager for every client.",
        color: "from-secondary to-pink-500"
    },
    {
        icon: Award,
        title: "Award-Winning Team",
        description: "15+ years combined experience in architecture.",
        color: "from-purple-500 to-violet-600"
    },
    {
        icon: Users,
        title: "500+ Happy Families",
        description: "Join our community of satisfied homeowners.",
        color: "from-blue-500 to-indigo-600"
    }
];

export default function WhyChooseUs() {
    return (
        <section className="py-24 px-6 bg-background relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 text-success text-sm font-bold mb-6">
                        <Shield size={14} />
                        Trusted by 500+ Families
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
                        <span className="text-foreground">Why Choose </span>
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            VastuStructural
                        </span>
                    </h2>
                    <p className="text-lg text-foreground/50 max-w-xl mx-auto">
                        We combine ancient Vedic wisdom with modern technology
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {features.map((feature, idx) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={idx}
                                className={`group p-7 rounded-2xl border transition-all duration-300 hover:shadow-[0_0_40px_-10px] hover:shadow-primary/20 ${feature.highlight
                                        ? "bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30"
                                        : "bg-card border-border hover:border-primary/30"
                                    }`}
                            >
                                <div className={`w-14 h-14 rounded-2xl mb-5 flex items-center justify-center text-white bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                    <IconComponent size={24} strokeWidth={2} />
                                </div>

                                <h3 className="text-lg font-black text-foreground mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-foreground/50 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        href="/about"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-card border border-border rounded-full font-bold hover:border-primary/50 transition-all group"
                    >
                        Learn More About Us
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
