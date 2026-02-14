"use client";

import { Star, Quote, ExternalLink, CheckCircle2, MapPin } from "lucide-react";
import Link from "next/link";

type Review = {
    id: number;
    name: string;
    location: string;
    project: string;
    rating: number;
    review: string;
    date: string;
    verified: boolean;
    image?: string;
};

const reviews: Review[] = [
    {
        id: 1,
        name: "Rajesh Patil",
        location: "Mangrulpir",
        project: "2BHK Residential",
        rating: 5,
        review: "Excellent work by P M and Associates! Got my floor plan within 48 hours as promised. The Vastu analysis was very detailed and helpful. Highly recommended for anyone building a new home.",
        date: "January 2026",
        verified: true,
    },
    {
        id: 2,
        name: "Sunita Deshmukh",
        location: "Washim",
        project: "3BHK Villa",
        rating: 5,
        review: "Very professional service. The 3D elevation design exceeded our expectations. They incorporated all our requirements and the Vastu compliance was perfect. Worth every rupee!",
        date: "December 2025",
        verified: true,
    },
    {
        id: 3,
        name: "Amit Sharma",
        location: "Akola",
        project: "Commercial Complex",
        rating: 5,
        review: "I was skeptical about online services, but P M and Associates proved me wrong. Their structural plans were detailed and our contractor had no issues during construction. Great communication throughout.",
        date: "November 2025",
        verified: true,
    },
    {
        id: 4,
        name: "Priya Kulkarni",
        location: "Yavatmal",
        project: "Duplex House",
        rating: 5,
        review: "The AI-powered Vastu analysis was a game changer. They identified several issues with our original plan and provided solutions. Our home now has perfect energy flow. Thank you!",
        date: "October 2025",
        verified: true,
    },
    {
        id: 5,
        name: "Manoj Wankhade",
        location: "Buldhana",
        project: "Farmhouse",
        rating: 4,
        review: "Good quality work at affordable prices. The team was responsive and made revisions without any fuss. Delivery was on time. Recommended for budget-conscious clients.",
        date: "September 2025",
        verified: true,
    },
    {
        id: 6,
        name: "Kavita Jadhav",
        location: "Mangrulpir",
        project: "Row House",
        rating: 5,
        review: "Second time using P M and Associates. Consistent quality and excellent customer service. Their premium package with site visit was very helpful. Will definitely use again!",
        date: "August 2025",
        verified: true,
    },
];

const stats = [
    { value: "500+", label: "Projects Completed" },
    { value: "4.9★", label: "Average Rating" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "15+", label: "Years Experience" },
];

export default function ReviewsPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6">
                        <Star size={16} fill="currentColor" />
                        Client Reviews
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                        <span className="text-foreground">What Our</span>{" "}
                        <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                            Clients Say
                        </span>
                    </h1>
                    <p className="text-lg text-foreground/50 max-w-2xl mx-auto">
                        Real feedback from real clients across Maharashtra.
                        Join 500+ satisfied homeowners.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="p-6 bg-card/60 backdrop-blur-xl rounded-2xl border border-border text-center"
                        >
                            <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-foreground/50 font-bold">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Google Review Link */}
                <div className="flex justify-center mb-12">
                    <a
                        href="https://g.page/r/YOUR-GOOGLE-BUSINESS-ID/review"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-3 bg-card border border-border rounded-full font-bold hover:border-primary/50 transition-all group"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Review us on Google
                        <ExternalLink size={16} className="text-foreground/50 group-hover:text-primary transition-colors" />
                    </a>
                </div>

                {/* Reviews Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review, idx) => (
                        <div
                            key={review.id}
                            className="p-6 bg-card/60 backdrop-blur-xl rounded-2xl border border-border hover:border-primary/30 transition-all group"
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            {/* Quote Icon */}
                            <Quote size={32} className="text-primary/20 mb-4" />

                            {/* Review Text */}
                            <p className="text-foreground/70 text-sm leading-relaxed mb-6">
                                &ldquo;{review.review}&rdquo;
                            </p>

                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={i < review.rating ? "text-warning fill-warning" : "text-border"}
                                    />
                                ))}
                            </div>

                            {/* Reviewer Info */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="font-bold text-foreground flex items-center gap-2">
                                        {review.name}
                                        {review.verified && (
                                            <CheckCircle2 size={14} className="text-success" />
                                        )}
                                    </div>
                                    <div className="text-xs text-foreground/40 flex items-center gap-1 mt-1">
                                        <MapPin size={10} />
                                        {review.location}
                                    </div>
                                    <div className="text-xs text-primary mt-1 font-medium">
                                        {review.project}
                                    </div>
                                </div>
                                <div className="text-xs text-foreground/30">
                                    {review.date}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-16 text-center">
                    <div className="inline-block p-8 bg-gradient-to-br from-primary/10 via-card to-secondary/10 rounded-3xl border border-primary/20">
                        <h3 className="text-2xl font-black text-foreground mb-4">
                            Ready to Start Your Project?
                        </h3>
                        <p className="text-foreground/50 mb-6 max-w-md mx-auto">
                            Join hundreds of satisfied clients. Get your Vastu-compliant home design today.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/shop"
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-background rounded-full font-bold shadow-[0_4px_20px_-5px] shadow-primary/40 hover:shadow-primary/60 transition-all"
                            >
                                View Plans & Pricing
                            </Link>
                            <Link
                                href="/contact"
                                className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-full font-bold hover:border-primary/50 transition-all"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
