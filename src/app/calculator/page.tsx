"use client";

import { useState, useEffect } from "react";
import { Calculator, Zap, Package, Droplets, Mountain, IndianRupee, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MaterialEstimate {
    cement: number;
    steel: number;
    sand: number;
    aggregate: number;
    estimatedCost: number;
}

export default function CalculatorPage() {
    const [area, setArea] = useState<string>("");
    const [isPremium, setIsPremium] = useState(false);
    const [estimate, setEstimate] = useState<MaterialEstimate | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    const calculateEstimate = () => {
        const areaNum = parseFloat(area);
        if (isNaN(areaNum) || areaNum <= 0) return;

        setIsCalculating(true);

        // Simulate calculation delay for UX
        setTimeout(() => {
            const cementMultiplier = isPremium ? 0.45 : 0.4;
            const steelMultiplier = isPremium ? 4.5 : 4;
            const costPerSqFt = 1800;

            setEstimate({
                cement: Math.round(areaNum * cementMultiplier),
                steel: Math.round(areaNum * steelMultiplier),
                sand: Math.round(areaNum * 0.816 * 100) / 100,
                aggregate: Math.round(areaNum * 0.608 * 100) / 100,
                estimatedCost: Math.round(areaNum * costPerSqFt),
            });
            setIsCalculating(false);
        }, 800);
    };

    useEffect(() => {
        if (area && parseFloat(area) > 0) {
            calculateEstimate();
        }
    }, [isPremium]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const materials = estimate ? [
        {
            name: "Cement",
            value: estimate.cement,
            unit: "bags",
            icon: Package,
            color: "from-amber-500 to-orange-500",
            desc: "50kg bags required"
        },
        {
            name: "Steel",
            value: estimate.steel,
            unit: "kg",
            icon: Zap,
            color: "from-slate-400 to-slate-600",
            desc: "TMT bars (Fe-500)"
        },
        {
            name: "Sand",
            value: estimate.sand,
            unit: "MT",
            icon: Droplets,
            color: "from-yellow-400 to-amber-500",
            desc: "River sand (M-Sand)"
        },
        {
            name: "Aggregate",
            value: estimate.aggregate,
            unit: "MT",
            icon: Mountain,
            color: "from-stone-400 to-stone-600",
            desc: "20mm crushed stone"
        },
    ] : [];

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6">
                        <Calculator size={16} />
                        Free Estimation Tool
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                        <span className="text-foreground">Construction</span>{" "}
                        <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                            Cost Calculator
                        </span>
                    </h1>
                    <p className="text-lg text-foreground/50 max-w-2xl mx-auto">
                        Get instant material estimates for your construction project.
                        Based on Indian construction standards.
                    </p>
                </div>

                {/* Calculator Card */}
                <div className="bg-card/80 backdrop-blur-xl rounded-[2rem] border border-border p-8 md:p-12 mb-8">
                    {/* Input Section */}
                    <div className="max-w-xl mx-auto mb-10">
                        <label className="block text-sm font-bold text-foreground/70 mb-3">
                            Enter Built-up Area (sq. ft.)
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                placeholder="e.g., 1500"
                                className="w-full px-6 py-5 bg-background border-2 border-border rounded-2xl text-2xl font-bold text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
                            />
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-foreground/40 font-bold">
                                sq. ft.
                            </span>
                        </div>

                        {/* Premium Toggle */}
                        <div className="flex items-center justify-between mt-6 p-4 bg-background rounded-xl border border-border">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                    <Sparkles size={18} className="text-background" />
                                </div>
                                <div>
                                    <div className="font-bold text-foreground">Premium Quality Mode</div>
                                    <div className="text-xs text-foreground/50">Higher grade materials (+12%)</div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsPremium(!isPremium)}
                                className={cn(
                                    "relative w-14 h-8 rounded-full transition-all duration-300",
                                    isPremium ? "bg-primary" : "bg-border"
                                )}
                            >
                                <div className={cn(
                                    "absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300",
                                    isPremium ? "left-7" : "left-1"
                                )} />
                            </button>
                        </div>

                        {/* Calculate Button */}
                        <button
                            onClick={calculateEstimate}
                            disabled={!area || parseFloat(area) <= 0 || isCalculating}
                            className={cn(
                                "w-full mt-6 py-5 rounded-2xl font-black text-lg transition-all duration-300 flex items-center justify-center gap-3",
                                area && parseFloat(area) > 0
                                    ? "bg-gradient-to-r from-primary to-accent text-background shadow-[0_4px_30px_-5px] shadow-primary/40 hover:shadow-primary/60 hover:scale-[1.02]"
                                    : "bg-border text-foreground/30 cursor-not-allowed"
                            )}
                        >
                            {isCalculating ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                                    Calculating...
                                </>
                            ) : (
                                <>
                                    <Calculator size={20} />
                                    Calculate Estimate
                                </>
                            )}
                        </button>
                    </div>

                    {/* Results Section */}
                    {estimate && (
                        <div className="animate-fade-in">
                            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-10" />

                            {/* Material Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                                {materials.map((material, idx) => (
                                    <div
                                        key={material.name}
                                        className="p-5 bg-background rounded-2xl border border-border hover:border-primary/30 transition-all group"
                                        style={{ animationDelay: `${idx * 100}ms` }}
                                    >
                                        <div className={cn(
                                            "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                                            material.color
                                        )}>
                                            <material.icon size={22} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-black text-foreground mb-1">
                                            {material.value.toLocaleString('en-IN')}
                                        </div>
                                        <div className="text-sm font-bold text-foreground/50">
                                            {material.unit} of {material.name}
                                        </div>
                                        <div className="text-xs text-foreground/30 mt-1">
                                            {material.desc}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Total Cost */}
                            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 border border-primary/20 overflow-hidden">
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23fff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

                                <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div>
                                        <div className="text-sm font-bold text-foreground/50 mb-2 flex items-center gap-2">
                                            <IndianRupee size={14} />
                                            Estimated Construction Cost
                                        </div>
                                        <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                            {formatCurrency(estimate.estimatedCost)}
                                        </div>
                                        <div className="text-xs text-foreground/40 mt-2">
                                            *Approximate cost based on ₹1,800/sq.ft. | Actual may vary by location
                                        </div>
                                    </div>

                                    <Link
                                        href="/shop"
                                        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent text-background rounded-full font-black text-lg shadow-[0_4px_30px_-5px] shadow-primary/40 hover:shadow-primary/60 hover:scale-105 transition-all whitespace-nowrap"
                                    >
                                        Get Detailed Plan
                                        <ArrowRight size={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* CTA Section */}
                <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-8 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <CheckCircle2 size={20} className="text-success" />
                        <span className="font-bold text-foreground">Need a professional structural plan?</span>
                    </div>
                    <p className="text-foreground/50 mb-6 max-w-xl mx-auto">
                        Get detailed AutoCAD drawings with Vastu compliance, foundation details,
                        and beam-column layouts starting at just ₹2,999.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/shop"
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-background rounded-full font-bold hover:bg-primary/90 transition-all"
                        >
                            <Sparkles size={18} />
                            Get Structural Plan for ₹2,999
                        </Link>
                        <Link
                            href="/services"
                            className="flex items-center gap-2 px-6 py-3 bg-background border border-border rounded-full font-bold hover:border-primary/50 transition-all"
                        >
                            View All Services
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
