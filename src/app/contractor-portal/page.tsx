"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Package, Clock, CheckCircle2, ArrowRight, User, Phone,
    LogOut, Building2, IndianRupee, Star, Calendar, MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";

// Demo contractor data
const demoContractor = {
    id: "1",
    name: "Rajendra Patil",
    company: "Patil Construction",
    phone: "+91 90679 69756",
    email: "rajendra@patilconstruction.com",
    village: "Mangrulpir",
    district: "Washim",
    referralCode: "VSRP1234",
    earnings: {
        total: 15000,
        pending: 3000,
        paid: 12000,
    },
    projects: [
        {
            id: "1",
            orderId: "VSABC123",
            clientName: "Rajesh Kumar",
            planName: "Standard Plan",
            status: "design_in_progress",
            statusLabel: "In Progress",
            commission: 1000,
            createdAt: new Date("2026-02-11"),
        },
        {
            id: "2",
            orderId: "VSXYZ789",
            clientName: "Priya Sharma",
            planName: "Premium Plan",
            status: "contractor_assigned",
            statusLabel: "Just Assigned",
            commission: 2500,
            createdAt: new Date("2026-02-13"),
        },
        {
            id: "3",
            orderId: "VSLMN456",
            clientName: "Amit Kulkarni",
            planName: "Basic Plan",
            status: "completed",
            statusLabel: "Completed",
            commission: 300,
            createdAt: new Date("2026-01-20"),
        },
    ],
};

const statusColors: Record<string, { color: string; bgColor: string }> = {
    contractor_assigned: { color: "text-warning", bgColor: "bg-warning/10" },
    design_in_progress: { color: "text-secondary", bgColor: "bg-secondary/10" },
    review_pending: { color: "text-accent", bgColor: "bg-accent/10" },
    completed: { color: "text-success", bgColor: "bg-success/10" },
};

export default function ContractorDashboardPage() {
    const router = useRouter();
    const [contractor, setContractor] = useState<typeof demoContractor | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const auth = localStorage.getItem("contractorAuth");
        if (!auth) {
            router.push("/contractor-portal/login");
            return;
        }

        setContractor(demoContractor);
        setIsLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("contractorAuth");
        router.push("/contractor-portal/login");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background pt-24 pb-20 px-6 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!contractor) return null;

    const activeProjects = contractor.projects.filter(p => p.status !== "completed").length;
    const completedProjects = contractor.projects.filter(p => p.status === "completed").length;

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center text-background font-bold text-lg">
                                {contractor.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl font-black text-foreground">
                                    {contractor.name}
                                </h1>
                                <p className="text-foreground/50 text-sm flex items-center gap-2">
                                    <Building2 size={14} />
                                    {contractor.company}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2 bg-card border border-border rounded-xl">
                            <div className="text-xs text-foreground/40">Your Referral Code</div>
                            <div className="font-mono font-bold text-accent">{contractor.referralCode}</div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-foreground/50 hover:text-error hover:border-error/50 transition-all"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-card rounded-2xl border border-border p-5">
                        <Package size={24} className="text-primary mb-2" />
                        <div className="text-2xl font-black text-foreground">{contractor.projects.length}</div>
                        <div className="text-sm text-foreground/50">Total Projects</div>
                    </div>
                    <div className="bg-card rounded-2xl border border-border p-5">
                        <Clock size={24} className="text-warning mb-2" />
                        <div className="text-2xl font-black text-foreground">{activeProjects}</div>
                        <div className="text-sm text-foreground/50">Active</div>
                    </div>
                    <div className="bg-card rounded-2xl border border-border p-5">
                        <IndianRupee size={24} className="text-success mb-2" />
                        <div className="text-2xl font-black text-foreground">₹{contractor.earnings.total.toLocaleString()}</div>
                        <div className="text-sm text-foreground/50">Total Earnings</div>
                    </div>
                    <div className="bg-card rounded-2xl border border-border p-5">
                        <IndianRupee size={24} className="text-accent mb-2" />
                        <div className="text-2xl font-black text-foreground">₹{contractor.earnings.pending.toLocaleString()}</div>
                        <div className="text-sm text-foreground/50">Pending Payout</div>
                    </div>
                </div>

                {/* Earnings Card */}
                <div className="bg-gradient-to-br from-accent/10 via-card to-primary/10 rounded-2xl border border-accent/20 p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-black text-foreground mb-1">Earnings Summary</h3>
                            <p className="text-foreground/50 text-sm">Your commission earnings</p>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-foreground/50">Paid Out</div>
                            <div className="text-xl font-black text-success">₹{contractor.earnings.paid.toLocaleString()}</div>
                        </div>
                    </div>
                </div>

                {/* Assigned Projects */}
                <div className="mb-8">
                    <h2 className="text-xl font-black text-foreground mb-4">Assigned Projects</h2>
                    <div className="space-y-4">
                        {contractor.projects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6 hover:border-accent/30 transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="font-mono font-bold text-foreground">
                                                #{project.orderId}
                                            </span>
                                            <span className={cn(
                                                "px-3 py-1 rounded-full text-xs font-bold",
                                                statusColors[project.status]?.color || "text-primary",
                                                statusColors[project.status]?.bgColor || "bg-primary/10"
                                            )}>
                                                {project.statusLabel}
                                            </span>
                                        </div>
                                        <div className="text-foreground/50 text-sm flex items-center gap-2">
                                            <User size={14} />
                                            Client: {project.clientName}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-accent font-bold">+₹{project.commission}</div>
                                        <div className="text-xs text-foreground/40">Commission</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-border">
                                    <div className="flex items-center gap-4 text-sm text-foreground/50">
                                        <span>{project.planName}</span>
                                        <span className="flex items-center gap-1">
                                            <Calendar size={12} />
                                            {project.createdAt.toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "short",
                                            })}
                                        </span>
                                    </div>
                                    {project.status !== "completed" && (
                                        <Link
                                            href={`/contractor-portal/projects/${project.orderId}`}
                                            className="flex items-center gap-1 text-accent font-bold text-sm hover:gap-2 transition-all"
                                        >
                                            Update Progress
                                            <ArrowRight size={14} />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Profile Info */}
                <div className="bg-card rounded-2xl border border-border p-6">
                    <h3 className="font-black text-foreground mb-4">Your Profile</h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-3">
                            <Phone size={16} className="text-foreground/40" />
                            <span className="text-foreground">{contractor.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin size={16} className="text-foreground/40" />
                            <span className="text-foreground">{contractor.village}, {contractor.district}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Star size={16} className="text-warning" />
                            <span className="text-foreground">Verified Partner</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
