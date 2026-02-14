"use client";

import { useState, useEffect } from "react";
import {
    Users, Search, Mail, Phone, Calendar,
    TrendingUp, Package, ArrowRight, DollarSign,
    MoreVertical, User
} from "lucide-react";
import { cn } from "@/lib/utils";
import AdminLayout from "@/components/admin/AdminLayout";
import { MockDB } from "@/lib/mockData";
import { Client, formatPrice } from "@/lib/types";

export default function AdminClientsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => {
        setClients(MockDB.getClients());
    }, []);

    const filtered = clients.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery)
    );

    return (
        <AdminLayout>
            <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-foreground tracking-tighter uppercase">Client Database</h1>
                        <p className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.3em] mt-1">Customer Lifecycle Registry</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="px-6 py-4 bg-success/5 border border-success/20 rounded-2xl">
                            <p className="text-2xl font-black text-success">
                                {formatPrice(clients.reduce((sum, c) => sum + c.totalSpent, 0))}
                            </p>
                            <p className="text-[9px] font-black text-success/40 uppercase tracking-widest mt-1">LTV Aggregate</p>
                        </div>
                    </div>
                </div>

                <div className="relative mb-8 group">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Query Client Directory by Identity, Email, or Mobile Channel..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl text-xs font-black uppercase tracking-widest placeholder:text-foreground/20 focus:outline-none focus:border-primary transition-all"
                    />
                </div>

                <div className="bg-card rounded-[3rem] border border-border overflow-hidden shadow-2xl">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-foreground/[0.02] border-b border-border">
                                <th className="text-left p-6 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Customer Identity</th>
                                <th className="text-left p-6 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Contact Channels</th>
                                <th className="text-left p-6 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Activity Level</th>
                                <th className="text-left p-6 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Financial Contribution</th>
                                <th className="text-right p-6 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filtered.map((c) => (
                                <tr key={c.id} className="hover:bg-foreground/[0.01] transition-colors group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary font-black text-xl shadow-inner group-hover:scale-110 transition-transform">
                                                {c.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-black text-foreground text-sm uppercase tracking-tight">{c.name}</div>
                                                <div className="text-[10px] font-black text-foreground/30 uppercase tracking-widest mt-1">Ref CID: {c.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-xs font-black text-foreground/70 uppercase">
                                                <Phone size={12} className="text-foreground/20" />
                                                {c.phone}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-black text-foreground/40 lowercase tracking-tight">
                                                <Mail size={12} className="text-foreground/20" />
                                                {c.email}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-foreground/5 rounded-lg">
                                            <Package size={12} className="text-foreground/20" />
                                            <span className="text-[10px] font-black text-foreground uppercase tracking-widest">{c.projectCount} Projects Archive</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="font-black text-success text-sm uppercase tracking-tighter">{formatPrice(c.totalSpent)}</div>
                                        <div className="text-[9px] font-black text-foreground/20 uppercase tracking-widest mt-1 flex items-center gap-1">
                                            <Calendar size={10} /> Joined {new Date(c.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="p-6 text-right">
                                        <button className="px-6 py-3 bg-foreground/5 hover:bg-foreground/10 text-foreground/40 rounded-2xl font-black text-[9px] uppercase tracking-[0.2em] transition-all">
                                            Manage Profile
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filtered.length === 0 && (
                        <div className="p-32 text-center">
                            <Users size={64} className="mx-auto mb-6 text-foreground/10" />
                            <h3 className="text-2xl font-black text-foreground/20 uppercase tracking-widest">Global Directory Clean</h3>
                            <button onClick={() => setSearchQuery("")} className="mt-8 px-8 py-3 bg-foreground text-background rounded-full font-black text-[10px] uppercase tracking-[0.2em]">Flush Filters</button>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
