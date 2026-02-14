"use client";

import { useState } from "react";
import { Mail, Lock, ArrowRight, Shield, Loader2, Hexagon } from "lucide-react";
import { useRouter } from "next/navigation";
import { AUTH_KEYS, PORTAL_ROUTES, User } from "@/lib/types";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please enter email and password");
            return;
        }

        setIsLoading(true);
        setError("");

        // Simulate login
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Demo credentials
        if (email === "admin@vastu.com" && password === "admin123") {
            const adminUser: User = {
                id: "admin_1",
                name: "Administrator",
                email: email,
                role: "admin"
            };
            localStorage.setItem(AUTH_KEYS.ADMIN, JSON.stringify(adminUser));
            router.push(PORTAL_ROUTES.ADMIN_DASHBOARD);
        } else {
            setError("Invalid credentials. Use admin@vastu.com / admin123");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                        <Hexagon size={32} className="text-background" />
                    </div>
                    <h1 className="text-3xl font-black text-foreground mb-2">
                        Admin Panel
                    </h1>
                    <p className="text-foreground/50">
                        VastuStructural Administration
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-card/60 backdrop-blur-xl rounded-3xl border border-border p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-foreground/70 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError("");
                                    }}
                                    placeholder="admin@vastu.com"
                                    className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-foreground/70 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError("");
                                    }}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
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
                                    Login
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Security Note */}
                <div className="mt-6 flex items-center justify-center gap-2 text-foreground/40 text-sm">
                    <Shield size={14} />
                    Secure admin access
                </div>

                {/* Demo Info */}
                <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                    <p className="text-sm text-foreground/60 text-center">
                        <strong>Demo:</strong> admin@vastu.com / admin123
                    </p>
                </div>
            </div>
        </div>
    );
}
