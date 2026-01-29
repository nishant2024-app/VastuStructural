"use client";

import { useEffect, useState } from "react";
import {
    Users,
    CheckCircle2,
    AlertCircle,
    TrendingUp,
    LogOut,
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
    MoreHorizontal,
    Phone,
    MapPin,
    Calendar,
    ArrowUpRight,
    MessageSquare,
    Loader2,
    Edit,
    Trash2,
    Download,
    X,
    Save
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Lead {
    id: string;
    name: string;
    phone: string;
    city: string;
    plotSize: string;
    direction: string;
    rooms: string;
    status: "pending" | "contacted" | "completed";
    source: "ai_generated" | "ai_failed" | "direct";
    createdAt: string;
    notes?: string;
}

interface Stats {
    total: number;
    pending: number;
    aiGenerated: number;
    manualRequired: number;
}

interface Pagination {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
}

export default function AdminDashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [sourceFilter, setSourceFilter] = useState("");

    // Modal states
    const [editingLead, setEditingLead] = useState<Lead | null>(null);
    const [deletingLead, setDeletingLead] = useState<Lead | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    const router = useRouter();

    const fetchLeads = async () => {
        setIsLoading(true);
        try {
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: "10",
                q: search,
                status: statusFilter,
                source: sourceFilter
            });
            const res = await fetch(`/api/leads?${queryParams}`);
            const data = await res.json();
            if (data.leads) {
                setLeads(data.leads);
                setStats(data.stats);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.error("Failed to fetch leads:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, [page, statusFilter, sourceFilter]);

    // Handle search with debounce in a real app, but direct for now
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchLeads();
    };

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/admin/login");
    };

    const updateLeadStatus = async (leadId: string, status: string) => {
        try {
            const res = await fetch("/api/leads", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ leadId, status })
            });
            if (res.ok) {
                fetchLeads(); // Refresh
            }
        } catch (error) {
            console.error("Failed to update lead:", error);
        }
    };

    const handleSaveEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingLead) return;
        setIsSaving(true);
        try {
            const res = await fetch("/api/leads", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    leadId: editingLead.id,
                    ...editingLead
                })
            });
            if (res.ok) {
                setEditingLead(null);
                fetchLeads();
            }
        } catch (error) {
            console.error("Failed to edit lead:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingLead) return;
        setIsSaving(true);
        try {
            const res = await fetch(`/api/leads?id=${deletingLead.id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                setDeletingLead(null);
                fetchLeads();
            }
        } catch (error) {
            console.error("Failed to delete lead:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const exportToExcel = async () => {
        setIsExporting(true);
        try {
            const res = await fetch("/api/leads?all=true");
            const data = await res.json();
            const allLeads = data.leads as Lead[];

            // Generate CSV
            const headers = ["ID", "Name", "Phone", "City", "Plot Size", "Direction", "Rooms", "Status", "Source", "Created At", "Notes"];
            const csvRows = [
                headers.join(","),
                ...allLeads.map(l => [
                    l.id,
                    `"${l.name.replace(/"/g, '""')}"`,
                    l.phone,
                    `"${l.city.replace(/"/g, '""')}"`,
                    `"${l.plotSize.replace(/"/g, '""')}"`,
                    l.direction,
                    l.rooms,
                    l.status,
                    l.source,
                    l.createdAt,
                    `"${(l.notes || "").replace(/"/g, '""').replace(/\n/g, ' ')}"`
                ].join(","))
            ];

            const csvString = csvRows.join("\n");
            const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Failed to export leads:", error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Sidebar / Navigation */}
            <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <h1 className="text-2xl font-black tracking-tight text-foreground">
                            Vastu<span className="text-primary">Admin</span>
                        </h1>
                        <div className="hidden md:flex items-center gap-1 bg-background/50 p-1 rounded-lg border border-border">
                            <button className="px-4 py-1.5 bg-primary text-background rounded-md text-xs font-bold">Leads</button>
                            <button className="px-4 py-1.5 text-foreground/50 hover:text-foreground rounded-md text-xs font-bold">Analytics</button>
                            <button className="px-4 py-1.5 text-foreground/50 hover:text-foreground rounded-md text-xs font-bold">Settings</button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-success/10 border border-success/20 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                            <span className="text-[10px] font-bold text-success uppercase tracking-wider">Server Online</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-[1600px] mx-auto px-6 py-10">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard
                        title="Total Leads"
                        value={stats?.total || 0}
                        icon={Users}
                        color="primary"
                        trend="+12% from yesterday"
                    />
                    <StatCard
                        title="Pending Review"
                        value={stats?.pending || 0}
                        icon={AlertCircle}
                        color="warning"
                        trend="High priority leads"
                    />
                    <StatCard
                        title="AI Success Rate"
                        value={stats ? Math.round((stats.aiGenerated / (stats.total || 1)) * 100) : 0}
                        unit="%"
                        icon={TrendingUp}
                        color="success"
                        trend="VastuGPT performing well"
                    />
                    <StatCard
                        title="Manual Required"
                        value={stats?.manualRequired || 0}
                        icon={RefreshCw}
                        color="accent"
                        trend="Failed AI generates"
                    />
                </div>

                {/* Main Content Area */}
                <div className="bg-card border border-border rounded-[2.5rem] shadow-sm overflow-hidden min-h-[600px] flex flex-col">
                    {/* Header/Filters */}
                    <div className="p-8 border-b border-border flex flex-wrap items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-black text-foreground">Inbound Leads</h2>
                            <div className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase">Real-Time</div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                onClick={exportToExcel}
                                disabled={isExporting}
                                className="px-4 py-2.5 bg-success/10 text-success border border-success/20 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-success hover:text-white transition-all disabled:opacity-50"
                            >
                                {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                                Export Excel
                            </button>

                            <form onSubmit={handleSearch} className="relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/30" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search leads..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary w-[250px]"
                                />
                            </form>

                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2.5 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary"
                            >
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="contacted">Contacted</option>
                                <option value="completed">Completed</option>
                            </select>

                            <select
                                value={sourceFilter}
                                onChange={(e) => setSourceFilter(e.target.value)}
                                className="px-4 py-2.5 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary"
                            >
                                <option value="">All Sources</option>
                                <option value="ai_generated">AI Generated</option>
                                <option value="ai_failed">AI Failed</option>
                                <option value="direct">Direct Lead</option>
                            </select>

                            <button
                                onClick={() => { setPage(1); fetchLeads(); }}
                                className="p-2.5 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all"
                            >
                                <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-background/30 text-[10px] font-black text-foreground/40 uppercase tracking-widest border-b border-border">
                                    <th className="px-8 py-5">Lead / Contact</th>
                                    <th className="px-8 py-5">Property Specs</th>
                                    <th className="px-8 py-5">Source & Tech</th>
                                    <th className="px-8 py-5">Status</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <Loader2 className="text-primary animate-spin" size={32} />
                                                <span className="text-sm font-bold text-foreground/40 uppercase tracking-widest">Loading Leads...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : leads.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center text-foreground/40 font-medium">No leads found matching your criteria.</td>
                                    </tr>
                                ) : leads.map((lead) => (
                                    <tr key={lead.id} className="group hover:bg-primary/[0.02] transition-colors">
                                        <td className="px-8 py-6">
                                            <div>
                                                <div className="font-bold text-foreground mb-1">{lead.name}</div>
                                                <div className="flex items-center gap-3 text-xs text-foreground/50 font-medium">
                                                    <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-primary transition-colors">
                                                        <Phone size={12} /> {lead.phone}
                                                    </a>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar size={12} /> {new Date(lead.createdAt).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-2 text-xs font-bold text-foreground/80">
                                                    <ArrowUpRight size={12} className="text-primary" />
                                                    {lead.plotSize || "N/A"} • {lead.direction || "N/A"} Facing
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] text-foreground/50">
                                                    <MapPin size={10} /> {lead.city || "Unknown City"} • {lead.rooms || "No rooms specified"}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-2">
                                                <span className={cn(
                                                    "px-2 py-0.5 rounded-md text-[10px] font-black w-fit uppercase border",
                                                    lead.source === "ai_generated" ? "bg-success/10 text-success border-success/20" :
                                                        lead.source === "ai_failed" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                                            "bg-primary/10 text-primary border-primary/20"
                                                )}>
                                                    {lead.source.replace("_", " ")}
                                                </span>
                                                {lead.notes && (
                                                    <p className="text-[10px] text-foreground/40 max-w-[200px] truncate" title={lead.notes}>
                                                        {lead.notes}
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <select
                                                value={lead.status}
                                                onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                                className={cn(
                                                    "text-[10px] font-black px-3 py-1.5 rounded-full border outline-none cursor-pointer uppercase tracking-wider",
                                                    lead.status === "pending" ? "bg-amber-400 text-black border-amber-500" :
                                                        lead.status === "contacted" ? "bg-info text-white border-blue-600" :
                                                            "bg-success text-white border-green-600"
                                                )}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="contacted">Contacted</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 text-foreground/30">
                                                <button
                                                    onClick={() => setEditingLead({ ...lead })}
                                                    className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-all"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => setDeletingLead(lead)}
                                                    className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {pagination && pagination.totalPages > 1 && (
                        <div className="p-6 border-t border-border bg-background/30 flex items-center justify-between">
                            <span className="text-xs font-bold text-foreground/40">
                                Showing <span className="text-foreground">{leads.length}</span> of <span className="text-foreground">{pagination.total}</span> leads
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage(page - 1)}
                                    className="p-2 rounded-lg border border-border hover:border-primary disabled:opacity-30 disabled:hover:border-border transition-all"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                    const pageNum = i + 1;
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setPage(pageNum)}
                                            className={cn(
                                                "w-9 h-9 rounded-lg text-xs font-black transition-all",
                                                page === pageNum ? "bg-primary text-background shadow-lg shadow-primary/20" : "hover:bg-primary/10 text-foreground/60"
                                            )}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                {pagination.totalPages > 5 && <span className="text-foreground/20 px-2 font-black">...</span>}
                                <button
                                    disabled={page === pagination.totalPages}
                                    onClick={() => setPage(page + 1)}
                                    className="p-2 rounded-lg border border-border hover:border-primary disabled:opacity-30 disabled:hover:border-border transition-all"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Edit Modal */}
            {editingLead && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
                    <div className="bg-card border border-border w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="p-8 border-b border-border flex items-center justify-between bg-card">
                            <h3 className="text-xl font-black text-foreground">Edit Lead</h3>
                            <button onClick={() => setEditingLead(null)} className="p-2 hover:bg-foreground/5 rounded-full"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSaveEdit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <FormInput label="Name" value={editingLead.name} onChange={v => setEditingLead({ ...editingLead, name: v })} />
                                <FormInput label="Phone" value={editingLead.phone} onChange={v => setEditingLead({ ...editingLead, phone: v })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <FormInput label="City" value={editingLead.city} onChange={v => setEditingLead({ ...editingLead, city: v })} />
                                <FormInput label="Plot Size" value={editingLead.plotSize} onChange={v => setEditingLead({ ...editingLead, plotSize: v })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest mb-2 block">Direction</label>
                                    <select
                                        value={editingLead.direction}
                                        onChange={e => setEditingLead({ ...editingLead, direction: e.target.value })}
                                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary"
                                    >
                                        {["North", "South", "East", "West", "NE", "NW", "SE", "SW"].map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                                <FormInput label="Rooms" value={editingLead.rooms} onChange={v => setEditingLead({ ...editingLead, rooms: v })} />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest mb-2 block">Notes</label>
                                <textarea
                                    rows={4}
                                    value={editingLead.notes || ""}
                                    onChange={e => setEditingLead({ ...editingLead, notes: e.target.value })}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary resize-none"
                                />
                            </div>
                        </form>
                        <div className="p-8 border-t border-border flex gap-3 bg-card/50">
                            <button
                                type="button"
                                onClick={() => setEditingLead(null)}
                                className="flex-1 py-4 bg-background border border-border rounded-2xl font-black text-sm hover:border-primary/50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                disabled={isSaving}
                                className="flex-2 py-4 bg-primary text-background rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 min-w-[200px]"
                            >
                                {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {deletingLead && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
                    <div className="bg-card border border-border w-full max-w-sm rounded-[2.5rem] shadow-2xl p-10 text-center animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Trash2 size={40} className="text-red-500" />
                        </div>
                        <h3 className="text-2xl font-black text-foreground mb-4">Delete Lead?</h3>
                        <p className="text-foreground/50 text-sm mb-8">
                            Are you sure you want to delete <span className="text-foreground font-bold">{deletingLead.name}</span>? This action cannot be undone.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setDeletingLead(null)}
                                className="flex-1 py-4 bg-background border border-border rounded-2xl font-black text-sm"
                            >
                                No, Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isSaving}
                                className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black text-sm disabled:opacity-50"
                            >
                                {isSaving ? "Deleting..." : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatCard({ title, value, unit = "", icon: Icon, color, trend }: any) {
    const colorMap: any = {
        primary: "text-primary bg-primary/10 border-primary/20",
        success: "text-success bg-success/10 border-success/20",
        warning: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        accent: "text-accent bg-accent/10 border-accent/20"
    };

    return (
        <div className="bg-card p-6 rounded-[2rem] border border-border relative group overflow-hidden">
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none",
                color === 'primary' ? 'from-primary' : color === 'success' ? 'from-success' : 'from-accent')} />

            <div className="flex items-start justify-between mb-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border", colorMap[color])}>
                    <Icon size={24} />
                </div>
                <div className="px-2 py-1 rounded-full bg-foreground/5 text-foreground/40 text-[9px] font-black uppercase tracking-wider">Live</div>
            </div>

            <div className="relative">
                <div className="text-xs font-black text-foreground/40 uppercase tracking-widest mb-1">{title}</div>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-foreground tabular-nums">{value}</span>
                    <span className="text-sm font-bold text-foreground/30">{unit}</span>
                </div>
                <p className="mt-2 text-[10px] font-bold text-foreground/40 flex items-center gap-1">
                    {trend}
                </p>
            </div>
        </div>
    );
}

function FormInput({ label, value, onChange, type = "text" }: { label: string, value: string, onChange: (v: string) => void, type?: string }) {
    return (
        <div>
            <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest mb-2 block">{label}</label>
            <input
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary transition-all"
            />
        </div>
    );
}
