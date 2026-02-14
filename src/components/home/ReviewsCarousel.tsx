"use client";

import { useState, useEffect, useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface Review {
    id: string;
    name: string;
    location: string;
    rating: number;
    text: string;
    planType: string;
    verified: boolean;
    date: string;
}

const reviews: Review[] = [
    {
        id: "1",
        name: "Rajesh Kumar",
        location: "Washim, Maharashtra",
        rating: 5,
        text: "Excellent service! Got my structural plan in just 48 hours. The Vastu compliance was perfect and the contractor they assigned was very professional.",
        planType: "Standard Plan",
        verified: true,
        date: "Feb 2026",
    },
    {
        id: "2",
        name: "Priya Sharma",
        location: "Akola, Maharashtra",
        rating: 5,
        text: "Very impressed with the quality of drawings. The 3D elevations helped me visualize my dream home perfectly. Worth every rupee!",
        planType: "Premium Plan",
        verified: true,
        date: "Jan 2026",
    },
    {
        id: "3",
        name: "Amit Patil",
        location: "Nagpur, Maharashtra",
        rating: 5,
        text: "Fast delivery and excellent support. They even made 2 revisions free of cost. Highly recommended for anyone building a new home.",
        planType: "Standard Plan",
        verified: true,
        date: "Jan 2026",
    },
    {
        id: "4",
        name: "Sunita Deshmukh",
        location: "Yavatmal, Maharashtra",
        rating: 5,
        text: "The calculator helped me estimate costs accurately. Then the structural plan matched exactly what I needed. Great Vastu consultancy too!",
        planType: "Basic Plan",
        verified: true,
        date: "Dec 2025",
    },
    {
        id: "5",
        name: "Vikram Jadhav",
        location: "Amravati, Maharashtra",
        rating: 5,
        text: "Professional team, excellent communication. The pooja room placement as per Vastu brought positive energy to our new home.",
        planType: "Premium Plan",
        verified: true,
        date: "Dec 2025",
    },
];

export default function ReviewsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % reviews.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const handlePrev = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    const handleNext = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    };

    return (
        <section className="relative py-20 px-6 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-warning/10 border border-warning/20 rounded-full text-warning font-bold text-sm mb-4">
                        <Star size={14} fill="currentColor" />
                        500+ Happy Customers
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                        What Our Clients Say
                    </h2>
                    <p className="text-foreground/60 max-w-xl mx-auto">
                        Real reviews from families who built their dream homes with us
                    </p>
                </div>

                {/* Reviews */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground/50 hover:text-primary hover:border-primary transition-all hidden md:flex"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground/50 hover:text-primary hover:border-primary transition-all hidden md:flex"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Cards Container */}
                    <div className="overflow-hidden px-4 md:px-12">
                        <div
                            ref={scrollRef}
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="w-full flex-shrink-0 px-2"
                                >
                                    <div className="bg-card/60 backdrop-blur-xl rounded-3xl border border-border p-6 md:p-8 max-w-2xl mx-auto">
                                        {/* Quote Icon */}
                                        <Quote size={40} className="text-primary/20 mb-4" />

                                        {/* Review Text */}
                                        <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-6">
                                            &ldquo;{review.text}&rdquo;
                                        </p>

                                        {/* Rating */}
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={20}
                                                    className={cn(
                                                        i < review.rating
                                                            ? "text-warning fill-warning"
                                                            : "text-border"
                                                    )}
                                                />
                                            ))}
                                        </div>

                                        {/* Author */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-background font-bold">
                                                    {review.name.split(" ").map(n => n[0]).join("")}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-foreground flex items-center gap-1">
                                                        {review.name}
                                                        {review.verified && (
                                                            <BadgeCheck size={16} className="text-primary" />
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-foreground/50">{review.location}</div>
                                                </div>
                                            </div>
                                            <div className="text-right hidden sm:block">
                                                <div className="text-sm font-bold text-primary">{review.planType}</div>
                                                <div className="text-xs text-foreground/40">{review.date}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        {reviews.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setIsAutoPlaying(false);
                                    setCurrentIndex(idx);
                                }}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all",
                                    currentIndex === idx
                                        ? "w-8 bg-primary"
                                        : "bg-border hover:bg-foreground/30"
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
