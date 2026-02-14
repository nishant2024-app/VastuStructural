"use client";

import { useState, useEffect } from "react";
import {
    Building2, Search, Filter, Check, X,
    MoreVertical, Phone, MapPin, ShieldCheck,
    Clock, Trash2, ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import AdminLayout from "@/components/admin/AdminLayout";
import { MockDB } from "@/lib/mockData";
import { Contractor } from "@/lib/types";

export default function AdminContractorsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
    const [contractors, setContractors] = useState<Contractor[]>([]);

    useEffect(() => {
        setContractors(MockDB.getContractors());
    }, []);

    const handleApprove = (id: string) => {
        MockDB.updateContractor(id, { status: "approved" });
        setContractors(MockDB.getContractors());
    };

    const handleReject = (id: string) => {
        MockDB.updateContractor(id, { status: "rejected" });
        setContractors(MockDB.getContractors());
    };

    const handleDelete = (id: string) => {
        if (confirm("Permanently delete this partner record?")) {
            MockDB.deleteContractor(id);
            setContractors(MockDB.getContractors());
        }
    };

    const filtered = contractors.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.phone.includes(searchQuery);
        const matchesStatus = statusFilter === "all" || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <AdminLayout>
            <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-foreground tracking-tighter uppercase">Partners & Network</h1>
                        <p className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.3em] mt-1">Regional Fulfillment Infrastructure</p>
                    </div>
                    <div className="flex p-1.5 bg-card border border-border rounded-2xl gap-1">
                        {(["all", "pending", "approved", "rejected"] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setStatusFilter(f)}
                                className={cn(
                                    "px-5 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-[0.15em] transition-all",
                                    statusFilter === f
                                        ? "bg-primary text-background shadow-md shadow-primary/20"
                                        : "text-foreground/40 hover:text-foreground hover:bg-foreground/5"
                                )}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative mb-8 group">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search Regional Partners by Identity, Company, or Mobile..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl text-xs font-black uppercase tracking-widest placeholder:text-foreground/20 focus:outline-none focus:border-primary transition-all"
                    />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((c) => (
                        <div key={c.id} className="bg-card rounded-3xl border border-border overflow-hidden flex flex-col group hover:border-primary/30 transition-all hover:shadow-2xl">
                            <div className="p-8 pb-4">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-foreground/5 flex items-center justify-center text-foreground/40 font-black text-xl group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                        {c.name.charAt(0)}
                                    </div>
                                    <span className={cn(
                                        "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest",
                                        c.status === "approved" ? "bg-success/10 text-success" :
                                            c.status === "rejected" ? "bg-error/10 text-error" :
                                                "bg-warning/10 text-warning"
                                    )}>
                                        {c.status}
                                    </span>
                                </div>
                                <h3 className="text-xl font-black text-foreground uppercase tracking-tight mb-1">{c.name}</h3>
                                <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest mb-6">{c.company || "Independent Contractor"}</p>

                                <div className="space-y-4 pt-4 border-t border-border">
                                    <div className="flex items-center gap-3 text-xs font-black text-foreground/60 uppercase">
                                        <Phone size={14} className="text-foreground/20" />
                                        {c.phone}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs font-black text-foreground/60 uppercase">
                                        <MapPin size={14} className="text-foreground/20" />
                                        {c.district}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs font-black text-foreground/60 uppercase">
                                        <Clock size={14} className="text-foreground/20" />
                                        LOGGED: {new Date(c.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 mt-auto bg-foreground/[0.01] border-t border-border flex gap-2">
                                {c.status === "pending" ? (
                                    <>
                                        <button
                                            onClick={() => handleApprove(c.id)}
                                            className="flex-1 py-3 bg-success text-background rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                                        >
                                            <Check size={14} />
                                            Verify
                                        </button>
                                        <button
                                            onClick={() => handleReject(c.id)}
                                            className="flex-1 py-3 bg-error text-background rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                                        >
                                            <X size={14} />
                                            Reject
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => handleDelete(c.id)}
                                        className="w-full py-3 bg-foreground/5 hover:bg-error/10 hover:text-error text-foreground/30 rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                                    >
                                        <Trash2 size={14} />
                                        Remove Record
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <div className="col-span-full py-32 text-center bg-card rounded-[3rem] border border-border">
                            <Building2 size={64} className="mx-auto mb-6 text-foreground/10" />
                            <h3 className="text-2xl font-black text-foreground/20 uppercase tracking-widest">No Regional Partners Found</h3>
                            <button onClick={() => { setSearchQuery(""); setStatusFilter("all") }} className="mt-8 px-8 py-3 bg-foreground text-background rounded-full font-black text-[10px] uppercase tracking-[0.2em]">Reset Directory View</button>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
