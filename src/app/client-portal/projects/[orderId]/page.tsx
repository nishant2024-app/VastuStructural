"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft, Package, User, Phone, Mail, MapPin, Building2,
    Clock, CheckCircle2, AlertCircle, Calendar, IndianRupee,
    FileText, Download, MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

import { statusConfig, allStatuses, formatPrice, type ProjectStatus, type Deliverable } from "@/lib/types";

// Demo project
const demoProject = {
    id: "1",
    orderId: "VSABC123",
    customerName: "Rajesh Kumar",
    customerPhone: "+91 98765 43210",
    customerEmail: "rajesh@example.com",
    planType: "standard",
    planName: "Standard Plan",
    amount: 9999,
    status: "design_in_progress" as ProjectStatus,
    createdAt: new Date("2026-02-10"),
    contractor: {
        name: "Rajendra Patil",
        company: "Patil Construction",
        phone: "+91 90679 69756",
        experience: "15+ years",
    },
    plotDetails: {
        plotSize: "1200 sq. ft.",
        plotDimensions: "30 x 40 ft",
        direction: "East Facing",
        floors: 2,
        requirements: "3 BHK with Vastu compliant design, separate pooja room, car parking",
    },
    updates: [
        {
            id: "1",
            status: "order_placed" as ProjectStatus,
            message: "Payment received successfully. Your order has been placed.",
            createdAt: new Date("2026-02-10T10:30:00"),
        },
        {
            id: "2",
            status: "details_submitted" as ProjectStatus,
            message: "Your plot details have been received and verified.",
            createdAt: new Date("2026-02-10T14:00:00"),
        },
        {
            id: "3",
            status: "in_review" as ProjectStatus,
            message: "Our team is analyzing your plot as per Vastu guidelines.",
            createdAt: new Date("2026-02-11T09:00:00"),
        },
        {
            id: "4",
            status: "contractor_assigned" as ProjectStatus,
            message: "Contractor Rajendra Patil has been assigned to your project.",
            createdAt: new Date("2026-02-11T15:00:00"),
        },
        {
            id: "5",
            status: "design_in_progress" as ProjectStatus,
            message: "Your structural design is now in progress. Expected completion in 48 hours.",
            createdAt: new Date("2026-02-12T10:00:00"),
        },
    ],
    deliverables: [
        {
            id: "1",
            projectId: "1",
            name: "Initial_Floor_Plan.pdf",
            type: "pdf" as const,
            url: "#",
            size: "1.2 MB",
            uploadedAt: new Date("2026-02-12T15:00:00"),
            uploadedBy: "admin" as const,
        }
    ] as Deliverable[],
};

const clientStatusConfig: Record<ProjectStatus, { label: string; color: string; bgColor: string; icon: typeof CheckCircle2 }> = {
    order_placed: { label: "Order Placed", color: "text-primary", bgColor: "bg-primary/10", icon: Package },
    details_submitted: { label: "Details Submitted", color: "text-primary", bgColor: "bg-primary/10", icon: FileText },
    in_review: { label: "In Review", color: "text-warning", bgColor: "bg-warning/10", icon: Clock },
    contractor_assigned: { label: "Contractor Assigned", color: "text-accent", bgColor: "bg-accent/10", icon: Building2 },
    design_in_progress: { label: "Design in Progress", color: "text-secondary", bgColor: "bg-secondary/10", icon: Clock },
    review_pending: { label: "Review Pending", color: "text-warning", bgColor: "bg-warning/10", icon: AlertCircle },
    revisions: { label: "Revisions", color: "text-warning", bgColor: "bg-warning/10", icon: Clock },
    completed: { label: "Completed", color: "text-success", bgColor: "bg-success/10", icon: CheckCircle2 },
};

const clientStatuses = allStatuses;

export default function ClientProjectPage() {
    const params = useParams();
    const router = useRouter();
    const orderId = params.orderId as string;

    const [project, setProject] = useState(demoProject);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const auth = localStorage.getItem("clientAuth");
        if (!auth) {
            router.push("/client-portal/login");
            return;
        }

        // Load project (demo)
        setProject(demoProject);
        setIsLoading(false);
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background pt-24 pb-20 px-6 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const currentStatusIndex = clientStatuses.indexOf(project.status);

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Back */}
                <Link
                    href="/client-portal"
                    className="inline-flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors mb-6"
                >
                    <ArrowLeft size={16} />
                    Back to Dashboard
                </Link>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Package size={28} className="text-primary" />
                            <h1 className="text-2xl md:text-3xl font-black text-foreground">
                                #{project.orderId}
                            </h1>
                            <span className={cn(
                                "px-3 py-1 rounded-full text-xs font-bold",
                                clientStatusConfig[project.status].color,
                                clientStatusConfig[project.status].bgColor
                            )}>
                                {clientStatusConfig[project.status].label}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-foreground/50">
                            <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {project.createdAt.toLocaleDateString("en-IN")}
                            </span>
                            <span>{project.planName}</span>
                            <span className="text-primary font-bold">{formatPrice(project.amount)}</span>
                        </div>
                    </div>
                </div>

                {/* Status Timeline */}
                <div className="bg-card/60 backdrop-blur-xl rounded-3xl border border-border p-6 mb-6">
                    <h3 className="font-black text-foreground mb-6">Project Progress</h3>
                    <div className="flex items-center justify-between relative">
                        {/* Progress Line */}
                        <div className="absolute top-5 left-0 right-0 h-1 bg-border rounded-full" />
                        <div
                            className="absolute top-5 left-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                            style={{ width: `${(currentStatusIndex / (clientStatuses.length - 1)) * 100}%` }}
                        />

                        {clientStatuses.map((status, idx) => {
                            const StatusIcon = clientStatusConfig[status].icon;
                            const isCompleted = idx <= currentStatusIndex;
                            const isCurrent = idx === currentStatusIndex;

                            return (
                                <div key={status} className="relative flex flex-col items-center z-10">
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                                        isCompleted
                                            ? isCurrent
                                                ? "bg-gradient-to-br from-primary to-secondary text-background scale-110"
                                                : "bg-primary text-background"
                                            : "bg-card border-2 border-border text-foreground/30"
                                    )}>
                                        <StatusIcon size={18} />
                                    </div>
                                    <span className={cn(
                                        "text-xs font-bold mt-2 text-center hidden md:block max-w-[80px]",
                                        isCompleted ? "text-foreground" : "text-foreground/30"
                                    )}>
                                        {clientStatusConfig[status].label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Assigned Contractor */}
                    <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6">
                        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                            <Building2 size={18} className="text-primary" />
                            Your Contractor
                        </h3>
                        {project.contractor ? (
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">
                                        {project.contractor.name.split(" ").map(n => n[0]).join("")}
                                    </div>
                                    <div>
                                        <div className="font-bold text-foreground">{project.contractor.name}</div>
                                        <div className="text-sm text-foreground/50">{project.contractor.company}</div>
                                    </div>
                                </div>
                                <div className="text-sm text-foreground/60 flex items-center gap-2">
                                    <Clock size={14} />
                                    {project.contractor.experience} Experience
                                </div>
                                <a
                                    href={`tel:${project.contractor.phone}`}
                                    className="flex items-center gap-2 text-primary font-bold text-sm hover:underline"
                                >
                                    <Phone size={14} />
                                    {project.contractor.phone}
                                </a>
                            </div>
                        ) : (
                            <div className="text-center py-4">
                                <AlertCircle size={32} className="text-warning mx-auto mb-2" />
                                <p className="text-foreground/50 text-sm">Contractor will be assigned soon</p>
                            </div>
                        )}
                    </div>

                    {/* Plot Details */}
                    <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6">
                        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                            <MapPin size={18} className="text-primary" />
                            Plot Details
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-foreground/50">Size</span>
                                <span className="text-foreground font-bold">{project.plotDetails.plotSize}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-foreground/50">Dimensions</span>
                                <span className="text-foreground font-bold">{project.plotDetails.plotDimensions}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-foreground/50">Direction</span>
                                <span className="text-foreground font-bold">{project.plotDetails.direction}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-foreground/50">Floors</span>
                                <span className="text-foreground font-bold">{project.plotDetails.floors}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Updates */}
                <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6 mb-6">
                    <h3 className="font-bold text-foreground mb-6 flex items-center gap-2">
                        <MessageSquare size={18} className="text-primary" />
                        Progress Updates
                    </h3>
                    <div className="space-y-4">
                        {project.updates.slice().reverse().map((update, idx) => (
                            <div key={update.id} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className={cn(
                                        "w-3 h-3 rounded-full",
                                        idx === 0 ? "bg-primary" : "bg-border"
                                    )} />
                                    {idx < project.updates.length - 1 && (
                                        <div className="w-0.5 flex-1 bg-border" />
                                    )}
                                </div>
                                <div className="pb-4 flex-1">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <span className={cn(
                                            "text-xs font-bold px-2 py-0.5 rounded-full",
                                            statusConfig[update.status].color,
                                            statusConfig[update.status].bgColor
                                        )}>
                                            {statusConfig[update.status].label}
                                        </span>
                                        <span className="text-xs text-foreground/40">
                                            {update.createdAt.toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "short",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                    <p className="text-sm text-foreground/70">{update.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Deliverables */}
                <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6">
                    <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                        <Download size={18} className="text-secondary" />
                        Project Deliverables
                    </h3>
                    {project.deliverables && project.deliverables.length > 0 ? (
                        <div className="grid gap-3">
                            {project.deliverables.map((file: Deliverable) => (
                                <div key={file.id} className="flex items-center justify-between p-4 bg-background border border-border rounded-xl hover:border-secondary/50 transition-all group">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                                            <FileText size={20} className="text-secondary" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <div className="font-bold text-foreground truncate">{file.name}</div>
                                            <div className="text-xs text-foreground/40">{file.size} • {file.uploadedAt.toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-background rounded-lg font-bold text-xs hover:bg-secondary/90 transition-all">
                                        <Download size={14} />
                                        Download
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-foreground/40 bg-background/50 rounded-xl border border-dashed border-border">
                            <FileText size={48} className="mx-auto mb-3 opacity-30" />
                            <p className="font-medium">Your deliverables will appear here once ready</p>
                            <p className="text-xs mt-1 text-foreground/30">Expect 2D Floor Plans and Vastu Reports</p>
                        </div>
                    )}
                </div>

                {/* Support CTA */}
                <div className="mt-8 p-6 bg-gradient-to-br from-primary/10 via-card to-accent/10 rounded-2xl border border-primary/20 text-center">
                    <h3 className="font-black text-foreground mb-2">Need Help?</h3>
                    <p className="text-foreground/50 text-sm mb-4">Contact us for any queries about your project</p>
                    <a
                        href="tel:+919067969756"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background rounded-full font-bold"
                    >
                        <Phone size={18} />
                        Call Support
                    </a>
                </div>
            </div>
        </div>
    );
}
