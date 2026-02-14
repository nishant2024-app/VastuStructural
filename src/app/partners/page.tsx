"use client";

import { Users, IndianRupee, TrendingUp, Shield, Award, CheckCircle2, ArrowRight, Handshake, MapPin, Star, Phone } from "lucide-react";
import Link from "next/link";

const benefits = [
    {
        icon: IndianRupee,
        title: "Earn Commissions",
        desc: "Get 10% commission on every plan sold through your referral link. Basic plan = ₹300, Standard = ₹1,000, Premium = ₹2,500 per sale.",
    },
    {
        icon: TrendingUp,
        title: "Grow Your Business",
        desc: "Offer professional Vastu-compliant plans to your clients. Enhance your reputation with AI-powered structural designs.",
    },
    {
        icon: Shield,
        title: "Zero Investment",
        desc: "No upfront costs. No inventory. Just share your referral link and earn. We handle everything from design to delivery.",
    },
    {
        icon: Award,
        title: "Priority Projects",
        desc: "Get assigned to on-site visits and construction oversight for Premium plan customers in your area.",
    },
];

const howItWorks = [
    { step: 1, title: "Apply", desc: "Fill out a simple application form with your details and experience." },
    { step: 2, title: "Get Approved", desc: "Our team reviews your application within 24-48 hours." },
    { step: 3, title: "Share & Earn", desc: "Get your unique referral link and start earning on every sale." },
    { step: 4, title: "Collaborate", desc: "Work with us on local projects and site visits." },
];

const testimonials = [
    {
        name: "Rajendra Patil",
        location: "Akola",
        text: "Partnering with VastuStructural has added ₹15,000-20,000 monthly to my income. The plans I offer are now 100% Vastu compliant!",
        earnings: "₹50,000+",
    },
    {
        name: "Suresh Deshmukh",
        location: "Washim",
        text: "As a local contractor, having professional structural plans to offer gives me an edge. Clients trust me more now.",
        earnings: "₹35,000+",
    },
];

const faqs = [
    { q: "How much can I earn?", a: "10% commission on every sale. A Basic plan (₹2,999) earns you ₹300, Standard (₹9,999) earns ₹1,000, and Premium (₹24,999) earns ₹2,500." },
    { q: "How do I get paid?", a: "Commissions are paid monthly via bank transfer. Minimum payout is ₹1,000." },
    { q: "Is there any fee to join?", a: "No. Joining as a partner is 100% free. No hidden charges." },
    { q: "What areas do you cover?", a: "Currently focusing on Maharashtra. Priority for Vidarbha and Marathwada regions." },
];

export default function PartnersPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold mb-6">
                        <Handshake size={16} />
                        Partner Program
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                        <span className="text-foreground">Become a</span><br />
                        <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                            VastuStructural Partner
                        </span>
                    </h1>
                    <p className="text-lg text-foreground/50 max-w-2xl mx-auto mb-8">
                        Join our network of 50+ contractors across Maharashtra.
                        Offer professional Vastu-compliant plans to your clients and earn commissions on every sale.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/partners/apply"
                            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-background rounded-full font-bold text-lg shadow-[0_4px_30px_-5px] shadow-primary/40 hover:shadow-primary/60 hover:scale-105 transition-all"
                        >
                            <Users size={20} />
                            Apply Now
                            <ArrowRight size={18} />
                        </Link>
                        <a
                            href="tel:+919067969756"
                            className="flex items-center gap-2 px-8 py-4 bg-card border border-border rounded-full font-bold text-lg hover:border-primary/50 transition-all"
                        >
                            <Phone size={20} className="text-primary" />
                            Call: +91 9067969756
                        </a>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                    {[
                        { value: "50+", label: "Active Partners" },
                        { value: "₹5L+", label: "Paid to Partners" },
                        { value: "10%", label: "Commission Rate" },
                        { value: "100+", label: "Village Coverage" },
                    ].map((stat, idx) => (
                        <div key={idx} className="p-6 bg-card/60 rounded-2xl border border-border text-center">
                            <div className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-foreground/50 font-bold">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Benefits Grid */}
                <div className="mb-20">
                    <h2 className="text-3xl font-black text-foreground text-center mb-10">
                        Why Partner With Us?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {benefits.map((benefit, idx) => (
                            <div
                                key={idx}
                                className="p-8 bg-card/60 rounded-3xl border border-border hover:border-primary/30 transition-all group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                    <benefit.icon size={26} className="text-primary" />
                                </div>
                                <h3 className="text-xl font-black text-foreground mb-3">{benefit.title}</h3>
                                <p className="text-foreground/60 leading-relaxed">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* How It Works */}
                <div className="mb-20">
                    <h2 className="text-3xl font-black text-foreground text-center mb-10">
                        How It Works
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {howItWorks.map((step, idx) => (
                            <div key={idx} className="relative text-center">
                                {idx < howItWorks.length - 1 && (
                                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                                )}
                                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 text-2xl font-black text-background">
                                    {step.step}
                                </div>
                                <h4 className="text-lg font-black text-foreground mb-2">{step.title}</h4>
                                <p className="text-sm text-foreground/50">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Partner Testimonials */}
                <div className="mb-20">
                    <h2 className="text-3xl font-black text-foreground text-center mb-10">
                        Partner Success Stories
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {testimonials.map((testimonial, idx) => (
                            <div
                                key={idx}
                                className="p-8 bg-gradient-to-br from-primary/5 via-card to-secondary/5 rounded-3xl border border-primary/20"
                            >
                                <div className="flex items-center gap-1 mb-4">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} size={16} className="text-warning fill-warning" />
                                    ))}
                                </div>
                                <p className="text-foreground/70 leading-relaxed mb-6">&ldquo;{testimonial.text}&rdquo;</p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-bold text-foreground">{testimonial.name}</div>
                                        <div className="text-xs text-foreground/40 flex items-center gap-1">
                                            <MapPin size={10} />
                                            {testimonial.location}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-foreground/40">Total Earnings</div>
                                        <div className="text-xl font-black text-success">{testimonial.earnings}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQs */}
                <div className="mb-20">
                    <h2 className="text-3xl font-black text-foreground text-center mb-10">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4 max-w-3xl mx-auto">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="p-6 bg-card/60 rounded-2xl border border-border"
                            >
                                <h4 className="font-bold text-foreground mb-2">{faq.q}</h4>
                                <p className="text-foreground/60 text-sm">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Final CTA */}
                <div className="text-center p-12 bg-gradient-to-br from-primary/10 via-card to-accent/10 rounded-[3rem] border border-primary/20">
                    <h2 className="text-3xl font-black text-foreground mb-4">
                        Ready to Start Earning?
                    </h2>
                    <p className="text-foreground/50 mb-8 max-w-lg mx-auto">
                        Join VastuStructural&apos;s partner network today and grow your business
                        while helping families build Vastu-compliant dream homes.
                    </p>
                    <Link
                        href="/partners/apply"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary to-accent text-background rounded-full font-black text-xl shadow-[0_4px_40px_-10px] shadow-primary/50 hover:shadow-primary/70 hover:scale-105 transition-all"
                    >
                        <Users size={24} />
                        Apply Now - It&apos;s Free
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
