// Shared types for the VastuStructural platform

export type Role = "client" | "contractor" | "admin";

export interface User {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    avatar?: string;
    role: Role;
}

export const AUTH_KEYS = {
    ADMIN: "adminAuth",
    CONTRACTOR: "contractorAuth",
    CLIENT: "clientAuth",
};

export const PORTAL_ROUTES = {
    ADMIN: "/admin",
    ADMIN_DASHBOARD: "/admin/dashboard",
    CONTRACTOR: "/contractor-portal",
    CONTRACTOR_LOGIN: "/contractor-portal/login",
    CLIENT: "/client-portal",
    CLIENT_LOGIN: "/client-portal/login",
};

export type ProjectStatus =
    | "order_placed"
    | "details_submitted"
    | "in_review"
    | "contractor_assigned"
    | "design_in_progress"
    | "review_pending"
    | "revisions"
    | "completed";

export type PlanType = "basic" | "standard" | "premium";

export interface Plan {
    id: PlanType;
    name: string;
    price: number;
    originalPrice: number;
    description: string;
    delivery: string;
    features: string[];
    popular?: boolean;
    gradient: string;
}

export interface Client {
    id: string;
    name: string;
    phone: string;
    email: string;
    projectCount: number;
    totalSpent: number;
    createdAt: Date;
}

export interface Contractor {
    id: string;
    name: string;
    company?: string;
    phone: string;
    email?: string;
    district: string;
    status: "pending" | "approved" | "rejected";
    referralCode: string;
    projectCount: number;
    createdAt: Date;
}

export interface Deliverable {
    id: string;
    projectId: string;
    name: string;
    type: "pdf" | "dwg" | "image" | "document";
    url: string;
    size: string;
    uploadedAt: Date;
    uploadedBy: "admin" | "contractor";
}

export interface Project {
    id: string;
    orderId: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    planType: PlanType;
    planName: string;
    amount: number;
    status: ProjectStatus;
    assignedContractorId?: string | null;
    deliverables: Deliverable[];
    updates: ProjectUpdate[];
    plotDetails: PlotDetails;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProjectUpdate {
    id: string;
    projectId: string;
    status: ProjectStatus;
    message: string;
    createdBy: "system" | "admin" | "contractor";
    createdAt: Date;
}

export type NotificationType = "status_change" | "new_message" | "deliverable_ready" | "system";

export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    link?: string;
    read: boolean;
    createdAt: Date;
}

export interface PlotDetails {
    plotSize: string;
    plotDimensions: string;
    direction: string;
    floors: number;
    requirements: string;
}

// Status configuration
export const statusConfig: Record<ProjectStatus, { label: string; color: string; bgColor: string }> = {
    order_placed: { label: "Order Placed", color: "text-primary", bgColor: "bg-primary/10" },
    details_submitted: { label: "Details Submitted", color: "text-primary", bgColor: "bg-primary/10" },
    in_review: { label: "In Review", color: "text-warning", bgColor: "bg-warning/10" },
    contractor_assigned: { label: "Contractor Assigned", color: "text-accent", bgColor: "bg-accent/10" },
    design_in_progress: { label: "Design in Progress", color: "text-secondary", bgColor: "bg-secondary/10" },
    review_pending: { label: "Review Pending", color: "text-warning", bgColor: "bg-warning/10" },
    revisions: { label: "Revisions", color: "text-warning", bgColor: "bg-warning/10" },
    completed: { label: "Completed", color: "text-success", bgColor: "bg-success/10" },
};

export const allStatuses: ProjectStatus[] = [
    "order_placed",
    "details_submitted",
    "in_review",
    "contractor_assigned",
    "design_in_progress",
    "review_pending",
    "completed",
];

// Plan data
export const plans: Plan[] = [
    {
        id: "basic",
        name: "Basic Plan",
        price: 2999,
        originalPrice: 4999,
        description: "Essential structural design for small plots",
        delivery: "48 Hours",
        features: [
            "2D Floor Plan",
            "Basic Vastu Analysis",
            "PDF Delivery",
            "1 Revision",
            "Email Support",
        ],
        gradient: "from-primary to-yellow-500",
    },
    {
        id: "standard",
        name: "Standard Plan",
        price: 9999,
        originalPrice: 14999,
        description: "Complete structural package for residential plots",
        delivery: "48 Hours",
        features: [
            "2D & 3D Floor Plans",
            "Full Vastu Compliance",
            "Structural Drawings",
            "3D Elevation Views",
            "3 Revisions",
            "Phone Support",
            "Contractor Assignment",
        ],
        popular: true,
        gradient: "from-secondary to-pink-500",
    },
    {
        id: "premium",
        name: "Premium Plan",
        price: 24999,
        originalPrice: 39999,
        description: "Enterprise solution for complex projects",
        delivery: "48 Hours",
        features: [
            "Everything in Standard",
            "Interior 3D Renders",
            "Material Estimation",
            "Site Visit Coordination",
            "Unlimited Revisions",
            "Priority Support 24/7",
            "Dedicated Contractor",
            "Video Walkthrough",
        ],
        gradient: "from-accent to-cyan-400",
    },
];

// Helper functions
export function formatPrice(amount: number): string {
    return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatDate(date: Date): string {
    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export function formatDateTime(date: Date): string {
    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function generateOrderId(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "VS";
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export function generateReferralCode(name: string): string {
    const prefix = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `VS${prefix}${suffix}`;
}
