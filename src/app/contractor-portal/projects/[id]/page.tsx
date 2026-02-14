"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft, Package, User, Phone, MapPin, Building2,
    Clock, CheckCircle2, AlertCircle, Calendar, IndianRupee,
    FileText, Upload, MessageSquare, Send, Loader2, Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { statusConfig, allStatuses, formatPrice, formatDateTime, type ProjectStatus } from "@/lib/types";

interface UpdateItem {
    id: string;
    status: ProjectStatus;
    message: string;
    createdBy: "system" | "admin" | "contractor";
    createdAt: Date;
}

interface ProjectData {
    id: string;
    orderId: string;
    customerName: string;
    customerPhone: string;
    planType: string;
    planName: string;
    amount: number;
    commission: number;
    status: ProjectStatus;
    createdAt: Date;
    plotDetails: {
        plotSize: string;
        plotDimensions: string;
        direction: string;
        floors: number;
        requirements: string;
    };
    updates: UpdateItem[];
}

// Demo project data
const demoProject: ProjectData = {
    id: "1",
    orderId: "VSABC123",
    customerName: "Rajesh Kumar",
    customerPhone: "+91 98765 43210",
    planType: "standard",
    planName: "Standard Plan",
    amount: 9999,
    commission: 500,
    status: "design_in_progress" as ProjectStatus,
    createdAt: new Date("2026-02-10"),
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
            createdBy: "system",
            createdAt: new Date("2026-02-10T10:30:00"),
        },
        {
            id: "2",
            status: "contractor_assigned" as ProjectStatus,
            message: "You have been assigned to this project.",
            createdBy: "admin",
            createdAt: new Date("2026-02-11T15:00:00"),
        },
        {
            id: "3",
            status: "design_in_progress" as ProjectStatus,
            message: "Design work started. Expected completion in 48 hours.",
            createdBy: "admin",
            createdAt: new Date("2026-02-12T10:00:00"),
        },
    ],
};

const statusUpdateOptions = [
    { status: "design_in_progress" as ProjectStatus, label: "Design Started" },
    { status: "review_pending" as ProjectStatus, label: "Submitted for Review" },
    { status: "completed" as ProjectStatus, label: "Mark as Completed" },
];

export default function ContractorProjectDetailPage() {
    const params = useParams();
    const router = useRouter();
    const projectId = params.id as string;

    const [project, setProject] = useState<ProjectData>(demoProject);
    const [isLoading, setIsLoading] = useState(true);
    const [updateMessage, setUpdateMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | null>(null);

    useEffect(() => {
        const auth = localStorage.getItem("contractorAuth");
        if (!auth) {
            router.push("/contractor-portal/login");
            return;
        }

        // Load project (demo)
        setProject(demoProject);
        setIsLoading(false);
    }, [router]);

    const handleAddUpdate = async () => {
        if (!updateMessage.trim()) return;

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newUpdate: UpdateItem = {
            id: String(project.updates.length + 1),
            status: project.status,
            message: updateMessage,
            createdBy: "contractor",
            createdAt: new Date(),
        };

        setProject(prev => ({
            ...prev,
            updates: [...prev.updates, newUpdate],
        }));

        setUpdateMessage("");
        setIsSubmitting(false);
    };

    const handleStatusUpdate = async (newStatus: ProjectStatus) => {
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newUpdate: UpdateItem = {
            id: String(project.updates.length + 1),
            status: newStatus,
            message: `Status updated to ${statusConfig[newStatus].label}`,
            createdBy: "contractor",
            createdAt: new Date(),
        };

        setProject(prev => ({
            ...prev,
            status: newStatus,
            updates: [...prev.updates, newUpdate],
        }));

        setShowStatusModal(false);
        setSelectedStatus(null);
        setIsSubmitting(false);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background pt-24 pb-20 px-6 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const currentStatusIndex = allStatuses.indexOf(project.status);

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Back */}
                <Link
                    href="/contractor-portal"
                    className="inline-flex items-center gap-2 text-foreground/50 hover:text-accent transition-colors mb-6"
                >
                    <ArrowLeft size={16} />
                    Back to Dashboard
                </Link>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Package size={28} className="text-accent" />
                            <h1 className="text-2xl md:text-3xl font-black text-foreground">
                                #{project.orderId}
                            </h1>
                            <span className={cn(
                                "px-3 py-1 rounded-full text-xs font-bold",
                                statusConfig[project.status].color,
                                statusConfig[project.status].bgColor
                            )}>
                                {statusConfig[project.status].label}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-foreground/50">
                            <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {project.createdAt.toLocaleDateString("en-IN")}
                            </span>
                            <span>{project.planName}</span>
                            <span className="text-success font-bold flex items-center gap-1">
                                <IndianRupee size={14} />
                                Commission: {formatPrice(project.commission)}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowStatusModal(true)}
                        className="px-6 py-3 bg-gradient-to-r from-accent to-secondary text-background rounded-xl font-bold flex items-center gap-2"
                    >
                        <CheckCircle2 size={18} />
                        Update Status
                    </button>
                </div>

                {/* Progress Timeline */}
                <div className="bg-card/60 backdrop-blur-xl rounded-3xl border border-border p-6 mb-6">
                    <h3 className="font-black text-foreground mb-6">Project Progress</h3>
                    <div className="flex items-center justify-between relative">
                        {/* Progress Line */}
                        <div className="absolute top-5 left-0 right-0 h-1 bg-border rounded-full" />
                        <div
                            className="absolute top-5 left-0 h-1 bg-gradient-to-r from-accent to-secondary rounded-full transition-all duration-500"
                            style={{ width: `${(currentStatusIndex / (allStatuses.length - 1)) * 100}%` }}
                        />

                        {allStatuses.map((status, idx) => {
                            const isCompleted = idx <= currentStatusIndex;
                            const isCurrent = idx === currentStatusIndex;

                            return (
                                <div key={status} className="relative flex flex-col items-center z-10">
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                                        isCompleted
                                            ? isCurrent
                                                ? "bg-gradient-to-br from-accent to-secondary text-background scale-110"
                                                : "bg-accent text-background"
                                            : "bg-card border-2 border-border text-foreground/30"
                                    )}>
                                        {isCompleted ? <Check size={18} /> : idx + 1}
                                    </div>
                                    <span className={cn(
                                        "text-xs font-bold mt-2 text-center hidden md:block max-w-[80px]",
                                        isCompleted ? "text-foreground" : "text-foreground/30"
                                    )}>
                                        {statusConfig[status].label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Customer Details */}
                    <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6">
                        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                            <User size={18} className="text-accent" />
                            Customer Details
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    {project.customerName.split(" ").map(n => n[0]).join("")}
                                </div>
                                <div>
                                    <div className="font-bold text-foreground">{project.customerName}</div>
                                    <div className="text-sm text-foreground/50">{project.planName}</div>
                                </div>
                            </div>
                            <a
                                href={`tel:${project.customerPhone}`}
                                className="flex items-center gap-2 text-accent font-bold text-sm hover:underline"
                            >
                                <Phone size={14} />
                                {project.customerPhone}
                            </a>
                        </div>
                    </div>

                    {/* Plot Details */}
                    <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6">
                        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                            <MapPin size={18} className="text-accent" />
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
                        {project.plotDetails.requirements && (
                            <div className="mt-4 pt-4 border-t border-border">
                                <div className="text-foreground/50 text-xs mb-1">Requirements</div>
                                <div className="text-foreground text-sm">{project.plotDetails.requirements}</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Add Progress Update */}
                <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6 mb-6">
                    <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                        <MessageSquare size={18} className="text-accent" />
                        Add Progress Update
                    </h3>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={updateMessage}
                            onChange={(e) => setUpdateMessage(e.target.value)}
                            placeholder="e.g., Foundation design completed, moving to structural drawings..."
                            className="flex-1 px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent"
                        />
                        <button
                            onClick={handleAddUpdate}
                            disabled={!updateMessage.trim() || isSubmitting}
                            className="px-6 py-3 bg-accent text-background rounded-xl font-bold flex items-center gap-2 disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <>
                                    <Send size={18} />
                                    Send
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Updates Timeline */}
                <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6">
                    <h3 className="font-bold text-foreground mb-6 flex items-center gap-2">
                        <Clock size={18} className="text-accent" />
                        Updates Timeline
                    </h3>
                    <div className="space-y-4">
                        {project.updates.slice().reverse().map((update, idx) => (
                            <div key={update.id} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className={cn(
                                        "w-3 h-3 rounded-full",
                                        idx === 0 ? "bg-accent" : "bg-border"
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
                                        <span className={cn(
                                            "text-xs px-2 py-0.5 rounded-full",
                                            update.createdBy === "contractor"
                                                ? "bg-accent/10 text-accent"
                                                : update.createdBy === "admin"
                                                    ? "bg-secondary/10 text-secondary"
                                                    : "bg-foreground/10 text-foreground/50"
                                        )}>
                                            {update.createdBy === "contractor" ? "You" : update.createdBy === "admin" ? "Admin" : "System"}
                                        </span>
                                        <span className="text-xs text-foreground/40">
                                            {formatDateTime(update.createdAt)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-foreground/70">{update.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Status Update Modal */}
            {showStatusModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm">
                    <div className="bg-card rounded-3xl border border-border p-6 w-full max-w-md">
                        <h3 className="text-xl font-black text-foreground mb-6">Update Project Status</h3>

                        <div className="space-y-3 mb-6">
                            {statusUpdateOptions.map((option) => (
                                <button
                                    key={option.status}
                                    onClick={() => setSelectedStatus(option.status)}
                                    disabled={allStatuses.indexOf(option.status) <= currentStatusIndex}
                                    className={cn(
                                        "w-full p-4 rounded-xl border text-left font-bold transition-all",
                                        selectedStatus === option.status
                                            ? "border-accent bg-accent/10 text-accent"
                                            : allStatuses.indexOf(option.status) <= currentStatusIndex
                                                ? "border-border text-foreground/30 cursor-not-allowed"
                                                : "border-border text-foreground hover:border-accent/50"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center",
                                            selectedStatus === option.status
                                                ? "bg-accent text-background"
                                                : "bg-background border border-border"
                                        )}>
                                            {selectedStatus === option.status ? <Check size={16} /> : ""}
                                        </div>
                                        {option.label}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowStatusModal(false);
                                    setSelectedStatus(null);
                                }}
                                className="flex-1 py-3 bg-card border border-border rounded-xl font-bold text-foreground"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => selectedStatus && handleStatusUpdate(selectedStatus)}
                                disabled={!selectedStatus || isSubmitting}
                                className="flex-1 py-3 bg-accent text-background rounded-xl font-bold disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <Loader2 size={18} className="animate-spin" />
                                ) : (
                                    "Update"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
