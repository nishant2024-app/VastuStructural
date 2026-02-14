"use client";

import { useState } from "react";
import { User, Phone, Mail, MapPin, Briefcase, Upload, CheckCircle2, ArrowLeft, Loader2, Building2, FileText } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Maharashtra districts for dropdown
const districts = [
    "Akola", "Amravati", "Bhandara", "Buldhana", "Chandrapur", "Gadchiroli",
    "Gondia", "Nagpur", "Wardha", "Washim", "Yavatmal", "Aurangabad", "Beed",
    "Hingoli", "Jalna", "Latur", "Nanded", "Osmanabad", "Parbhani",
    "Ahmednagar", "Dhule", "Jalgaon", "Kolhapur", "Mumbai City", "Mumbai Suburban",
    "Nashik", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg",
    "Solapur", "Thane",
];

const specializations = [
    "Residential Construction",
    "Commercial Construction",
    "Interior Design",
    "Electrical Work",
    "Plumbing",
    "Civil Engineering",
    "Architecture",
    "Vastu Consultancy",
    "Project Management",
];

export default function PartnerApplyPage() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        // Personal Details
        name: "",
        phone: "",
        email: "",
        // Location
        village: "",
        taluka: "",
        district: "",
        // Business Details
        companyName: "",
        experienceYears: "",
        specialization: [] as string[],
        aboutWork: "",
        // Documents (for demo, storing names)
        aadhaarFile: null as File | null,
        panFile: null as File | null,
        workPhotos: [] as File[],
        // Terms
        termsAccepted: false,
    });

    const updateField = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const toggleSpecialization = (spec: string) => {
        setFormData((prev) => ({
            ...prev,
            specialization: prev.specialization.includes(spec)
                ? prev.specialization.filter((s) => s !== spec)
                : [...prev.specialization, spec],
        }));
    };

    const handleSubmit = async () => {
        if (!formData.termsAccepted) {
            alert("Please accept the terms and conditions");
            return;
        }

        setIsSubmitting(true);

        try {
            // TODO: Submit to API
            const response = await fetch("/api/partners/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    village: formData.village,
                    taluka: formData.taluka,
                    district: formData.district,
                    companyName: formData.companyName,
                    experienceYears: formData.experienceYears,
                    specialization: formData.specialization,
                    aboutWork: formData.aboutWork,
                }),
            });

            // Simulate success for now
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setIsSuccess(true);
        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to submit application. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const isStep1Valid = formData.name && formData.phone && formData.phone.length >= 10;
    const isStep2Valid = formData.village && formData.taluka && formData.district;
    const isStep3Valid = formData.experienceYears && formData.specialization.length > 0;

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-background pt-24 pb-20 px-6 flex items-center justify-center">
                <div className="max-w-md w-full text-center">
                    <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} className="text-success" />
                    </div>
                    <h1 className="text-3xl font-black text-foreground mb-4">
                        Application Submitted!
                    </h1>
                    <p className="text-foreground/60 mb-8">
                        Thank you for applying to become a VastuStructural partner.
                        Our team will review your application and contact you within 24-48 hours.
                    </p>
                    <div className="p-4 bg-card rounded-xl border border-border mb-6">
                        <div className="text-sm text-foreground/50 mb-1">Your Application ID</div>
                        <div className="font-mono font-bold text-foreground">
                            VSP{Date.now().toString(36).toUpperCase()}
                        </div>
                    </div>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background rounded-full font-bold"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-2xl mx-auto relative z-10">
                {/* Header */}
                <Link
                    href="/partners"
                    className="inline-flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors mb-6"
                >
                    <ArrowLeft size={16} />
                    Back to Partners
                </Link>

                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                        <span className="text-foreground">Partner</span>{" "}
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Application
                        </span>
                    </h1>
                    <p className="text-foreground/50">
                        Fill out the form below to apply as a VastuStructural partner.
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-2 mb-10">
                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className="flex items-center">
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all",
                                    step >= s
                                        ? "bg-primary text-background"
                                        : "bg-card border border-border text-foreground/30"
                                )}
                            >
                                {step > s ? <CheckCircle2 size={18} /> : s}
                            </div>
                            {s < 4 && (
                                <div
                                    className={cn(
                                        "w-12 h-1 mx-1 rounded-full transition-all",
                                        step > s ? "bg-primary" : "bg-border"
                                    )}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Form Card */}
                <div className="bg-card/60 backdrop-blur-xl rounded-3xl border border-border p-8">
                    {/* Step 1: Personal Details */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-black text-foreground flex items-center gap-3 mb-6">
                                <User size={24} className="text-primary" />
                                Personal Details
                            </h2>

                            <div>
                                <label className="block text-sm font-bold text-foreground/70 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => updateField("name", e.target.value)}
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
                                    onChange={(e) => updateField("phone", e.target.value)}
                                    placeholder="10-digit mobile number"
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
                                    onChange={(e) => updateField("email", e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Location */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-black text-foreground flex items-center gap-3 mb-6">
                                <MapPin size={24} className="text-primary" />
                                Your Location
                            </h2>

                            <div>
                                <label className="block text-sm font-bold text-foreground/70 mb-2">
                                    Village/City *
                                </label>
                                <input
                                    type="text"
                                    value={formData.village}
                                    onChange={(e) => updateField("village", e.target.value)}
                                    placeholder="Enter your village or city name"
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-foreground/70 mb-2">
                                    Taluka *
                                </label>
                                <input
                                    type="text"
                                    value={formData.taluka}
                                    onChange={(e) => updateField("taluka", e.target.value)}
                                    placeholder="Enter your taluka"
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-foreground/70 mb-2">
                                    District *
                                </label>
                                <select
                                    value={formData.district}
                                    onChange={(e) => updateField("district", e.target.value)}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors"
                                >
                                    <option value="">Select district</option>
                                    {districts.map((d) => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Business Details */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-black text-foreground flex items-center gap-3 mb-6">
                                <Briefcase size={24} className="text-primary" />
                                Business Details
                            </h2>

                            <div>
                                <label className="block text-sm font-bold text-foreground/70 mb-2">
                                    Company/Firm Name (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={formData.companyName}
                                    onChange={(e) => updateField("companyName", e.target.value)}
                                    placeholder="Enter your company or firm name"
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-foreground/70 mb-2">
                                    Years of Experience *
                                </label>
                                <select
                                    value={formData.experienceYears}
                                    onChange={(e) => updateField("experienceYears", e.target.value)}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors"
                                >
                                    <option value="">Select experience</option>
                                    <option value="0-1">Less than 1 year</option>
                                    <option value="1-3">1-3 years</option>
                                    <option value="3-5">3-5 years</option>
                                    <option value="5-10">5-10 years</option>
                                    <option value="10+">10+ years</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-foreground/70 mb-3">
                                    Specialization * <span className="text-foreground/40">(Select all that apply)</span>
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {specializations.map((spec) => (
                                        <button
                                            key={spec}
                                            type="button"
                                            onClick={() => toggleSpecialization(spec)}
                                            className={cn(
                                                "p-3 text-sm rounded-xl border transition-all text-left",
                                                formData.specialization.includes(spec)
                                                    ? "bg-primary/10 border-primary text-primary"
                                                    : "bg-background border-border text-foreground/60 hover:border-primary/50"
                                            )}
                                        >
                                            {spec}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-foreground/70 mb-2">
                                    About Your Work (Optional)
                                </label>
                                <textarea
                                    value={formData.aboutWork}
                                    onChange={(e) => updateField("aboutWork", e.target.value)}
                                    placeholder="Tell us about your recent projects or expertise..."
                                    rows={3}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors resize-none"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 4: Review & Submit */}
                    {step === 4 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-black text-foreground flex items-center gap-3 mb-6">
                                <FileText size={24} className="text-primary" />
                                Review & Submit
                            </h2>

                            {/* Summary */}
                            <div className="space-y-4">
                                <div className="p-4 bg-background rounded-xl border border-border">
                                    <div className="text-xs text-foreground/40 mb-1">Personal Details</div>
                                    <div className="font-bold text-foreground">{formData.name}</div>
                                    <div className="text-sm text-foreground/60">{formData.phone}</div>
                                    {formData.email && <div className="text-sm text-foreground/60">{formData.email}</div>}
                                </div>

                                <div className="p-4 bg-background rounded-xl border border-border">
                                    <div className="text-xs text-foreground/40 mb-1">Location</div>
                                    <div className="font-bold text-foreground">
                                        {formData.village}, {formData.taluka}
                                    </div>
                                    <div className="text-sm text-foreground/60">{formData.district}, Maharashtra</div>
                                </div>

                                <div className="p-4 bg-background rounded-xl border border-border">
                                    <div className="text-xs text-foreground/40 mb-1">Business Details</div>
                                    {formData.companyName && (
                                        <div className="font-bold text-foreground">{formData.companyName}</div>
                                    )}
                                    <div className="text-sm text-foreground/60">
                                        {formData.experienceYears} years experience
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.specialization.map((spec) => (
                                            <span
                                                key={spec}
                                                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                                            >
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Terms */}
                            <label className="flex items-start gap-3 p-4 bg-background rounded-xl border border-border cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.termsAccepted}
                                    onChange={(e) => updateField("termsAccepted", e.target.checked)}
                                    className="w-5 h-5 mt-0.5 accent-primary"
                                />
                                <span className="text-sm text-foreground/60">
                                    I agree to VastuStructural&apos;s{" "}
                                    <Link href="/terms" className="text-primary hover:underline">
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link href="/privacy" className="text-primary hover:underline">
                                        Privacy Policy
                                    </Link>
                                    . I understand that my application will be reviewed and I will be contacted within 24-48 hours.
                                </span>
                            </label>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 mt-8">
                        {step > 1 && (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="flex-1 py-4 bg-background border border-border rounded-xl font-bold text-foreground hover:border-primary/50 transition-all"
                            >
                                Back
                            </button>
                        )}
                        {step < 4 ? (
                            <button
                                onClick={() => setStep(step + 1)}
                                disabled={
                                    (step === 1 && !isStep1Valid) ||
                                    (step === 2 && !isStep2Valid) ||
                                    (step === 3 && !isStep3Valid)
                                }
                                className={cn(
                                    "flex-1 py-4 rounded-xl font-bold transition-all",
                                    ((step === 1 && isStep1Valid) ||
                                        (step === 2 && isStep2Valid) ||
                                        (step === 3 && isStep3Valid))
                                        ? "bg-primary text-background"
                                        : "bg-border text-foreground/30 cursor-not-allowed"
                                )}
                            >
                                Continue
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || !formData.termsAccepted}
                                className={cn(
                                    "flex-1 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2",
                                    formData.termsAccepted
                                        ? "bg-gradient-to-r from-primary to-accent text-background"
                                        : "bg-border text-foreground/30 cursor-not-allowed"
                                )}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 size={20} />
                                        Submit Application
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
