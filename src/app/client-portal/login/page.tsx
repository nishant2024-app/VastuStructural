"use client";

import { useState } from "react";
import { Phone, ArrowRight, Shield, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ClientLoginPage() {
    const router = useRouter();
    const [step, setStep] = useState<"phone" | "otp">("phone");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (phone.length < 10) {
            setError("Please enter a valid 10-digit phone number");
            return;
        }

        setIsLoading(true);
        setError("");

        // Simulate OTP sending
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // For demo, any phone number works
        setStep("otp");
        setIsLoading(false);
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join("");
        if (otpValue.length < 6) {
            setError("Please enter the complete 6-digit OTP");
            return;
        }

        setIsLoading(true);
        setError("");

        // Simulate OTP verification
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // For demo, OTP "123456" works, others show error
        if (otpValue === "123456") {
            // Store session (demo)
            localStorage.setItem("clientAuth", JSON.stringify({ phone, loggedIn: true }));
            router.push("/client-portal");
        } else {
            setError("Invalid OTP. For demo, use 123456");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6 flex items-center justify-center">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                        <Lock size={32} className="text-background" />
                    </div>
                    <h1 className="text-3xl font-black text-foreground mb-2">
                        Client Portal
                    </h1>
                    <p className="text-foreground/50">
                        {step === "phone"
                            ? "Login with your registered phone number"
                            : "Enter the OTP sent to your phone"}
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-card/60 backdrop-blur-xl rounded-3xl border border-border p-8">
                    {step === "phone" ? (
                        <form onSubmit={handlePhoneSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-foreground/70 mb-2">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50">+91</span>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => {
                                            setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                                            setError("");
                                        }}
                                        placeholder="Enter your phone number"
                                        className="w-full pl-14 pr-4 py-4 bg-background border border-border rounded-xl text-foreground text-lg placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>

                            {error && (
                                <p className="text-error text-sm">{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-gradient-to-r from-primary to-accent text-background rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-[0_4px_30px_-5px] hover:shadow-primary/40 transition-all disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <Loader2 size={20} className="animate-spin" />
                                ) : (
                                    <>
                                        Send OTP
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleOtpSubmit} className="space-y-6">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <label className="text-sm font-bold text-foreground/70">
                                        Enter OTP
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setStep("phone")}
                                        className="text-primary text-sm hover:underline"
                                    >
                                        Change Number
                                    </button>
                                </div>
                                <div className="flex gap-2 justify-center">
                                    {otp.map((digit, idx) => (
                                        <input
                                            key={idx}
                                            id={`otp-${idx}`}
                                            type="text"
                                            inputMode="numeric"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Backspace" && !digit && idx > 0) {
                                                    const prevInput = document.getElementById(`otp-${idx - 1}`);
                                                    prevInput?.focus();
                                                }
                                            }}
                                            className="w-12 h-14 text-center text-xl font-bold bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors"
                                            maxLength={1}
                                        />
                                    ))}
                                </div>
                                <p className="text-center text-foreground/40 text-sm mt-3">
                                    OTP sent to +91 {phone}
                                </p>
                            </div>

                            {error && (
                                <p className="text-error text-sm text-center">{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-gradient-to-r from-primary to-accent text-background rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-[0_4px_30px_-5px] hover:shadow-primary/40 transition-all disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <Loader2 size={20} className="animate-spin" />
                                ) : (
                                    <>
                                        Verify & Login
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                className="w-full text-primary text-sm hover:underline"
                            >
                                Resend OTP
                            </button>
                        </form>
                    )}
                </div>

                {/* Help Text */}
                <div className="mt-6 text-center">
                    <div className="flex items-center justify-center gap-2 text-foreground/40 text-sm mb-4">
                        <Shield size={14} />
                        Your data is 100% secure
                    </div>
                    <p className="text-foreground/40 text-sm">
                        Only customers who have purchased a plan can login.
                    </p>
                    <Link
                        href="/shop"
                        className="text-primary text-sm font-bold hover:underline mt-2 inline-block"
                    >
                        Don't have an account? Buy a plan →
                    </Link>
                </div>

                {/* Demo Info */}
                <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                    <p className="text-sm text-foreground/60 text-center">
                        <strong>Demo:</strong> Enter any phone number, then use OTP <strong>123456</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}
