"use client";

import { useState } from "react";
import { Check, ArrowRight, Ruler, Building, Compass, Layout, Home, Hammer, Sparkles, Star, Clock, Shield } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import FreeSampleButton from "@/components/freesample/FreeSampleButton";

type ServiceType = {
    id: string;
    title: string;
    description: string;
    price: string;
    deliveryTime: string;
    icon: React.ElementType;
    features: string[];
    gradient: string;
    popular?: boolean;
};

const services: ServiceType[] = [
    {
        id: "2d-floor-plan",
        title: "2D Floor Plans",
        description: "Detailed AutoCAD floor plans with room dimensions and Vastu-aligned furniture layout.",
        price: "₹2,499",
        deliveryTime: "2-3 Days",
        icon: Ruler,
        features: ["Vastu Grid Overlay", "Furniture Placement", "PDF & DWG Formats", "1 Free Revision"],
        gradient: "from-primary to-yellow-500"
    },
    {
        id: "3d-elevation",
        title: "3D Elevations",
        description: "Photorealistic 3D external views with material specifications and lighting.",
        price: "₹4,999",
        deliveryTime: "4-5 Days",
        icon: Building,
        features: ["Day & Night Views", "Material Texturing", "Landscape Design", "2 Free Revisions"],
        gradient: "from-secondary to-pink-500"
    },
    {
        id: "vastu-consultancy",
        title: "Vastu Analysis",
        description: "Full Vastu audit with AI-powered insights and dosha remedies.",
        price: "₹1,999",
        deliveryTime: "1-2 Days",
        icon: Compass,
        features: ["108-Point Analysis", "Energy Mapping", "Remedy Report", "Video Consultation"],
        gradient: "from-accent to-cyan-400",
        popular: true
    },
    {
        id: "interior-planning",
        title: "Interior Layouts",
        description: "Functional and aesthetic interior space planning for every room.",
        price: "₹3,499",
        deliveryTime: "3-4 Days",
        icon: Layout,
        features: ["Space Optimization", "Lighting Design", "Color Palette", "Furniture Suggestions"],
        gradient: "from-purple-500 to-violet-500"
    },
    {
        id: "structural-drawings",
        title: "Structural Plans",
        description: "Engineering drawings for beam, column, and foundation reinforcement.",
        price: "₹5,999",
        deliveryTime: "7 Days",
        icon: Home,
        features: ["Stability Analysis", "Steel Detailing", "Concrete Grades", "Site Guidance"],
        gradient: "from-emerald-500 to-green-500"
    },
    {
        id: "renovation-plans",
        title: "Renovation Plans",
        description: "Modernize your existing home while maintaining structural integrity.",
        price: "₹4,499",
        deliveryTime: "5 Days",
        icon: Hammer,
        features: ["Site Assessment", "Modern Upgrades", "Cost Estimates", "Phase Roadmap"],
        gradient: "from-orange-500 to-amber-500"
    }
];

const features = [
    { icon: Shield, title: "100% Vastu Compliant", desc: "Every design verified" },
    { icon: Clock, title: "Fast Delivery", desc: "On-time guarantee" },
    { icon: Star, title: "Premium Quality", desc: "Industry standards" }
];

export default function ServicesPage() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-8">
                            <Sparkles size={16} />
                            Transparent Pricing
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
                            <span className="text-foreground">Professional</span>
                            <br />
                            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                Architecture Services
                            </span>
                        </h1>
                        <p className="text-xl text-foreground/50 max-w-2xl mx-auto mb-10">
                            Clear pricing. Fast delivery. 100% Vastu-compliant designs.
                        </p>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            {features.map((f, idx) => (
                                <div key={idx} className="flex items-center gap-3 px-5 py-3 bg-card rounded-full border border-border">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <f.icon size={16} className="text-primary" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-bold text-foreground">{f.title}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <Link
                                key={service.id}
                                href={`/services/${service.id}`}
                                onMouseEnter={() => setHoveredId(service.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className={cn(
                                    "group relative p-8 rounded-[2rem] border-2 transition-all duration-500",
                                    "bg-card hover:bg-card",
                                    hoveredId === service.id
                                        ? "border-primary shadow-[0_0_60px_-15px] shadow-primary/30 scale-[1.02]"
                                        : "border-border",
                                    service.popular && "ring-2 ring-primary/30"
                                )}
                            >
                                {/* Popular Badge */}
                                {service.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-primary to-secondary text-background text-xs font-black rounded-full flex items-center gap-2">
                                        <Star size={12} />
                                        Most Popular
                                    </div>
                                )}

                                {/* Icon */}
                                <div className={cn(
                                    "w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-white bg-gradient-to-br transition-all duration-500",
                                    service.gradient,
                                    hoveredId === service.id && "scale-110 rotate-3"
                                )}>
                                    <service.icon size={28} />
                                </div>

                                {/* Title & Description */}
                                <h3 className="text-2xl font-black text-foreground mb-2 tracking-tight">
                                    {service.title}
                                </h3>
                                <p className="text-foreground/50 mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Features */}
                                <div className="space-y-3 mb-8">
                                    {service.features.map((f, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Check size={12} className="text-primary" />
                                            </div>
                                            <span className="text-sm text-foreground/70">{f}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Price & CTA */}
                                <div className="flex items-end justify-between pt-6 border-t border-border">
                                    <div>
                                        <div className="text-xs text-foreground/40 font-medium">Starting at</div>
                                        <div className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                            {service.price}
                                        </div>
                                    </div>
                                    <div className={cn(
                                        "flex items-center gap-2 text-sm font-bold transition-all",
                                        hoveredId === service.id ? "text-primary" : "text-foreground/50"
                                    )}>
                                        <Clock size={14} />
                                        {service.deliveryTime}
                                    </div>
                                </div>

                                {/* Hover Arrow */}
                                <div className={cn(
                                    "absolute bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500",
                                    hoveredId === service.id
                                        ? "bg-primary text-background scale-100 opacity-100"
                                        : "bg-transparent text-primary scale-75 opacity-0"
                                )}>
                                    <ArrowRight size={20} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="pb-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="relative p-12 md:p-16 rounded-[3rem] overflow-hidden">
                        {/* Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-90" />
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23000%22 fill-opacity=%220.1%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

                        <div className="relative z-10 text-center">
                            <h2 className="text-4xl md:text-5xl font-black text-background mb-4 tracking-tight">
                                Not Sure Which Plan?
                            </h2>
                            <p className="text-xl text-background/80 mb-10 max-w-xl mx-auto">
                                Get a free AI-powered sample floor plan to experience our quality firsthand.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <FreeSampleButton size="lg" className="bg-background text-primary hover:bg-background/90" />
                                <Link
                                    href="/contact"
                                    className="flex items-center gap-2 px-8 py-5 border-2 border-background/30 text-background rounded-full font-black text-lg hover:bg-background/10 transition-all"
                                >
                                    Talk to Expert
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
