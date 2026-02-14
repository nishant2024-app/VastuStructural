"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowRight, ArrowLeft, Check, MapPin, Ruler, Compass,
    Building2, FileText, Loader2, Sparkles, Package, Phone,
    CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { plans, formatPrice } from "@/lib/types";

const directions = [
    "East Facing",
    "West Facing",
    "North Facing",
    "South Facing",
    "North-East Facing",
    "North-West Facing",
    "South-East Facing",
    "South-West Facing",
];

function PlotDetailsForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get("orderId");
    const planId = searchParams.get("plan") || "standard";

    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        // Step 1: Plot Info
        plotSize: "",
        plotLength: "",
        plotWidth: "",
        direction: "",

        // Step 2: Building Requirements
        floors: "1",
        bedrooms: "2",
        requirements: "",

        // Step 3: Contact Preferences
        preferredContactTime: "morning",
        additionalNotes: "",
    });

    const plan = plans.find(p => p.id === planId) || plans[1];

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // In real app, save to database
        console.log("Plot details submitted:", { orderId, ...formData });

        setIsSuccess(true);
        setIsSubmitting(false);
    };

    const canProceedStep1 = formData.plotLength && formData.plotWidth && formData.direction;
    const canProceedStep2 = formData.floors && formData.bedrooms;

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-background pt-24 pb-20 px-6 flex items-center justify-center">
                <div className="max-w-md mx-auto text-center">
                    <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={48} className="text-success" />
                    </div>
                    <h1 className="text-3xl font-black text-foreground mb-4">
                        Details Submitted!
                    </h1>
                    <p className="text-foreground/60 mb-8">
                        Thank you! Your plot details have been received. Our team will start
                        working on your structural plan and you'll receive it within 48 hours.
                    </p>
                    <div className="bg-card/60 rounded-2xl border border-border p-6 mb-6">
                        <div className="text-sm text-foreground/50 mb-1">Your Order ID</div>
                        <div className="text-2xl font-mono font-black text-primary">{orderId || "VSXXXXXX"}</div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Link
                            href="/client-portal/login"
                            className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-background rounded-xl font-bold flex items-center justify-center gap-2"
                        >
                            <Package size={20} />
                            Track Your Project
                        </Link>
                        <Link
                            href="/"
                            className="w-full py-4 bg-card border border-border text-foreground rounded-xl font-bold flex items-center justify-center gap-2"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-2xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/20 rounded-full text-success font-bold text-sm mb-4">
                        <Check size={16} />
                        Payment Successful
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2">
                        Tell Us About Your Plot
                    </h1>
                    <p className="text-foreground/60">
                        Complete these details so we can create your perfect structural plan
                    </p>
                </div>

                {/* Plan Summary */}
                <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-4 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center",
                                plan.gradient
                            )}>
                                <Sparkles size={20} className="text-background" />
                            </div>
                            <div>
                                <div className="font-bold text-foreground">{plan.name}</div>
                                <div className="text-sm text-foreground/50">{orderId || "Order Processing"}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xl font-black text-foreground">{formatPrice(plan.price)}</div>
                            <div className="text-xs text-foreground/40">{plan.delivery} Delivery</div>
                        </div>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center">
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all",
                                step >= s
                                    ? "bg-primary text-background"
                                    : "bg-card border border-border text-foreground/40"
                            )}>
                                {step > s ? <Check size={18} /> : s}
                            </div>
                            {s < 3 && (
                                <div className={cn(
                                    "w-12 h-1 mx-2 rounded-full transition-all",
                                    step > s ? "bg-primary" : "bg-border"
                                )} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Form Card */}
                <div className="bg-card/60 backdrop-blur-xl rounded-3xl border border-border p-6 md:p-8">
                    {/* Step 1: Plot Information */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                    <MapPin size={24} className="text-primary" />
                                </div>
                                <h2 className="text-xl font-black text-foreground">Plot Information</h2>
                                <p className="text-sm text-foreground/50">Enter your plot dimensions</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-foreground/70 mb-2">
                                        Plot Length (ft)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.plotLength}
                                        onChange={(e) => handleInputChange("plotLength", e.target.value)}
                                        placeholder="e.g., 40"
                                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-foreground/70 mb-2">
                                        Plot Width (ft)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.plotWidth}
                                        onChange={(e) => handleInputChange("plotWidth", e.target.value)}
                                        placeholder="e.g., 30"
                                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-foreground/70 mb-2">
                                    <div className="flex items-center gap-2">
                                        <Compass size={14} className="text-primary" />
                                        Plot Direction (Road Facing)
                                    </div>
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {directions.map((dir) => (
                                        <button
                                            key={dir}
                                            onClick={() => handleInputChange("direction", dir)}
                                            className={cn(
                                                "py-3 px-4 rounded-xl text-sm font-bold transition-all",
                                                formData.direction === dir
                                                    ? "bg-primary text-background"
                                                    : "bg-background border border-border text-foreground/70 hover:border-primary"
                                            )}
                                        >
                                            {dir}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => setStep(2)}
                                disabled={!canProceedStep1}
                                className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-background rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Continue
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    )}

                    {/* Step 2: Building Requirements */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                    <Building2 size={24} className="text-primary" />
                                </div>
                                <h2 className="text-xl font-black text-foreground">Building Requirements</h2>
                                <p className="text-sm text-foreground/50">Tell us about your dream home</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-foreground/70 mb-2">
                                        Number of Floors
                                    </label>
                                    <select
                                        value={formData.floors}
                                        onChange={(e) => handleInputChange("floors", e.target.value)}
                                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary"
                                    >
                                        {[1, 2, 3, 4, 5].map(n => (
                                            <option key={n} value={n}>{n} {n === 1 ? "Floor" : "Floors"}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-foreground/70 mb-2">
                                        Bedrooms (per floor)
                                    </label>
                                    <select
                                        value={formData.bedrooms}
                                        onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary"
                                    >
                                        {[1, 2, 3, 4, 5].map(n => (
                                            <option key={n} value={n}>{n} BHK</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-foreground/70 mb-2">
                                    Special Requirements (Optional)
                                </label>
                                <textarea
                                    value={formData.requirements}
                                    onChange={(e) => handleInputChange("requirements", e.target.value)}
                                    placeholder="e.g., Separate pooja room, parking for 2 cars, staircase at back..."
                                    rows={4}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary resize-none"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep(1)}
                                    className="px-6 py-4 bg-card border border-border text-foreground rounded-xl font-bold flex items-center gap-2"
                                >
                                    <ArrowLeft size={18} />
                                    Back
                                </button>
                                <button
                                    onClick={() => setStep(3)}
                                    disabled={!canProceedStep2}
                                    className="flex-1 py-4 bg-gradient-to-r from-primary to-secondary text-background rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    Continue
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Review & Submit */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                    <FileText size={24} className="text-primary" />
                                </div>
                                <h2 className="text-xl font-black text-foreground">Review & Submit</h2>
                                <p className="text-sm text-foreground/50">Confirm your details</p>
                            </div>

                            {/* Summary */}
                            <div className="space-y-4">
                                <div className="bg-background rounded-xl p-4">
                                    <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                                        <MapPin size={16} className="text-primary" />
                                        Plot Details
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div className="text-foreground/50">Dimensions</div>
                                        <div className="text-foreground font-bold">{formData.plotLength} x {formData.plotWidth} ft</div>
                                        <div className="text-foreground/50">Total Area</div>
                                        <div className="text-foreground font-bold">{Number(formData.plotLength) * Number(formData.plotWidth)} sq. ft.</div>
                                        <div className="text-foreground/50">Direction</div>
                                        <div className="text-foreground font-bold">{formData.direction}</div>
                                    </div>
                                </div>

                                <div className="bg-background rounded-xl p-4">
                                    <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                                        <Building2 size={16} className="text-primary" />
                                        Building Details
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div className="text-foreground/50">Floors</div>
                                        <div className="text-foreground font-bold">{formData.floors}</div>
                                        <div className="text-foreground/50">Bedrooms</div>
                                        <div className="text-foreground font-bold">{formData.bedrooms} BHK</div>
                                    </div>
                                    {formData.requirements && (
                                        <div className="mt-3 pt-3 border-t border-border">
                                            <div className="text-foreground/50 text-sm mb-1">Requirements</div>
                                            <div className="text-foreground text-sm">{formData.requirements}</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-foreground/70 mb-2">
                                    Preferred Contact Time
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { value: "morning", label: "Morning" },
                                        { value: "afternoon", label: "Afternoon" },
                                        { value: "evening", label: "Evening" },
                                    ].map((time) => (
                                        <button
                                            key={time.value}
                                            onClick={() => handleInputChange("preferredContactTime", time.value)}
                                            className={cn(
                                                "py-3 rounded-xl font-bold text-sm transition-all",
                                                formData.preferredContactTime === time.value
                                                    ? "bg-primary text-background"
                                                    : "bg-background border border-border text-foreground/70"
                                            )}
                                        >
                                            {time.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep(2)}
                                    className="px-6 py-4 bg-card border border-border text-foreground rounded-xl font-bold flex items-center gap-2"
                                >
                                    <ArrowLeft size={18} />
                                    Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="flex-1 py-4 bg-gradient-to-r from-primary to-secondary text-background rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Submit Details
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Help Text */}
                <div className="mt-6 text-center">
                    <p className="text-foreground/40 text-sm">
                        Need help? Call us at{" "}
                        <a href="tel:+919067969756" className="text-primary font-bold">
                            +91 9067969756
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function PlotDetailsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <PlotDetailsForm />
        </Suspense>
    );
}
