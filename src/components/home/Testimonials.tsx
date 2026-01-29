"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
    {
        name: "Rajesh Agarwal",
        location: "Jaipur, Rajasthan",
        avatar: "RA",
        rating: 5,
        text: "VastuStructural transformed our confused plot into a perfectly aligned home. The AI suggestions were incredible!",
        project: "4BHK Villa"
    },
    {
        name: "Priya Sharma",
        location: "Mumbai, Maharashtra",
        avatar: "PS",
        rating: 5,
        text: "As a first-time homeowner, I was overwhelmed. Their Vastu analysis was so detailed, even our pandit was impressed.",
        project: "2BHK Apartment"
    },
    {
        name: "Amit Desai",
        location: "Ahmedabad, Gujarat",
        avatar: "AD",
        rating: 5,
        text: "The elevation designs exceeded expectations. Modern yet vastu-compliant. Highly recommend!",
        project: "Duplex Design"
    },
    {
        name: "Kavitha Nair",
        location: "Kochi, Kerala",
        avatar: "KN",
        rating: 5,
        text: "Professional service from start to finish. The instant AI consultations saved us weeks.",
        project: "Traditional Home"
    }
];

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);

    const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    const current = testimonials[activeIndex];

    return (
        <section className="py-24 px-6 bg-card relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background to-card pointer-events-none" />
            <Quote size={300} className="absolute top-0 left-0 text-primary/5 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
                        <span className="text-foreground">Trusted by </span>
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">500+</span>
                        <span className="text-foreground"> Families</span>
                    </h2>
                    <p className="text-foreground/50">Real stories from real homeowners</p>
                </div>

                {/* Testimonial Card */}
                <div className="relative bg-background rounded-3xl border border-border p-8 md:p-12">
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                        {[...Array(current.rating)].map((_, i) => (
                            <Star key={i} size={20} className="fill-primary text-primary" />
                        ))}
                    </div>

                    {/* Quote */}
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-relaxed mb-8">
                        "{current.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-background text-lg font-black">
                                {current.avatar}
                            </div>
                            <div>
                                <div className="text-lg font-black text-foreground">{current.name}</div>
                                <div className="text-sm text-foreground/50">{current.location}</div>
                            </div>
                        </div>
                        <div className="px-4 py-2 bg-primary/10 text-primary text-sm font-bold rounded-full">
                            {current.project}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6">
                        <button
                            onClick={prev}
                            className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-background hover:border-primary transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6">
                        <button
                            onClick={next}
                            className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-background hover:border-primary transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={cn(
                                "h-2.5 rounded-full transition-all",
                                activeIndex === idx ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-foreground/30"
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
