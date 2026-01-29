"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Sparkles, Loader2, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (data.success) {
                router.push("/admin/dashboard");
                router.refresh();
            } else {
                setError(data.error || "Invalid credentials");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent_70%)] pointer-events-none" />
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-md w-full relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-bold mb-4">
                        <Sparkles size={12} />
                        Admin Access Only
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-foreground mb-2">
                        Vastu<span className="text-primary">Admin</span>
                    </h1>
                    <p className="text-foreground/50">Manage your leads and platform settings</p>
                </div>

                <div className="bg-card p-8 rounded-[2rem] border border-border shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <form onSubmit={handleLogin} className="space-y-6 relative">
                        <div>
                            <label className="text-sm font-bold text-foreground/70 mb-2 block">Username</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={18} />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter username"
                                    required
                                    className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors font-medium"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-bold text-foreground/70 mb-2 block">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs font-bold text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-background rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    Enter Dashboard
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-center text-xs text-foreground/30 font-medium tracking-wide uppercase">
                    &copy; 2024 VastuStructural AI Platform
                </p>
            </div>
        </div>
    );
}
