"use client";

import { useState, useEffect } from "react";
import {
    Package, Users, Building2, Search,
    Clock, ArrowRight, IndianRupee, Check, X,
    AlertCircle, TrendingUp, ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import AdminLayout from "@/components/admin/AdminLayout";
import { MockDB } from "@/lib/mockData";
import { statusConfig, formatPrice, Project, Contractor, Client } from "@/lib/types";
import Link from "next/link";

type TabType = "projects" | "contractors" | "clients";

export default function AdminDashboardPage() {
    const [activeTab, setActiveTab] = useState<TabType>("projects");
    const [searchQuery, setSearchQuery] = useState("");
    const [projects, setProjects] = useState<Project[]>([]);
    const [contractors, setContractors] = useState<Contractor[]>([]);
    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => {
        setProjects(MockDB.getProjects());
        setContractors(MockDB.getContractors());
        setClients(MockDB.getClients());
    }, []);

    const totalRevenue = projects.reduce((sum, p) => sum + p.amount, 0);
    const pendingProjects = projects.filter(p => ["order_placed", "details_submitted", "in_review"].includes(p.status)).length;
    const pendingContractors = contractors.filter(c => c.status === "pending").length;

    const handleApproveContractor = (id: string) => {
        MockDB.updateContractor(id, { status: "approved" });
        setContractors(MockDB.getContractors());
    };

    const handleRejectContractor = (id: string) => {
        MockDB.updateContractor(id, { status: "rejected" });
        setContractors(MockDB.getContractors());
    };

    return (
        <AdminLayout>
            <div className="p-8">
                {/* Welcome Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-foreground">Dashboard</h1>
                        <p className="text-foreground/50 text-sm font-bold uppercase tracking-widest">Management Overview</p>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-2xl">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shadow-lg shadow-primary/10">
                            <TrendingUp size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-primary uppercase tracking-tighter">System Health</p>
                            <p className="text-xs font-black text-foreground">OPERATIONAL</p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-card rounded-2xl border border-border p-5 group hover:border-primary/50 transition-all hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,0.1)]">
                        <div className="flex items-center justify-between mb-3 text-foreground/20 group-hover:text-primary transition-colors">
                            <Package size={24} />
                            <span className="text-[10px] font-black bg-foreground/5 px-2 py-0.5 rounded text-foreground/40 uppercase tracking-widest group-hover:bg-primary/10 group-hover:text-primary">Orders</span>
                        </div>
                        <div className="text-2xl font-black text-foreground group-hover:translate-x-1 transition-transform">{projects.length}</div>
                        <div className="text-[10px] text-foreground/40 font-black uppercase mt-1 tracking-wider">Active Projects</div>
                    </div>
                    <div className="bg-card rounded-2xl border border-border p-5 group hover:border-secondary/50 transition-all hover:shadow-[0_20px_40px_-15px_rgba(244,114,182,0.1)]">
                        <div className="flex items-center justify-between mb-3 text-foreground/20 group-hover:text-secondary transition-colors">
                            <Users size={24} />
                            <span className="text-[10px] font-black bg-foreground/5 px-2 py-0.5 rounded text-foreground/40 uppercase tracking-widest group-hover:bg-secondary/10 group-hover:text-secondary">Users</span>
                        </div>
                        <div className="text-2xl font-black text-foreground group-hover:translate-x-1 transition-transform">{clients.length}</div>
                        <div className="text-[10px] text-foreground/40 font-black uppercase mt-1 tracking-wider">Registered Clients</div>
                    </div>
                    <div className="bg-card rounded-2xl border border-border p-5 group hover:border-accent/50 transition-all hover:shadow-[0_20px_40px_-15px_rgba(34,211,238,0.1)]">
                        <div className="flex items-center justify-between mb-3 text-foreground/20 group-hover:text-accent transition-colors">
                            <Building2 size={24} />
                            <span className="text-[10px] font-black bg-foreground/5 px-2 py-0.5 rounded text-foreground/40 uppercase tracking-widest group-hover:bg-accent/10 group-hover:text-accent">Partners</span>
                        </div>
                        <div className="text-2xl font-black text-foreground group-hover:translate-x-1 transition-transform">{contractors.filter(c => c.status === "approved").length}</div>
                        <div className="text-[10px] text-foreground/40 font-black uppercase mt-1 tracking-wider">Verified Contractors</div>
                    </div>
                    <div className="bg-card rounded-2xl border border-border p-5 group hover:border-success/50 transition-all hover:shadow-[0_20px_40px_-15px_rgba(74,222,128,0.1)]">
                        <div className="flex items-center justify-between mb-3 text-foreground/20 group-hover:text-success transition-colors">
                            <IndianRupee size={24} />
                            <span className="text-[10px] font-black bg-foreground/5 px-2 py-0.5 rounded text-foreground/40 uppercase tracking-widest group-hover:bg-success/10 group-hover:text-success">Total</span>
                        </div>
                        <div className="text-2xl font-black text-foreground group-hover:translate-x-1 transition-transform">{formatPrice(totalRevenue)}</div>
                        <div className="text-[10px] text-foreground/40 font-black uppercase mt-1 tracking-wider">Net Gross Volume</div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-2xl">
                    {/* Tabs Header */}
                    <div className="p-4 border-b border-border bg-foreground/[0.01] flex flex-wrap items-center justify-between gap-4">
                        <div className="flex gap-2">
                            {(["projects", "contractors", "clients"] as TabType[]).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={cn(
                                        "px-5 py-2.5 rounded-xl font-black text-xs transition-all capitalize tracking-widest",
                                        activeTab === tab
                                            ? "bg-primary text-background shadow-lg shadow-primary/20"
                                            : "text-foreground/40 hover:text-foreground hover:bg-foreground/5"
                                    )}
                                >
                                    {tab}
                                    {tab === "projects" && pendingProjects > 0 && (
                                        <span className="ml-2 w-5 h-5 bg-error text-background rounded-full text-[10px] inline-flex items-center justify-center animate-pulse">
                                            {pendingProjects}
                                        </span>
                                    )}
                                    {tab === "contractors" && pendingContractors > 0 && (
                                        <span className="ml-2 w-5 h-5 bg-warning text-background rounded-full text-[10px] inline-flex items-center justify-center animate-pulse">
                                            {pendingContractors}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full sm:w-64 group">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={`Search ${activeTab}...`}
                                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-xs font-bold focus:outline-none focus:border-primary transition-all placeholder:text-foreground/20"
                            />
                        </div>
                    </div>

                    {/* Tab Panels */}
                    <div className="p-0 overflow-x-auto custom-scrollbar">
                        {activeTab === "projects" && (
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-foreground/[0.01]">
                                        <th className="text-left p-4 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Project ID</th>
                                        <th className="text-left p-4 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Customer</th>
                                        <th className="text-left p-4 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Package</th>
                                        <th className="text-left p-4 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Status</th>
                                        <th className="text-right p-4 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Management</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {projects.filter(p =>
                                        p.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        p.customerName.toLowerCase().includes(searchQuery.toLowerCase())
                                    ).map((p) => (
                                        <tr key={p.id} className="hover:bg-foreground/[0.01] transition-colors group">
                                            <td className="p-4">
                                                <div className="font-mono font-black text-foreground group-hover:text-primary transition-colors">{p.orderId}</div>
                                                <div className="text-[9px] text-foreground/40 font-black uppercase mt-1">Ref: {p.id}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="font-black text-foreground text-sm">{p.customerName}</div>
                                                <div className="text-[10px] text-foreground/40 font-bold uppercase">{p.customerPhone}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="font-black text-foreground text-sm uppercase tracking-tighter">{p.planName}</div>
                                                <div className="text-[10px] text-primary font-black">{formatPrice(p.amount)}</div>
                                            </td>
                                            <td className="p-4">
                                                <span className={cn(
                                                    "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 w-max",
                                                    statusConfig[p.status].color,
                                                    statusConfig[p.status].bgColor
                                                )}>
                                                    <div className={cn("w-1.5 h-1.5 rounded-full", statusConfig[p.status].color.replace('text-', 'bg-'))} />
                                                    {statusConfig[p.status].label}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <Link
                                                    href={`/admin/projects/${p.id}`}
                                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground/5 hover:bg-primary hover:text-background rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-sm hover:shadow-primary/20"
                                                >
                                                    Manage
                                                    <ArrowRight size={14} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {activeTab === "contractors" && (
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-foreground/[0.01]">
                                        <th className="text-left p-4 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Contractor</th>
                                        <th className="text-left p-4 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Contact</th>
                                        <th className="text-left p-4 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Region</th>
                                        <th className="text-left p-4 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Status</th>
                                        <th className="text-right p-4 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Management</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {contractors.filter(c =>
                                        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        c.company?.toLowerCase().includes(searchQuery.toLowerCase())
                                    ).map((c) => (
                                        <tr key={c.id} className="hover:bg-foreground/[0.01] transition-colors group">
                                            <td className="p-4">
                                                <div className="font-black text-foreground text-sm uppercase">{c.name}</div>
                                                <div className="text-[10px] text-foreground/40 font-bold uppercase">{c.company || "Independent"}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-xs font-black text-foreground">{c.phone}</div>
                                                <div className="text-[10px] text-foreground/40 font-bold uppercase">{c.id}</div>
                                            </td>
                                            <td className="p-4 text-[10px] font-black text-foreground/60 uppercase tracking-widest">{c.district}</td>
                                            <td className="p-4">
                                                <span className={cn(
                                                    "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-[0.2em]",
                                                    c.status === "approved" ? "bg-success/10 text-success" :
                                                        c.status === "rejected" ? "bg-error/10 text-error" :
                                                            "bg-warning/10 text-warning"
                                                )}>
                                                    {c.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                {c.status === "pending" ? (
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => handleApproveContractor(c.id)}
                                                            className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center hover:bg-success hover:text-background transition-all shadow-sm hover:shadow-success/20"
                                                        >
                                                            <Check size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleRejectContractor(c.id)}
                                                            className="w-10 h-10 rounded-xl bg-error/10 text-error flex items-center justify-center hover:bg-error hover:text-background transition-all shadow-sm hover:shadow-error/20"
                                                        >
                                                            <X size={18} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button className="px-5 py-2.5 bg-foreground/5 hover:bg-foreground/10 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all text-foreground/40">
                                                        Details
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {activeTab === "clients" && (
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-foreground/[0.01]">
                                        <th className="text-left p-4 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Profile</th>
                                        <th className="text-left p-4 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Contact</th>
                                        <th className="text-left p-4 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Revenue</th>
                                        <th className="text-left p-4 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Membership</th>
                                        <th className="text-right p-4 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Management</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {clients.filter(c =>
                                        c.name.toLowerCase().includes(searchQuery.toLowerCase())
                                    ).map((c) => (
                                        <tr key={c.id} className="hover:bg-foreground/[0.01] transition-colors group">
                                            <td className="p-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary flex items-center justify-center font-black text-sm shadow-inner group-hover:scale-110 transition-transform">
                                                        {c.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-foreground text-sm uppercase">{c.name}</div>
                                                        <div className="text-[10px] text-foreground/40 font-black uppercase tracking-[0.1em]">{c.projectCount} Projects Archive</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-xs font-black text-foreground">{c.phone}</div>
                                                <div className="text-[10px] text-foreground/40 font-bold uppercase">{c.email}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="font-black text-success text-sm">{formatPrice(c.totalSpent)}</div>
                                            </td>
                                            <td className="p-4 text-[10px] font-black text-foreground/40 uppercase tracking-widest">
                                                {c.createdAt.toLocaleDateString("en-US", { month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="p-4 text-right">
                                                <button className="px-5 py-2.5 bg-foreground/5 hover:bg-foreground/10 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all text-foreground/40">
                                                    View Profile
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Empty States */}
                    {(activeTab === "projects" && projects.length === 0) ||
                        (activeTab === "contractors" && contractors.length === 0) ||
                        (activeTab === "clients" && clients.length === 0) ? (
                        <div className="p-24 text-center">
                            <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-6">
                                <Search size={24} className="text-foreground/20" />
                            </div>
                            <h3 className="text-xl font-black text-foreground/40 capitalize tracking-widest mb-2">No {activeTab} Records</h3>
                            <p className="text-xs text-foreground/20 font-bold tracking-widest uppercase">Encryption Status: SECURE | Zero Results found</p>
                            <button
                                onClick={() => setSearchQuery("")}
                                className="mt-6 px-6 py-2 bg-foreground text-background rounded-full font-black text-[10px] uppercase tracking-[0.2em]"
                            >
                                Clear All Queries
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
        </AdminLayout>
    );
}
