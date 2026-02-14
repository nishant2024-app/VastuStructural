"use client";

import { useState, useEffect } from "react";
import { Check, ArrowRight, Star, Shield, Clock, Zap, Sparkles, CreditCard, Phone, FileText, Home, Building, Compass, Users, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

declare global {
    interface Window {
        Razorpay: any;
    }
}

type PlanType = {
    id: string;
    name: string;
    price: string;
    priceNum: number;
    description: string;
    deliveryTime: string;
    features: string[];
    popular?: boolean;
    gradient: string;
    icon: React.ElementType;
};

const plans: PlanType[] = [
    {
        id: "basic",
        name: "Basic",
        price: "₹2,999",
        priceNum: 2999,
        description: "2D Floor Plan + Basic Vastu Analysis",
        deliveryTime: "48 Hours",
        icon: Home,
        gradient: "from-primary to-cyan-400",
        features: [
            "2D AutoCAD Floor Plan",
            "Room dimensions & layout",
            "Basic Vastu grid overlay",
            "Furniture placement guide",
            "PDF & DWG formats",
            "1 free revision",
        ],
    },
    {
        id: "standard",
        name: "Standard",
        price: "₹9,999",
        priceNum: 9999,
        description: "3D Elevation + Full Structural Design",
        deliveryTime: "3-5 Days",
        icon: Building,
        gradient: "from-secondary to-pink-400",
        popular: true,
        features: [
            "Everything in Basic",
            "3D photorealistic elevation",
            "Day & night views",
            "Full structural drawings",
            "Beam & column layout",
            "Foundation details",
            "Steel reinforcement schedule",
            "2 free revisions",
        ],
    },
    {
        id: "premium",
        name: "Premium",
        price: "₹24,999",
        priceNum: 24999,
        description: "Complete Civil + Electrical + Plumbing + Site Visit",
        deliveryTime: "7-10 Days",
        icon: Compass,
        gradient: "from-accent to-emerald-400",
        features: [
            "Everything in Standard",
            "Electrical layout plan",
            "Plumbing & drainage plan",
            "Complete Vastu audit report",
            "Energy mapping (AI-based)",
            "Material estimation PDF",
            "1 on-site visit (within MH)",
            "Video consultation",
            "Unlimited revisions",
            "Priority support",
        ],
    },
];

const additionalServices = [
    { name: "Structural Audit", price: "₹4,999", desc: "Visual inspection & report", icon: Shield },
    { name: "Energy Mapping", price: "₹1,999", desc: "AI-based sunlight & airflow", icon: Zap },
    { name: "Material Estimate", price: "₹999", desc: "Detailed PDF with quantities", icon: FileText },
    { name: "Digital Vastu Audit", price: "₹1,499", desc: "108-point AI analysis", icon: Compass },
];

const trustBadges = [
    { icon: Shield, text: "100% Secure Payment" },
    { icon: Clock, text: "48-Hour Delivery" },
    { icon: Users, text: "500+ Happy Clients" },
];

export default function ShopPage() {
    const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [referralCode, setReferralCode] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
    });
    const [orderSuccess, setOrderSuccess] = useState<{ orderId: string; planName: string } | null>(null);

    // Check for referral code in URL
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const ref = urlParams.get("ref");
        if (ref) {
            setReferralCode(ref);
        }
    }, []);

    // Load Razorpay script
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleBuyNow = (plan: PlanType) => {
        setSelectedPlan(plan);
        setShowModal(true);
    };

    const handlePayment = async () => {
        if (!selectedPlan || !formData.name || !formData.phone) return;

        setIsLoading(true);

        try {
            // Create order
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    planId: selectedPlan.id,
                    customerName: formData.name,
                    customerPhone: formData.phone,
                    customerEmail: formData.email,
                    referralCode: referralCode,
                }),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || "Failed to create order");
            }

            // Initialize Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency,
                name: "VastuStructural",
                description: data.planName,
                order_id: data.orderId,
                handler: async function (response: any) {
                    // Verify payment
                    const verifyRes = await fetch("/api/checkout/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            planId: selectedPlan.id,
                            customerName: formData.name,
                            customerPhone: formData.phone,
                            customerEmail: formData.email,
                            referralCode: referralCode,
                        }),
                    });

                    const verifyData = await verifyRes.json();

                    if (verifyData.success) {
                        setShowModal(false);
                        setOrderSuccess({
                            orderId: verifyData.orderId,
                            planName: selectedPlan.name,
                        });
                    } else {
                        alert("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone,
                },
                theme: {
                    color: "#38bdf8",
                },
                modal: {
                    ondismiss: function () {
                        setIsLoading(false);
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment error:", error);
            alert("Failed to initiate payment. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Referral Badge */}
                {referralCode && (
                    <div className="mb-6 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/30 rounded-full text-success text-sm">
                            <Users size={16} />
                            Referred by Partner: <span className="font-bold">{referralCode}</span>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6">
                        <CreditCard size={16} />
                        Transparent Pricing
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                        <span className="text-foreground">Choose Your</span>{" "}
                        <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                            Plan
                        </span>
                    </h1>
                    <p className="text-lg text-foreground/50 max-w-2xl mx-auto mb-8">
                        Professional architectural plans with 100% Vastu compliance.
                        48-hour delivery guaranteed.
                    </p>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap justify-center gap-6">
                        {trustBadges.map((badge, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-foreground/60">
                                <badge.icon size={18} className="text-success" />
                                <span className="text-sm font-bold">{badge.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Success Message */}
                {orderSuccess && (
                    <div className="mb-12 p-8 bg-success/10 border border-success/30 rounded-3xl text-center">
                        <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                            <Check size={32} className="text-success" />
                        </div>
                        <h2 className="text-2xl font-black text-foreground mb-2">Payment Successful!</h2>
                        <p className="text-foreground/70 mb-4">
                            Thank you for purchasing the <strong>{orderSuccess.planName}</strong> plan.
                        </p>
                        <p className="text-sm text-foreground/50 mb-6">
                            Order ID: <span className="font-mono font-bold">{orderSuccess.orderId}</span>
                        </p>
                        <p className="text-foreground/70">
                            We&apos;ll contact you on your phone number within 2 hours to collect plot details.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-success text-background rounded-full font-bold"
                        >
                            <Phone size={18} />
                            Contact Us Now: +91 9067969756
                        </Link>
                    </div>
                )}

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {plans.map((plan, idx) => (
                        <div
                            key={plan.id}
                            className={cn(
                                "relative p-8 rounded-[2rem] border-2 transition-all duration-500 group",
                                plan.popular
                                    ? "bg-card border-primary shadow-[0_0_60px_-15px] shadow-primary/30 scale-105 z-10"
                                    : "bg-card/60 border-border hover:border-primary/50"
                            )}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-primary to-secondary text-background text-xs font-black rounded-full flex items-center gap-2">
                                    <Star size={12} fill="currentColor" />
                                    MOST POPULAR
                                </div>
                            )}

                            {/* Icon */}
                            <div className={cn(
                                "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6",
                                plan.gradient
                            )}>
                                <plan.icon size={28} className="text-white" />
                            </div>

                            {/* Plan Name & Description */}
                            <h3 className="text-2xl font-black text-foreground mb-2">{plan.name}</h3>
                            <p className="text-sm text-foreground/50 mb-6">{plan.description}</p>

                            {/* Price */}
                            <div className="mb-6">
                                <div className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    {plan.price}
                                </div>
                                <div className="text-sm text-foreground/40 flex items-center gap-2 mt-1">
                                    <Clock size={14} />
                                    Delivery: {plan.deliveryTime}
                                </div>
                            </div>

                            {/* Features */}
                            <div className="space-y-3 mb-8">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <Check size={12} className="text-success" />
                                        </div>
                                        <span className="text-sm text-foreground/70">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <button
                                onClick={() => handleBuyNow(plan)}
                                className={cn(
                                    "w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2",
                                    plan.popular
                                        ? "bg-gradient-to-r from-primary to-accent text-background shadow-[0_4px_20px_-5px] shadow-primary/40 hover:shadow-primary/60"
                                        : "bg-primary/10 text-primary hover:bg-primary hover:text-background"
                                )}
                            >
                                <CreditCard size={18} />
                                Buy Now
                            </button>
                        </div>
                    ))}
                </div>

                {/* Additional Services */}
                <div className="mb-20">
                    <h2 className="text-2xl font-black text-foreground text-center mb-8">
                        Add-On Services
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {additionalServices.map((service, idx) => (
                            <div
                                key={idx}
                                className="p-5 bg-card/60 rounded-2xl border border-border hover:border-primary/30 transition-all cursor-pointer group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                    <service.icon size={22} className="text-primary" />
                                </div>
                                <div className="font-bold text-foreground mb-1">{service.name}</div>
                                <div className="text-xs text-foreground/50 mb-3">{service.desc}</div>
                                <div className="text-lg font-black text-primary">{service.price}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-8 text-center">
                    <h3 className="font-bold text-foreground mb-4">Accepted Payment Methods</h3>
                    <div className="flex flex-wrap justify-center gap-6 text-foreground/50">
                        <div className="flex items-center gap-2">
                            <CreditCard size={20} />
                            <span>Credit/Debit Cards</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={20} />
                            <span>UPI / Google Pay</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield size={20} />
                            <span>Net Banking</span>
                        </div>
                    </div>
                    <p className="text-xs text-foreground/30 mt-4">
                        Secure payments powered by Razorpay. Your data is 100% protected.
                    </p>
                </div>

                {/* Partner CTA */}
                <div className="mt-12 p-8 bg-gradient-to-br from-primary/10 via-card to-secondary/10 rounded-3xl border border-primary/20 text-center">
                    <h3 className="text-xl font-black text-foreground mb-2">Are you a Contractor?</h3>
                    <p className="text-foreground/50 mb-6">
                        Partner with us and earn commissions on every referral!
                    </p>
                    <Link
                        href="/partners"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background rounded-full font-bold hover:bg-primary/90 transition-all"
                    >
                        <Users size={18} />
                        Become a Partner
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Contact CTA */}
                <div className="mt-8 text-center">
                    <p className="text-foreground/50 mb-4">
                        Need a custom package? Talk to our experts.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-full font-bold hover:border-primary/50 transition-all"
                    >
                        <Phone size={18} className="text-primary" />
                        Contact Us: +91 9067969756
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>

            {/* Checkout Modal */}
            {showModal && selectedPlan && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-card rounded-3xl border border-border p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-black text-foreground">Complete Purchase</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 rounded-xl hover:bg-background transition-colors"
                            >
                                <X size={20} className="text-foreground/50" />
                            </button>
                        </div>

                        {/* Plan Summary */}
                        <div className="p-4 bg-background rounded-xl border border-border mb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-bold text-foreground">{selectedPlan.name} Plan</div>
                                    <div className="text-xs text-foreground/50">{selectedPlan.description}</div>
                                </div>
                                <div className="text-2xl font-black text-primary">{selectedPlan.price}</div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-bold text-foreground/70 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-foreground/70 mb-2">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="Enter 10-digit phone number"
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-foreground/70 mb-2">
                                    Email (Optional)
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>
                        </div>

                        {/* Pay Button */}
                        <button
                            onClick={handlePayment}
                            disabled={isLoading || !formData.name || !formData.phone}
                            className={cn(
                                "w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3",
                                formData.name && formData.phone
                                    ? "bg-gradient-to-r from-primary to-accent text-background shadow-[0_4px_20px_-5px] shadow-primary/40"
                                    : "bg-border text-foreground/30 cursor-not-allowed"
                            )}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <CreditCard size={20} />
                                    Pay {selectedPlan.price}
                                </>
                            )}
                        </button>

                        <p className="text-xs text-foreground/30 text-center mt-4">
                            By proceeding, you agree to our Terms of Service
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
