"use client";

import { ArrowRight, Calculator, ShoppingCart, Zap, Star, CheckCircle2, Clock, Sparkles } from "lucide-react";
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

const pricingTiers = [
    { name: "Basic", price: "₹2,999", desc: "2D Floor Plan + Basic Vastu" },
    { name: "Standard", price: "₹9,999", desc: "3D Elevation + Full Structural" },
    { name: "Premium", price: "₹24,999", desc: "Complete Civil + Site Visit" },
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
                    backgroundImage: `linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)`,
                    backgroundSize: "80px 80px"
                }}
            />

            {/* Glow Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="max-w-2xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                            <Zap size={14} className="text-primary" />
                            <span className="text-sm font-bold text-primary">AI-Powered Vastu Analysis</span>
                            <span className="px-2 py-0.5 bg-primary text-background text-[10px] font-black rounded-full">NEW</span>
                        </div>

                        {/* 48-Hour Delivery Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-8 ml-3">
                            <Clock size={14} className="text-success" />
                            <span className="text-sm font-bold text-success">48-Hour Delivery Guarantee</span>
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
                        <p className="text-base md:text-lg text-foreground/50 max-w-lg mb-6 leading-relaxed">
                            Blend ancient Vastu wisdom with modern architectural excellence.
                            Get AI-powered floor plans that harmonize energy flow.
                        </p>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-3 mb-6">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border">
                                    <CheckCircle2 size={14} className="text-success" />
                                    <span className="text-sm font-bold text-foreground/70">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-3 mb-8">
                            <FreeSampleButton size="lg" variant="primary" />
                            <Link
                                href="/calculator"
                                className="group flex items-center gap-2 px-5 py-3 bg-accent/10 border border-accent/30 rounded-full font-bold text-accent hover:bg-accent hover:text-background transition-all"
                            >
                                <Calculator size={18} />
                                Calculate Cost
                            </Link>
                            <Link
                                href="/shop"
                                className="group flex items-center gap-2 px-5 py-3 bg-card border border-border rounded-full font-bold hover:border-primary/50 transition-all"
                            >
                                <ShoppingCart size={18} className="text-primary" />
                                Buy Plan
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-8 pt-6 border-t border-border">
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

                    {/* Right Visual - Pricing Cards */}
                    <div className="hidden lg:block relative">
                        <div className="relative w-full max-w-[550px] mx-auto">
                            {/* Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-[3rem] blur-3xl" />

                            {/* Pricing Cards */}
                            <div className="relative space-y-4">
                                {pricingTiers.map((tier, idx) => (
                                    <div
                                        key={tier.name}
                                        className={`
                                            group p-5 rounded-2xl border backdrop-blur-xl transition-all duration-500 cursor-pointer
                                            ${idx === 1
                                                ? 'bg-primary/10 border-primary/40 scale-105 shadow-[0_0_40px_-10px] shadow-primary/30'
                                                : 'bg-card/60 border-border hover:border-primary/30 hover:bg-card/80'
                                            }
                                        `}
                                        style={{ animationDelay: `${idx * 150}ms` }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`
                                                    w-12 h-12 rounded-xl flex items-center justify-center
                                                    ${idx === 1 ? 'bg-primary text-background' : 'bg-primary/10 text-primary'}
                                                `}>
                                                    {idx === 0 && <Sparkles size={20} />}
                                                    {idx === 1 && <Star size={20} fill="currentColor" />}
                                                    {idx === 2 && <Zap size={20} />}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-black text-lg text-foreground">{tier.name}</span>
                                                        {idx === 1 && (
                                                            <span className="px-2 py-0.5 bg-primary text-background text-[10px] font-black rounded-full">
                                                                POPULAR
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="text-sm text-foreground/50">{tier.desc}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                                    {tier.price}
                                                </div>
                                                <div className="text-xs text-foreground/40">one-time</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Shop CTA */}
                            <div className="mt-6 text-center">
                                <Link
                                    href="/shop"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-background rounded-full font-black text-lg shadow-[0_4px_30px_-5px] shadow-primary/40 hover:shadow-primary/60 hover:scale-105 transition-all"
                                >
                                    <ShoppingCart size={20} />
                                    View All Plans
                                    <ArrowRight size={18} />
                                </Link>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -top-4 -right-4 px-4 py-2 bg-success/10 border border-success/30 rounded-full backdrop-blur-xl animate-float">
                                <div className="flex items-center gap-2">
                                    <Clock size={14} className="text-success" />
                                    <span className="text-xs font-bold text-success">48hr Delivery</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

