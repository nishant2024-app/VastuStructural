"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import FreeSampleButton from "@/components/freesample/FreeSampleButton";

export default function CTABanner() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent" />

            {/* Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            {/* Floating Decorative Circles */}
            <div className="absolute top-10 left-10 w-20 h-20 border border-white/10 rounded-full animate-float pointer-events-none" />
            <div className="absolute bottom-10 right-20 w-32 h-32 border border-white/10 rounded-full animate-float pointer-events-none" style={{ animationDelay: "2s" }} />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold mb-8">
                    <Sparkles size={16} />
                    Limited Time Offer
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 drop-shadow-xl">
                    Start Your Dream Home
                    <br />
                    <span className="opacity-70 text-3xl md:text-4xl">Today</span>
                </h2>

                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
                    Get a free Vastu analysis with every floor plan order this month.
                    AI-powered insights delivered in minutes.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <FreeSampleButton size="lg" className="bg-white text-primary hover:bg-white/90" />
                    <Link
                        href="/contact"
                        className="flex items-center gap-2 px-8 py-5 border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all"
                    >
                        Contact Us
                        <ArrowRight size={20} />
                    </Link>
                </div>

                <p className="mt-10 text-white/50 text-sm">
                    ✓ No payment until you approve  ✓ Unlimited revisions on premium
                </p>
            </div>
        </section>
    );
}
