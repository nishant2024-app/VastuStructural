"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft, Package, Clock, User, Phone, Mail, MapPin,
    CheckCircle2, Circle, AlertCircle, Download, MessageSquare,
    Building2, FileText, Calendar, IndianRupee, Truck
} from "lucide-react";
import { cn } from "@/lib/utils";

// Project status types
type ProjectStatus =
    | "order_placed"
    | "details_submitted"
    | "in_review"
    | "contractor_assigned"
    | "design_in_progress"
    | "review_pending"
    | "revisions"
    | "completed";

// Demo project data
const demoProject = {
    id: "VSDEMO123",
    orderId: "VSDEMO123",
    customerName: "Rajesh Kumar",
    customerPhone: "+91 98765 43210",
    customerEmail: "rajesh@example.com",
    planType: "standard" as const,
    planName: "Standard Plan",
    amount: 9999,
    status: "design_in_progress" as ProjectStatus,
    createdAt: new Date("2026-02-10"),
    plotDetails: {
        plotSize: "1200 sq. ft.",
        plotDimensions: "30 x 40 ft",
        direction: "East Facing",
        floors: 2,
        requirements: "3 BHK with Vastu compliant design, separate pooja room, car parking",
    },
    assignedContractor: {
        name: "Rajendra Patil",
        company: "Patil Construction",
        phone: "+91 90679 XXXXX",
        experience: "10+ years",
    },
    updates: [
        {
            id: "1",
            status: "order_placed" as ProjectStatus,
            message: "Payment received successfully. Thank you for your order!",
            createdAt: new Date("2026-02-10T10:30:00"),
        },
        {
            id: "2",
            status: "details_submitted" as ProjectStatus,
            message: "Plot details received. Our team is reviewing your requirements.",
            createdAt: new Date("2026-02-10T14:00:00"),
        },
        {
            id: "3",
            status: "in_review" as ProjectStatus,
            message: "Your project is being reviewed by our Vastu experts.",
            createdAt: new Date("2026-02-11T09:00:00"),
        },
        {
            id: "4",
            status: "contractor_assigned" as ProjectStatus,
            message: "Contractor Rajendra Patil from Patil Construction has been assigned to your project.",
            createdAt: new Date("2026-02-11T15:30:00"),
        },
        {
            id: "5",
            status: "design_in_progress" as ProjectStatus,
            message: "Design work has started. Expected completion: 3-4 days.",
            createdAt: new Date("2026-02-12T10:00:00"),
        },
    ],
    deliverables: [],
};

const statusConfig: Record<ProjectStatus, { label: string; color: string; description: string }> = {
    order_placed: { label: "Order Placed", color: "text-primary", description: "Payment confirmed" },
    details_submitted: { label: "Details Submitted", color: "text-primary", description: "Plot info received" },
    in_review: { label: "In Review", color: "text-warning", description: "Vastu analysis" },
    contractor_assigned: { label: "Contractor Assigned", color: "text-accent", description: "Expert assigned" },
    design_in_progress: { label: "Design in Progress", color: "text-secondary", description: "Work ongoing" },
    review_pending: { label: "Review Pending", color: "text-warning", description: "Awaiting your review" },
    revisions: { label: "Revisions", color: "text-warning", description: "Changes in progress" },
    completed: { label: "Completed", color: "text-success", description: "Ready for download" },
};

const allStatuses: ProjectStatus[] = [
    "order_placed",
    "details_submitted",
    "in_review",
    "contractor_assigned",
    "design_in_progress",
    "review_pending",
    "completed",
];

export default function ProjectTrackingPage() {
    const params = useParams();
    const orderId = params.orderId as string;
    const [project, setProject] = useState<typeof demoProject | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        // Simulate API call
        const loadProject = async () => {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 500));

            // For demo, show the demo project for any order ID
            if (orderId.toUpperCase() === "VSDEMO123" || orderId) {
                setProject({ ...demoProject, orderId: orderId.toUpperCase() });
                setNotFound(false);
            } else {
                setNotFound(true);
            }
            setIsLoading(false);
        };

        loadProject();
    }, [orderId]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background pt-24 pb-20 px-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-foreground/50">Loading project details...</p>
                </div>
            </div>
        );
    }

    if (notFound || !project) {
        return (
            <div className="min-h-screen bg-background pt-24 pb-20 px-6 flex items-center justify-center">
                <div className="text-center max-w-md">
                    <AlertCircle size={48} className="text-error mx-auto mb-4" />
                    <h1 className="text-2xl font-black text-foreground mb-2">Project Not Found</h1>
                    <p className="text-foreground/50 mb-6">
                        We couldn&apos;t find a project with Order ID: {orderId}
                    </p>
                    <Link
                        href="/portal"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background rounded-full font-bold"
                    >
                        <ArrowLeft size={18} />
                        Try Again
                    </Link>
                </div>
            </div>
        );
    }

    const currentStatusIndex = allStatuses.indexOf(project.status);

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Back Link */}
                <Link
                    href="/portal"
                    className="inline-flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors mb-6"
                >
                    <ArrowLeft size={16} />
                    Back to Portal
                </Link>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Package size={24} className="text-primary" />
                            <h1 className="text-2xl md:text-3xl font-black text-foreground">
                                Order #{project.orderId}
                            </h1>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/50">
                            <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {project.createdAt.toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </span>
                            <span className="flex items-center gap-1">
                                <IndianRupee size={14} />
                                {project.amount.toLocaleString("en-IN")}
                            </span>
                        </div>
                    </div>
                    <div className={cn(
                        "px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2",
                        statusConfig[project.status].color,
                        "bg-current/10 border border-current/20"
                    )}>
                        <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                        {statusConfig[project.status].label}
                    </div>
                </div>

                {/* Status Timeline */}
                <div className="bg-card/60 backdrop-blur-xl rounded-3xl border border-border p-6 mb-6">
                    <h2 className="font-black text-foreground mb-6 flex items-center gap-2">
                        <Truck size={20} className="text-primary" />
                        Project Timeline
                    </h2>
                    <div className="flex flex-wrap justify-between gap-2">
                        {allStatuses.map((status, idx) => {
                            const isCompleted = idx <= currentStatusIndex;
                            const isCurrent = idx === currentStatusIndex;
                            const config = statusConfig[status];

                            return (
                                <div key={status} className="flex flex-col items-center flex-1 min-w-[80px]">
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all",
                                        isCompleted
                                            ? "bg-success text-background"
                                            : "bg-card border border-border text-foreground/30"
                                    )}>
                                        {isCompleted ? (
                                            <CheckCircle2 size={20} />
                                        ) : (
                                            <Circle size={20} />
                                        )}
                                    </div>
                                    <div className={cn(
                                        "text-xs font-bold text-center",
                                        isCurrent ? "text-primary" : isCompleted ? "text-foreground/70" : "text-foreground/30"
                                    )}>
                                        {config.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Customer Details */}
                    <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6">
                        <h3 className="font-black text-foreground mb-4 flex items-center gap-2">
                            <User size={18} className="text-primary" />
                            Customer Details
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-3">
                                <User size={16} className="text-foreground/40" />
                                <span className="text-foreground">{project.customerName}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={16} className="text-foreground/40" />
                                <span className="text-foreground">{project.customerPhone}</span>
                            </div>
                            {project.customerEmail && (
                                <div className="flex items-center gap-3">
                                    <Mail size={16} className="text-foreground/40" />
                                    <span className="text-foreground">{project.customerEmail}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Assigned Contractor */}
                    {project.assignedContractor ? (
                        <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6">
                            <h3 className="font-black text-foreground mb-4 flex items-center gap-2">
                                <Building2 size={18} className="text-primary" />
                                Assigned Contractor
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3">
                                    <User size={16} className="text-foreground/40" />
                                    <span className="text-foreground font-bold">{project.assignedContractor.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Building2 size={16} className="text-foreground/40" />
                                    <span className="text-foreground">{project.assignedContractor.company}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock size={16} className="text-foreground/40" />
                                    <span className="text-foreground">{project.assignedContractor.experience} experience</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6">
                            <h3 className="font-black text-foreground mb-4 flex items-center gap-2">
                                <Building2 size={18} className="text-primary" />
                                Contractor Assignment
                            </h3>
                            <p className="text-foreground/50 text-sm">
                                A contractor will be assigned to your project soon.
                                You&apos;ll receive an update once assigned.
                            </p>
                        </div>
                    )}
                </div>

                {/* Plot Details */}
                {project.plotDetails && (
                    <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6 mb-6">
                        <h3 className="font-black text-foreground mb-4 flex items-center gap-2">
                            <MapPin size={18} className="text-primary" />
                            Plot Details
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <div className="text-foreground/40 mb-1">Plot Size</div>
                                <div className="font-bold text-foreground">{project.plotDetails.plotSize}</div>
                            </div>
                            <div>
                                <div className="text-foreground/40 mb-1">Dimensions</div>
                                <div className="font-bold text-foreground">{project.plotDetails.plotDimensions}</div>
                            </div>
                            <div>
                                <div className="text-foreground/40 mb-1">Direction</div>
                                <div className="font-bold text-foreground">{project.plotDetails.direction}</div>
                            </div>
                            <div>
                                <div className="text-foreground/40 mb-1">Floors</div>
                                <div className="font-bold text-foreground">{project.plotDetails.floors}</div>
                            </div>
                        </div>
                        {project.plotDetails.requirements && (
                            <div className="mt-4 pt-4 border-t border-border">
                                <div className="text-foreground/40 mb-2 text-sm">Requirements</div>
                                <p className="text-foreground text-sm">{project.plotDetails.requirements}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Updates Timeline */}
                <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6 mb-6">
                    <h3 className="font-black text-foreground mb-6 flex items-center gap-2">
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
                                            "bg-current/10"
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
                {project.deliverables && project.deliverables.length > 0 ? (
                    <div className="bg-success/10 border border-success/30 rounded-2xl p-6 mb-6">
                        <h3 className="font-black text-foreground mb-4 flex items-center gap-2">
                            <Download size={18} className="text-success" />
                            Your Deliverables
                        </h3>
                        <div className="space-y-2">
                            {/* Render deliverables here */}
                        </div>
                    </div>
                ) : project.status === "completed" ? null : (
                    <div className="bg-card/40 border border-border rounded-2xl p-6 text-center mb-6">
                        <FileText size={32} className="text-foreground/20 mx-auto mb-3" />
                        <p className="text-foreground/50 text-sm">
                            Your files will appear here once the design is complete.
                        </p>
                    </div>
                )}

                {/* Contact Support */}
                <div className="text-center">
                    <p className="text-foreground/40 text-sm mb-3">
                        Have questions about your project?
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
