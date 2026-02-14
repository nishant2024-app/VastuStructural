"use client";

import { useState } from "react";
import { Search, Package, Phone, ArrowRight, Shield, Clock, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function PortalPage() {
    const router = useRouter();
    const [searchType, setSearchType] = useState<"order" | "phone">("order");
    const [searchValue, setSearchValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchValue.trim()) {
            setError("Please enter your Order ID or Phone Number");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            // For demo, navigate to a sample order page
            // In production, this would verify the order exists first
            if (searchType === "order") {
                router.push(`/portal/${searchValue.trim().toUpperCase()}`);
            } else {
                // Phone search would return list of orders
                router.push(`/portal/phone/${searchValue.trim()}`);
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-2xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6">
                        <Package size={16} />
                        Customer Portal
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                        <span className="text-foreground">Track Your</span>{" "}
                        <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                            Project
                        </span>
                    </h1>
                    <p className="text-lg text-foreground/50 max-w-lg mx-auto">
                        Enter your Order ID or registered phone number to view your project status and updates.
                    </p>
                </div>

                {/* Search Card */}
                <div className="bg-card/60 backdrop-blur-xl rounded-3xl border border-border p-8 mb-8">
                    {/* Toggle */}
                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={() => setSearchType("order")}
                            className={cn(
                                "flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2",
                                searchType === "order"
                                    ? "bg-primary text-background"
                                    : "bg-background border border-border text-foreground/50 hover:border-primary/50"
                            )}
                        >
                            <FileText size={16} />
                            Order ID
                        </button>
                        <button
                            onClick={() => setSearchType("phone")}
                            className={cn(
                                "flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2",
                                searchType === "phone"
                                    ? "bg-primary text-background"
                                    : "bg-background border border-border text-foreground/50 hover:border-primary/50"
                            )}
                        >
                            <Phone size={16} />
                            Phone Number
                        </button>
                    </div>

                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="relative">
                            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
                            <input
                                type={searchType === "phone" ? "tel" : "text"}
                                value={searchValue}
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                    setError("");
                                }}
                                placeholder={
                                    searchType === "order"
                                        ? "Enter Order ID (e.g., VSABC123)"
                                        : "Enter 10-digit phone number"
                                }
                                className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-xl text-foreground text-lg placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
                            />
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
                                "Searching..."
                            ) : (
                                <>
                                    <Search size={20} />
                                    Track Project
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Help Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {[
                        { icon: FileText, title: "Order ID", desc: "Check your payment confirmation email" },
                        { icon: Phone, title: "Phone", desc: "Use your registered phone number" },
                        { icon: Shield, title: "Secure", desc: "Your data is 100% protected" },
                    ].map((item, idx) => (
                        <div key={idx} className="p-4 bg-card/40 rounded-xl border border-border text-center">
                            <item.icon size={24} className="text-primary mx-auto mb-2" />
                            <div className="font-bold text-foreground text-sm">{item.title}</div>
                            <div className="text-xs text-foreground/40">{item.desc}</div>
                        </div>
                    ))}
                </div>

                {/* Demo Link */}
                <div className="text-center p-6 bg-primary/5 rounded-xl border border-primary/20">
                    <p className="text-foreground/50 text-sm mb-3">
                        Want to see how project tracking works?
                    </p>
                    <Link
                        href="/portal/VSDEMO123"
                        className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
                    >
                        View Demo Project
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Contact CTA */}
                <div className="mt-8 text-center">
                    <p className="text-foreground/40 text-sm mb-3">
                        Can&apos;t find your project? Need help?
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-card border border-border rounded-full font-bold text-sm hover:border-primary/50 transition-all"
                    >
                        <Phone size={16} className="text-primary" />
                        Contact Support: +91 9067969756
                    </Link>
                </div>
            </div>
        </div>
    );
}
