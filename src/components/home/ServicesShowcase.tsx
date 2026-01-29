"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, ArrowRight, Ruler, Building, Compass, Home, Star, Sparkles } from "lucide-react";
import Link from "next/link";

type ServiceType = {
    id: string;
    title: string;
    tagline: string;
    description: string;
    icon: React.ElementType;
    price: string;
    features: string[];
    gradient: string;
    popular?: boolean;
};

const services: ServiceType[] = [
    {
        id: "2d-floor-plan",
        title: "2D Floor Plans",
        tagline: "Precision Drafting",
        description: "AutoCAD-grade layouts with room dimensions and Vastu grid overlay.",
        icon: Ruler,
        price: "₹2,999",
        features: ["Room Dimensions", "Furniture Layout", "Vastu Grid"],
        gradient: "from-primary to-yellow-500",
        popular: false
    },
    {
        id: "3d-elevation",
        title: "3D Elevations",
        tagline: "Visual Realism",
        description: "Photorealistic exterior renders with day/night lighting.",
        icon: Building,
        price: "₹4,999",
        features: ["4K Renders", "Day + Night", "Material Specs"],
        gradient: "from-secondary to-pink-500",
        popular: false
    },
    {
        id: "vastu-consultation",
        title: "Vastu Analysis",
        tagline: "AI-Powered",
        description: "Deep energy mapping with AI placement recommendations.",
        icon: Compass,
        price: "₹1,499",
        features: ["Energy Mapping", "AI Insights", "Placement Guide"],
        gradient: "from-accent to-cyan-400",
        popular: true
    },
    {
        id: "complete-architecture",
        title: "Complete Package",
        tagline: "Full Service",
        description: "End-to-end architecture from concept to construction docs.",
        icon: Home,
        price: "₹14,999",
        features: ["All Services", "Site Visits", "Contractor Docs"],
        gradient: "from-purple-500 to-violet-600",
        popular: false
    }
];

export default function ServicesShowcase() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section className="py-24 px-6 bg-background relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6">
                        <Sparkles size={16} />
                        Our Services
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
                        <span className="text-foreground">Choose Your </span>
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Plan
                        </span>
                    </h2>
                    <p className="text-lg text-foreground/50 max-w-2xl mx-auto">
                        From quick floor plans to complete architectural packages.
                        All designs are 100% Vastu-compliant.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service) => {
                        const IconComponent = service.icon;
                        const isHovered = hoveredId === service.id;

                        return (
                            <Link
                                key={service.id}
                                href={`/services/${service.id}`}
                                onMouseEnter={() => setHoveredId(service.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className={cn(
                                    "group relative p-6 rounded-3xl border transition-all duration-300",
                                    "bg-card hover:bg-card border-border hover:border-primary/30",
                                    isHovered && "shadow-[0_0_50px_-15px] shadow-primary/30",
                                    service.popular && "ring-2 ring-primary/50"
                                )}
                            >
                                {service.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-secondary text-background text-xs font-black rounded-full flex items-center gap-1">
                                        <Star size={10} />
                                        Most Popular
                                    </div>
                                )}

                                {/* Icon */}
                                <div className={cn(
                                    "w-12 h-12 rounded-xl mb-5 flex items-center justify-center text-white bg-gradient-to-br transition-transform duration-300",
                                    service.gradient,
                                    isHovered && "scale-110"
                                )}>
                                    <IconComponent size={22} strokeWidth={2} />
                                </div>

                                {/* Content */}
                                <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                                    {service.tagline}
                                </div>
                                <h3 className="text-lg font-black text-foreground mb-2 tracking-tight">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-foreground/50 mb-5 leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Features */}
                                <div className="space-y-2 mb-5">
                                    {service.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                                            <Check size={12} className="text-primary" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                {/* Price & CTA */}
                                <div className="flex items-end justify-between pt-4 border-t border-border">
                                    <div>
                                        <div className="text-xs text-foreground/40">From</div>
                                        <div className="text-xl font-black text-foreground">{service.price}</div>
                                    </div>
                                    <div className={cn(
                                        "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
                                        isHovered ? "bg-primary text-background" : "bg-primary/10 text-primary"
                                    )}>
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
