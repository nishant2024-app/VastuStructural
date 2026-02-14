"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Package, Clock, CheckCircle2, ArrowRight, User, Phone,
    LogOut, FileText, Calendar, IndianRupee, Building2
} from "lucide-react";
import { cn } from "@/lib/utils";

// Demo client data
const demoClient = {
    id: "1",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh@example.com",
    projects: [
        {
            id: "1",
            orderId: "VSABC123",
            planName: "Standard Plan",
            amount: 9999,
            status: "design_in_progress",
            statusLabel: "In Progress",
            contractor: "Rajendra Patil",
            createdAt: new Date("2026-02-10"),
        },
        {
            id: "2",
            orderId: "VSLMN456",
            planName: "Basic Plan",
            amount: 2999,
            status: "completed",
            statusLabel: "Completed",
            contractor: "Suresh Deshmukh",
            createdAt: new Date("2026-01-15"),
        },
    ],
};

const statusColors: Record<string, { color: string; bgColor: string }> = {
    order_placed: { color: "text-primary", bgColor: "bg-primary/10" },
    details_submitted: { color: "text-primary", bgColor: "bg-primary/10" },
    in_review: { color: "text-warning", bgColor: "bg-warning/10" },
    contractor_assigned: { color: "text-accent", bgColor: "bg-accent/10" },
    design_in_progress: { color: "text-secondary", bgColor: "bg-secondary/10" },
    review_pending: { color: "text-warning", bgColor: "bg-warning/10" },
    completed: { color: "text-success", bgColor: "bg-success/10" },
};

export default function ClientDashboardPage() {
    const router = useRouter();
    const [client, setClient] = useState<typeof demoClient | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check auth
        const auth = localStorage.getItem("clientAuth");
        if (!auth) {
            router.push("/client-portal/login");
            return;
        }

        // Load client data (demo)
        setClient(demoClient);
        setIsLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("clientAuth");
        router.push("/client-portal/login");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background pt-24 pb-20 px-6 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!client) return null;

    const activeProjects = client.projects.filter(p => p.status !== "completed").length;
    const completedProjects = client.projects.filter(p => p.status === "completed").length;

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-foreground mb-1">
                            Welcome, {client.name.split(" ")[0]}! 👋
                        </h1>
                        <p className="text-foreground/50 flex items-center gap-2">
                            <Phone size={14} />
                            {client.phone}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-foreground/50 hover:text-error hover:border-error/50 transition-all"
                    >
                        <LogOut size={18} />
                        <span className="hidden md:inline">Logout</span>
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-card rounded-2xl border border-border p-5 text-center">
                        <Package size={24} className="text-primary mx-auto mb-2" />
                        <div className="text-2xl font-black text-foreground">{client.projects.length}</div>
                        <div className="text-sm text-foreground/50">Total Projects</div>
                    </div>
                    <div className="bg-card rounded-2xl border border-border p-5 text-center">
                        <Clock size={24} className="text-secondary mx-auto mb-2" />
                        <div className="text-2xl font-black text-foreground">{activeProjects}</div>
                        <div className="text-sm text-foreground/50">In Progress</div>
                    </div>
                    <div className="bg-card rounded-2xl border border-border p-5 text-center">
                        <CheckCircle2 size={24} className="text-success mx-auto mb-2" />
                        <div className="text-2xl font-black text-foreground">{completedProjects}</div>
                        <div className="text-sm text-foreground/50">Completed</div>
                    </div>
                </div>

                {/* Projects */}
                <div className="mb-8">
                    <h2 className="text-xl font-black text-foreground mb-4">Your Projects</h2>
                    <div className="space-y-4">
                        {client.projects.map((project) => (
                            <Link
                                key={project.id}
                                href={`/client-portal/projects/${project.orderId}`}
                                className="block bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6 hover:border-primary/30 transition-all group"
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
                                        <div className="text-foreground/50 text-sm">{project.planName}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-primary font-bold">₹{project.amount.toLocaleString()}</div>
                                        <div className="text-xs text-foreground/40">
                                            {project.createdAt.toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    {project.contractor ? (
                                        <div className="flex items-center gap-2 text-sm text-foreground/60">
                                            <Building2 size={14} />
                                            Contractor: <span className="text-foreground">{project.contractor}</span>
                                        </div>
                                    ) : (
                                        <div className="text-sm text-warning">Contractor assignment pending</div>
                                    )}
                                    <div className="flex items-center gap-1 text-primary font-bold text-sm group-hover:gap-2 transition-all">
                                        View Details
                                        <ArrowRight size={14} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Buy More CTA */}
                <div className="p-6 bg-gradient-to-br from-primary/10 via-card to-accent/10 rounded-2xl border border-primary/20 text-center">
                    <h3 className="font-black text-foreground mb-2">Need Another Plan?</h3>
                    <p className="text-foreground/50 text-sm mb-4">
                        Browse our plans and start a new project
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background rounded-full font-bold hover:bg-primary/90 transition-all"
                    >
                        <Package size={18} />
                        View Plans
                    </Link>
                </div>
            </div>
        </div>
    );
}
