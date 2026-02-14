"use client";

import { useState } from "react";
import {
    Check, ArrowRight, Sparkles, Star, Clock, Shield,
    Zap, Ruler, Building2, Home, FileText, Phone,
    ChevronRight, Crown, Compass, Hexagon
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { plans, formatPrice } from "@/lib/types";
import FreeSampleButton from "@/components/freesample/FreeSampleButton";

// Additional individual services
const additionalServices = [
    {
        id: "2d-floor-plan",
        title: "2D Floor Plans",
        description: "Detailed AutoCAD floor plans with room dimensions",
        price: 2499,
        delivery: "2-3 Days",
        icon: Ruler,
    },
    {
        id: "3d-elevation",
        title: "3D Elevations",
        description: "Photorealistic 3D external views with materials",
        price: 4999,
        delivery: "4-5 Days",
        icon: Building2,
    },
    {
        id: "vastu-analysis",
        title: "Vastu Analysis",
        description: "Full 108-point Vastu audit with AI insights",
        price: 1999,
        delivery: "1-2 Days",
        icon: Compass,
    },
    {
        id: "structural-drawings",
        title: "Structural Drawings",
        description: "Engineering drawings for beams, columns, foundation",
        price: 5999,
        delivery: "5-7 Days",
        icon: Home,
    },
];

const stats = [
    { value: "500+", label: "Projects Delivered" },
    { value: "48h", label: "Turnaround Time" },
    { value: "100%", label: "Vastu Compliant" },
    { value: "5★", label: "Customer Rating" },
];

const guarantees = [
    { icon: Shield, title: "100% Vastu Compliant", desc: "Every design verified by experts" },
    { icon: Clock, title: "48-Hour Delivery", desc: "On-time guarantee or refund" },
    { icon: Star, title: "Premium Quality", desc: "Industry-leading standards" },
    { icon: Zap, title: "Fast Revisions", desc: "Quick turnaround on changes" },
];

export default function ServicesPage() {
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    return (
        <main className="min-h-screen bg-background pt-28 pb-20">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
            </div>

            {/* Hero Section */}
            <section className="relative px-6 mb-20">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-bold text-sm mb-6">
                        <Sparkles size={16} />
                        Trusted by 500+ Families
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight">
                        Structural Plans with<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                            Perfect Vastu
                        </span>
                    </h1>

                    <p className="text-xl text-foreground/60 max-w-2xl mx-auto mb-8">
                        Professional structural drawings delivered in 48 hours.
                        100% Vastu compliant. Government approved formats.
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-8 mb-12">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-2xl md:text-3xl font-black text-foreground">{stat.value}</div>
                                <div className="text-sm text-foreground/50">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Plans */}
            <section className="relative px-6 mb-24">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                            Choose Your Plan
                        </h2>
                        <p className="text-foreground/60">
                            Select the perfect package for your construction project
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {plans.map((plan, idx) => (
                            <div
                                key={plan.id}
                                className={cn(
                                    "relative bg-card/60 backdrop-blur-xl rounded-3xl border transition-all duration-300 overflow-hidden group",
                                    plan.popular
                                        ? "border-primary md:scale-105 md:-translate-y-2 shadow-[0_0_60px_-20px] shadow-primary/30"
                                        : "border-border hover:border-primary/50",
                                    selectedPlan === plan.id && "ring-2 ring-primary"
                                )}
                            >
                                {/* Popular Badge */}
                                {plan.popular && (
                                    <div className="absolute top-0 right-0">
                                        <div className="bg-gradient-to-r from-primary to-secondary text-background px-6 py-1.5 text-xs font-black rounded-bl-2xl flex items-center gap-1">
                                            <Crown size={12} />
                                            MOST POPULAR
                                        </div>
                                    </div>
                                )}

                                <div className="p-6 md:p-8">
                                    {/* Plan Header */}
                                    <div className="mb-6">
                                        <div className={cn(
                                            "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4",
                                            plan.gradient
                                        )}>
                                            <Hexagon size={28} className="text-background" />
                                        </div>
                                        <h3 className="text-2xl font-black text-foreground mb-2">{plan.name}</h3>
                                        <p className="text-sm text-foreground/50">{plan.description}</p>
                                    </div>

                                    {/* Pricing */}
                                    <div className="flex items-end gap-2 mb-2">
                                        <span className="text-4xl md:text-5xl font-black text-foreground">
                                            {formatPrice(plan.price)}
                                        </span>
                                        <span className="text-lg text-foreground/30 line-through mb-1">
                                            {formatPrice(plan.originalPrice)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="px-2 py-0.5 bg-success/10 text-success text-xs font-bold rounded">
                                            SAVE {formatPrice(plan.originalPrice - plan.price)}
                                        </span>
                                        <span className="text-sm text-foreground/50 flex items-center gap-1">
                                            <Clock size={14} />
                                            {plan.delivery}
                                        </span>
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Check size={12} className="text-success" />
                                                </div>
                                                <span className="text-sm text-foreground/70">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <Link
                                        href={`/shop?plan=${plan.id}`}
                                        className={cn(
                                            "w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all",
                                            plan.popular
                                                ? "bg-gradient-to-r from-primary to-secondary text-background hover:shadow-[0_8px_30px_-5px] hover:shadow-primary/40"
                                                : "bg-card border border-border text-foreground hover:border-primary hover:text-primary"
                                        )}
                                    >
                                        Buy Now
                                        <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Free Sample */}
                    <div className="text-center mt-8">
                        <FreeSampleButton />
                    </div>
                </div>
            </section>

            {/* Guarantees */}
            <section className="relative px-6 mb-24">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {guarantees.map((item, idx) => (
                            <div key={idx} className="bg-card/40 backdrop-blur-xl rounded-2xl border border-border p-5 text-center">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                    <item.icon size={24} className="text-primary" />
                                </div>
                                <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                                <p className="text-xs text-foreground/50">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Individual Services */}
            <section className="relative px-6 mb-24">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                            Individual Services
                        </h2>
                        <p className="text-foreground/60">
                            Need just one specific service? Choose below
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {additionalServices.map((service) => (
                            <div
                                key={service.id}
                                className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-5 hover:border-primary/50 transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <service.icon size={24} className="text-primary" />
                                </div>
                                <h3 className="font-bold text-foreground mb-1">{service.title}</h3>
                                <p className="text-xs text-foreground/50 mb-4">{service.description}</p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-xl font-black text-foreground">{formatPrice(service.price)}</div>
                                        <div className="text-xs text-foreground/40">{service.delivery}</div>
                                    </div>
                                    <Link
                                        href={`/contact?service=${service.id}`}
                                        className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-bold text-sm hover:bg-primary hover:text-background transition-all"
                                    >
                                        Enquire
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="relative px-6 mb-24">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                            How It Works
                        </h2>
                        <p className="text-foreground/60">
                            Simple 4-step process to get your structural plans
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { step: "01", title: "Choose Plan", desc: "Select the package that fits your needs" },
                            { step: "02", title: "Submit Details", desc: "Share your plot dimensions and requirements" },
                            { step: "03", title: "Expert Design", desc: "Our engineers create your Vastu plan" },
                            { step: "04", title: "Get Delivery", desc: "Receive plans in 48 hours via email" },
                        ].map((item, idx) => (
                            <div key={idx} className="relative">
                                <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6 text-center">
                                    <div className="text-5xl font-black text-primary/20 mb-2">{item.step}</div>
                                    <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                                    <p className="text-sm text-foreground/50">{item.desc}</p>
                                </div>
                                {idx < 3 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                                        <ChevronRight size={24} className="text-primary/40" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-gradient-to-br from-primary/10 via-card to-secondary/10 rounded-3xl border border-primary/20 p-8 md:p-12 text-center overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                                Ready to Build Your Dream Home?
                            </h2>
                            <p className="text-lg text-foreground/60 mb-8 max-w-xl mx-auto">
                                Get started with our professional structural plans.
                                100% Vastu compliant and delivered in 48 hours.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/shop"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-background rounded-full font-bold text-lg hover:shadow-[0_8px_40px_-5px] hover:shadow-primary/40 transition-all"
                                >
                                    <Sparkles size={20} />
                                    Buy Now
                                </Link>
                                <Link
                                    href="tel:+919067969756"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-card border border-border text-foreground rounded-full font-bold hover:border-primary transition-all"
                                >
                                    <Phone size={20} />
                                    Call Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
