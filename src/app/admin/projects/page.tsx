"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Package, Search, Clock, CheckCircle2, AlertCircle,
    ArrowRight, TrendingUp, Filter
} from "lucide-react";
import { cn } from "@/lib/utils";
import AdminLayout from "@/components/admin/AdminLayout";
import { MockDB } from "@/lib/mockData";
import { statusConfig, formatPrice, Project, ProjectStatus } from "@/lib/types";

const statusFilters = [
    { value: "all", label: "Global Archive" },
    { value: "pending", label: "Assignment Queue" },
    { value: "in_progress", label: "Production" },
    { value: "completed", label: "Closed File" },
];

export default function AdminProjectsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        setProjects(MockDB.getProjects());
    }, []);

    const filteredProjects = projects.filter((project) => {
        const matchesSearch =
            searchQuery === "" ||
            project.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.customerPhone.includes(searchQuery);

        let matchesFilter = true;
        if (statusFilter === "pending") {
            matchesFilter = ["order_placed", "details_submitted", "in_review"].includes(project.status);
        } else if (statusFilter === "in_progress") {
            matchesFilter = ["contractor_assigned", "design_in_progress", "review_pending", "revisions"].includes(project.status);
        } else if (statusFilter === "completed") {
            matchesFilter = project.status === "completed";
        }

        return matchesSearch && matchesFilter;
    });

    const pendingCount = projects.filter(p =>
        ["order_placed", "details_submitted", "in_review"].includes(p.status)
    ).length;

    return (
        <AdminLayout>
            <div className="p-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-foreground tracking-tighter">PROJECTS</h1>
                        <p className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.3em] mt-1">Enterprise Asset Management</p>
                    </div>

                    {/* Compact Stats */}
                    <div className="flex gap-4">
                        <div className="px-5 py-3 bg-card border border-border rounded-2xl flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <Package size={18} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-foreground">{projects.length}</p>
                                <p className="text-[9px] font-black text-foreground/30 uppercase tracking-wider">Total</p>
                            </div>
                        </div>
                        <div className="px-5 py-3 bg-card border border-border rounded-2xl flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-error/10 flex items-center justify-center text-error">
                                <AlertCircle size={18} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-foreground">{pendingCount}</p>
                                <p className="text-[9px] font-black text-foreground/30 uppercase tracking-wider">Queue</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filtration System */}
                <div className="flex flex-col lg:flex-row gap-4 mb-8">
                    <div className="relative flex-1 group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Query by Record ID, Customer Identity, or Channel..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl text-xs font-black uppercase tracking-widest placeholder:text-foreground/20 focus:outline-none focus:border-primary transition-all"
                        />
                    </div>
                    <div className="flex p-1.5 bg-card border border-border rounded-2xl gap-1">
                        {statusFilters.map((filter) => (
                            <button
                                key={filter.value}
                                onClick={() => setStatusFilter(filter.value)}
                                className={cn(
                                    "px-5 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-[0.15em] transition-all",
                                    statusFilter === filter.value
                                        ? "bg-primary text-background shadow-md shadow-primary/20"
                                        : "text-foreground/40 hover:text-foreground hover:bg-foreground/5"
                                )}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Records Table */}
                <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-foreground/[0.02] border-b border-border">
                                    <th className="text-left p-5 text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em]">Record Identifier</th>
                                    <th className="text-left p-5 text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em]">Customer Profile</th>
                                    <th className="text-left p-5 text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em]">Configuration</th>
                                    <th className="text-left p-5 text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em]">Operational Status</th>
                                    <th className="text-left p-5 text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em]">Partner</th>
                                    <th className="text-right p-5 text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredProjects.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-20 text-center">
                                            <Package size={40} className="mx-auto mb-4 text-foreground/10" />
                                            <p className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em]">Database Empty for current query</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredProjects.map((project) => (
                                        <tr key={project.id} className="hover:bg-foreground/[0.01] transition-colors group">
                                            <td className="p-5">
                                                <div className="font-mono font-black text-foreground group-hover:text-primary transition-colors">{project.orderId}</div>
                                                <div className="text-[9px] text-foreground/40 font-black mt-1">LOGGED: {new Date(project.createdAt).toLocaleDateString()}</div>
                                            </td>
                                            <td className="p-5">
                                                <div className="font-black text-foreground text-sm uppercase">{project.customerName}</div>
                                                <div className="text-[10px] text-foreground/40 font-bold uppercase">{project.customerPhone}</div>
                                            </td>
                                            <td className="p-5">
                                                <div className="text-xs font-black text-foreground uppercase tracking-tighter">{project.planName}</div>
                                                <div className="text-[10px] text-primary font-black uppercase tracking-widest">{formatPrice(project.amount)}</div>
                                            </td>
                                            <td className="p-5">
                                                <span className={cn(
                                                    "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-1.5",
                                                    statusConfig[project.status].color,
                                                    statusConfig[project.status].bgColor
                                                )}>
                                                    <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", statusConfig[project.status].color.replace('text-', 'bg-'))} />
                                                    {statusConfig[project.status].label}
                                                </span>
                                            </td>
                                            <td className="p-5">
                                                {project.assignedContractorId ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center text-accent text-[8px] font-black">
                                                            P
                                                        </div>
                                                        <span className="text-[10px] font-black text-foreground/60 uppercase uppercase tracking-wider">Partner Assigned</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-md bg-warning/10 flex items-center justify-center text-warning text-[8px] font-black">
                                                            !
                                                        </div>
                                                        <span className="text-[10px] font-black text-warning uppercase tracking-wider italic">Pending Allocation</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-5 text-right">
                                                <Link
                                                    href={`/admin/projects/${project.id}`}
                                                    className="inline-flex items-center gap-2 px-6 py-3 bg-foreground/5 hover:bg-primary hover:text-background rounded-2xl font-black text-[9px] uppercase tracking-[0.2em] transition-all shadow-sm hover:shadow-primary/20"
                                                >
                                                    Manage
                                                    <ArrowRight size={14} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
