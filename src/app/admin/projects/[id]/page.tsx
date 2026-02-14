"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft, Package, User, Phone, Mail, MapPin, Building2,
    Clock, CheckCircle2, AlertCircle, Send, Upload, Download,
    Calendar, IndianRupee, FileText, MessageSquare, UserPlus,
    Truck, Edit2, Save, X, Loader2, MoreVertical, Trash2, Check, ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import AdminLayout from "@/components/admin/AdminLayout";
import { MockDB } from "@/lib/mockData";
import {
    statusConfig, allStatuses, formatPrice, formatDateTime,
    type Project, type ProjectStatus, type Deliverable, type ProjectUpdate, type Contractor
} from "@/lib/types";

export default function AdminProjectDetailPage() {
    const params = useParams();
    const router = useRouter();
    const projectId = params.id as string;

    const [project, setProject] = useState<Project | null>(null);
    const [contractors, setContractors] = useState<Contractor[]>([]);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedContractor, setSelectedContractor] = useState<string | null>(null);
    const [updateMessage, setUpdateMessage] = useState("");
    const [newStatus, setNewStatus] = useState<ProjectStatus | "">("");
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const data = MockDB.getProjectById(projectId);
        if (data) {
            setProject(data);
            setContractors(MockDB.getContractors().filter(c => c.status === "approved"));
        } else {
            router.push("/admin/projects");
        }
        setIsLoading(false);
    }, [projectId, router]);

    if (isLoading || !project) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Loader2 size={40} className="text-primary animate-spin" />
                </div>
            </AdminLayout>
        );
    }

    const handleAssignContractor = () => {
        if (!selectedContractor || !project) return;

        const contractor = contractors.find(c => c.id === selectedContractor);
        if (!contractor) return;

        const newUpdate: ProjectUpdate = {
            id: `upd_${Date.now()}`,
            projectId: project.id,
            status: "contractor_assigned",
            message: `Contractor ${contractor.name} from ${contractor.company} has been assigned to this project.`,
            createdAt: new Date(),
            createdBy: "admin",
        };

        const updatedProject = {
            ...project,
            status: "contractor_assigned" as ProjectStatus,
            assignedContractorId: selectedContractor,
            updates: [...project.updates, newUpdate],
        };

        MockDB.updateProject(project.id, updatedProject);
        setProject(updatedProject);
        setShowAssignModal(false);
        setSelectedContractor(null);
    };

    const handleAddUpdate = () => {
        if (!updateMessage.trim() || !project) return;

        const finalStatus = (newStatus || project.status) as ProjectStatus;
        const newUpdate: ProjectUpdate = {
            id: `upd_${Date.now()}`,
            projectId: project.id,
            status: finalStatus,
            message: updateMessage,
            createdAt: new Date(),
            createdBy: "admin",
        };

        const updatedProject = {
            ...project,
            status: finalStatus,
            updates: [...project.updates, newUpdate],
        };

        MockDB.updateProject(project.id, updatedProject);
        setProject(updatedProject);
        setShowUpdateModal(false);
        setUpdateMessage("");
        setNewStatus("");
    };

    const handleQuickStatusChange = (status: ProjectStatus) => {
        if (!project) return;

        const newUpdate: ProjectUpdate = {
            id: `upd_${Date.now()}`,
            projectId: project.id,
            status: status,
            message: `Manual Status override: ${statusConfig[status].label}`,
            createdAt: new Date(),
            createdBy: "admin",
        };

        const updatedProject = {
            ...project,
            status: status,
            updates: [...project.updates, newUpdate],
        };

        MockDB.updateProject(project.id, updatedProject);
        setProject(updatedProject);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!project) return;
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        const newDeliverable: Deliverable = {
            id: `del_${Date.now()}`,
            projectId: project.id,
            name: file.name,
            type: file.name.endsWith(".pdf") ? "pdf" : "document",
            url: "#",
            size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            uploadedAt: new Date(),
            uploadedBy: "admin",
        };

        const updatedProject = {
            ...project,
            deliverables: [...project.deliverables, newDeliverable],
            updates: [...project.updates, {
                id: `upd_${Date.now()}_file`,
                projectId: project.id,
                status: project.status,
                message: `Uploaded new asset: ${file.name}`,
                createdAt: new Date(),
                createdBy: "admin"
            } as ProjectUpdate]
        };

        MockDB.updateProject(project.id, updatedProject);
        setProject(updatedProject);
        setIsUploading(false);
    };

    const assignedContractor = contractors.find(c => c.id === project.assignedContractorId);

    return (
        <AdminLayout>
            <div className="p-8 max-w-7xl mx-auto">
                {/* Navigation Header */}
                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex flex-col gap-4">
                        <Link
                            href="/admin/projects"
                            className="inline-flex items-center gap-2 text-foreground/30 hover:text-primary transition-all font-black text-[10px] uppercase tracking-[0.2em] group"
                        >
                            <div className="p-1.5 rounded-lg border border-border group-hover:border-primary transition-colors">
                                <ArrowLeft size={14} />
                            </div>
                            Return to Global Archive
                        </Link>

                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                                <Package size={32} />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h1 className="text-4xl font-black text-foreground tracking-tighter uppercase">{project.orderId}</h1>
                                    <span className={cn(
                                        "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm",
                                        statusConfig[project.status].color,
                                        statusConfig[project.status].bgColor
                                    )}>
                                        {statusConfig[project.status].label}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-[10px] font-black text-foreground/30 uppercase tracking-widest leading-none">
                                    <span className="flex items-center gap-1.5 border-r border-border pr-4">
                                        <Calendar size={12} className="text-foreground/20" />
                                        Logged: {new Date(project.createdAt).toLocaleDateString()}
                                    </span>
                                    <span className="flex items-center gap-1.5 border-r border-border pr-4">
                                        <IndianRupee size={12} className="text-foreground/20" />
                                        Value: {formatPrice(project.amount)}
                                    </span>
                                    <span className="text-primary font-black">{project.planName} Archive</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowUpdateModal(true)}
                            className="flex items-center gap-3 px-6 py-4 bg-card border border-border rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-primary hover:shadow-lg transition-all"
                        >
                            <MessageSquare size={18} className="text-primary" />
                            Dispatch Progress Update
                        </button>
                        {!project.assignedContractorId && (
                            <button
                                onClick={() => setShowAssignModal(true)}
                                className="flex items-center gap-3 px-6 py-4 bg-primary text-background rounded-2xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-primary/20"
                            >
                                <UserPlus size={18} />
                                Assign Regional Partner
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Primary Info Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Summary Cards */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Customer Profile */}
                            <div className="bg-card rounded-3xl border border-border p-8 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 transition-all group-hover:bg-primary/10" />
                                <h3 className="text-xs font-black text-foreground/40 mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <User size={16} className="text-primary" />
                                    Customer Profile
                                </h3>
                                <div className="space-y-5">
                                    <div>
                                        <p className="text-[10px] font-black text-foreground/20 uppercase tracking-widest mb-1">Full Legal Name</p>
                                        <p className="text-xl font-black text-foreground uppercase tracking-tight">{project.customerName}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[10px] font-black text-foreground/20 uppercase tracking-widest mb-1">Mobile Channel</p>
                                            <a href={`tel:${project.customerPhone}`} className="text-sm font-black text-primary hover:underline">{project.customerPhone}</a>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-foreground/20 uppercase tracking-widest mb-1">Official Email</p>
                                            <a href={`mailto:${project.customerEmail}`} className="text-sm font-black text-primary hover:underline truncate block">{project.customerEmail}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Property Matrix */}
                            <div className="bg-card rounded-3xl border border-border p-8 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -mr-16 -mt-16 transition-all group-hover:bg-accent/10" />
                                <h3 className="text-xs font-black text-foreground/40 mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <MapPin size={16} className="text-accent" />
                                    Property Matrix
                                </h3>
                                <div className="grid grid-cols-2 gap-y-5 gap-x-8">
                                    <div>
                                        <p className="text-[10px] font-black text-foreground/20 uppercase tracking-widest mb-1">Surface Area</p>
                                        <p className="text-sm font-black text-foreground uppercase">{project.plotDetails.plotSize}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-foreground/20 uppercase tracking-widest mb-1">Vector Orientation</p>
                                        <p className="text-sm font-black text-foreground uppercase">{project.plotDetails.direction}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-foreground/20 uppercase tracking-widest mb-1">Dimensions</p>
                                        <p className="text-sm font-black text-foreground uppercase">{project.plotDetails.plotDimensions}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-foreground/20 uppercase tracking-widest mb-1">Vertical Levels</p>
                                        <p className="text-sm font-black text-foreground uppercase">{project.plotDetails.floors} FLOORS</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Customer Directives */}
                        <div className="bg-card rounded-3xl border border-border p-8">
                            <h3 className="text-xs font-black text-foreground/40 mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                                <FileText size={16} className="text-secondary" />
                                Internal Directives & Requirements
                            </h3>
                            <div className="p-6 bg-background/50 border border-border rounded-2xl">
                                <p className="text-sm font-bold text-foreground/70 leading-relaxed italic">
                                    "{project.plotDetails.requirements}"
                                </p>
                            </div>
                        </div>

                        {/* Operations Console */}
                        <div className="bg-card rounded-3xl border border-border overflow-hidden">
                            <div className="p-8 border-b border-border bg-foreground/[0.01]">
                                <h3 className="text-xs font-black text-foreground/40 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Truck size={16} className="text-primary" />
                                    Operations Console: Global Status Override
                                </h3>
                            </div>
                            <div className="p-8 flex flex-wrap gap-2">
                                {allStatuses.map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => handleQuickStatusChange(status)}
                                        disabled={status === project.status}
                                        className={cn(
                                            "px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                            status === project.status
                                                ? "bg-primary text-background shadow-lg shadow-primary/20 cursor-default"
                                                : "bg-background border border-border text-foreground/30 hover:border-primary/40 hover:text-foreground"
                                        )}
                                    >
                                        {statusConfig[status].label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Activity Log */}
                        <div className="bg-card rounded-3xl border border-border p-8">
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-xs font-black text-foreground/40 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Clock size={16} className="text-primary" />
                                    Project Activity Log
                                </h3>
                            </div>
                            <div className="relative space-y-12 before:absolute before:inset-0 before:left-3 before:w-px before:bg-border before:z-0">
                                {project.updates.slice().reverse().map((update, idx) => (
                                    <div key={update.id} className="relative z-10 flex gap-8 pl-1">
                                        <div className={cn(
                                            "w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border-2",
                                            idx === 0 ? "bg-primary border-primary shadow-lg shadow-primary/20" : "bg-card border-border shadow-sm text-foreground/20"
                                        )}>
                                            {idx === 0 ? <Check size={14} className="text-background" /> : <div className="w-1 h-1 rounded-full bg-current" />}
                                        </div>
                                        <div className="flex-1 -mt-1">
                                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                                <span className={cn(
                                                    "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest",
                                                    statusConfig[update.status].color,
                                                    statusConfig[update.status].bgColor
                                                )}>
                                                    {statusConfig[update.status].label}
                                                </span>
                                                <span className="text-[10px] font-black text-foreground/20 uppercase tracking-tighter italic">
                                                    {formatDateTime(new Date(update.createdAt))}
                                                </span>
                                                <span className="px-2 py-0.5 rounded bg-foreground/5 text-[9px] font-black text-foreground/40 uppercase tracking-widest">
                                                    ID: {update.createdBy}
                                                </span>
                                            </div>
                                            <p className="text-sm font-bold text-foreground/70 leading-relaxed bg-foreground/[0.02] p-4 rounded-2xl border border-border/50">{update.message}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Secondary Management Column */}
                    <div className="space-y-8">
                        {/* Regional Partner Manager */}
                        <div className="bg-card rounded-3xl border border-border p-8">
                            <h3 className="text-xs font-black text-foreground/40 mb-8 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Building2 size={16} className="text-primary" />
                                Regional Partner
                            </h3>
                            {assignedContractor ? (
                                <div className="space-y-6">
                                    <div className="p-6 bg-background rounded-2xl border border-border/50 flex flex-col items-center text-center group">
                                        <div className="w-20 h-20 rounded-[2rem] bg-accent/10 flex items-center justify-center text-accent font-black text-2xl mb-4 group-hover:rotate-12 transition-transform shadow-inner">
                                            {assignedContractor.name.charAt(0)}
                                        </div>
                                        <p className="font-black text-foreground uppercase tracking-wider">{assignedContractor.name}</p>
                                        <p className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em] mb-4">{assignedContractor.company}</p>
                                        <div className="flex items-center gap-2 p-2 px-4 bg-accent/5 rounded-full border border-accent/10">
                                            <ShieldCheck size={14} className="text-accent" />
                                            <span className="text-[9px] font-black text-accent uppercase tracking-widest">Verified Partner</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowAssignModal(true)}
                                        className="w-full py-4 border border-border rounded-2xl font-black text-[10px] uppercase tracking-widest text-foreground/40 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
                                    >
                                        <Edit2 size={14} />
                                        Re-Allocate Partner
                                    </button>
                                </div>
                            ) : (
                                <div className="p-10 text-center border-2 border-dashed border-border rounded-3xl bg-foreground/[0.01]">
                                    <div className="w-16 h-16 rounded-full bg-warning/5 flex items-center justify-center mx-auto mb-6">
                                        <UserPlus size={24} className="text-warning/20" />
                                    </div>
                                    <p className="text-[10px] font-black text-warning/40 uppercase tracking-[0.2em] mb-6 leading-relaxed">System requires regional partner allocation</p>
                                    <button
                                        onClick={() => setShowAssignModal(true)}
                                        className="w-full py-4 bg-warning text-background rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-warning/20 hover:scale-[1.02] transition-transform"
                                    >
                                        Allocate Resources
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Deliverables Vault */}
                        <div className="bg-card rounded-3xl border border-border p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xs font-black text-foreground/40 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Upload size={16} className="text-primary" />
                                    Deliverables Vault
                                </h3>
                                <label className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-background cursor-pointer transition-all shadow-sm">
                                    <Upload size={16} />
                                    <input type="file" className="hidden" onChange={handleFileUpload} />
                                </label>
                            </div>

                            <div className="space-y-4">
                                {project.deliverables.map((file) => (
                                    <div key={file.id} className="p-4 bg-background border border-border rounded-2xl hover:border-primary/30 transition-all flex items-center gap-4 group">
                                        <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                            <FileText size={18} className="text-foreground/20 group-hover:text-primary transition-colors" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[11px] font-black text-foreground uppercase truncate group-hover:text-primary transition-colors">{file.name}</p>
                                            <p className="text-[9px] font-black text-foreground/20 uppercase mt-0.5 tracking-tighter">{file.size} • PDF ENCRYPTED</p>
                                        </div>
                                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground/20 hover:text-primary hover:bg-primary/5 transition-all">
                                            <Download size={14} />
                                        </button>
                                    </div>
                                ))}

                                {isUploading && (
                                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl animate-pulse flex items-center gap-4">
                                        <Loader2 size={18} className="text-primary animate-spin" />
                                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">Encrypting Upload...</p>
                                    </div>
                                )}

                                {project.deliverables.length === 0 && !isUploading && (
                                    <div className="p-10 text-center border-2 border-dashed border-border rounded-3xl opacity-20">
                                        <Package size={32} className="mx-auto mb-2" />
                                        <p className="text-[9px] font-black uppercase tracking-widest">Vault Empty</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals - Implementing with professional overlays */}
            {showAssignModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/90 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="w-full max-w-lg bg-card rounded-[2.5rem] border border-border p-10 shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">Allocate Resource</h3>
                                <p className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em] mt-1">Operational Network Pool</p>
                            </div>
                            <button onClick={() => setShowAssignModal(false)} className="p-3 rounded-2xl hover:bg-foreground/5 text-foreground/20 hover:text-foreground">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-3 mb-10 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
                            {contractors.map((contractor) => (
                                <button
                                    key={contractor.id}
                                    onClick={() => setSelectedContractor(contractor.id)}
                                    className={cn(
                                        "w-full p-6 rounded-2xl border text-left transition-all flex items-center justify-between group",
                                        selectedContractor === contractor.id
                                            ? "border-primary bg-primary/5 shadow-inner"
                                            : "border-border hover:border-primary/30"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all shadow-sm",
                                            selectedContractor === contractor.id ? "bg-primary text-background" : "bg-foreground/5 text-foreground/20 group-hover:bg-primary/10 group-hover:text-primary"
                                        )}>
                                            {contractor.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-black text-foreground uppercase tracking-wider">{contractor.name}</p>
                                            <p className="text-[9px] font-black text-foreground/30 uppercase tracking-widest">{contractor.company} • {contractor.district}</p>
                                        </div>
                                    </div>
                                    {selectedContractor === contractor.id && <CheckCircle2 size={24} className="text-primary" />}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleAssignContractor}
                            disabled={!selectedContractor}
                            className={cn(
                                "w-full py-5 rounded-[1.5rem] font-black flex items-center justify-center gap-3 uppercase text-[10px] tracking-[0.3em] transition-all shadow-2xl",
                                selectedContractor
                                    ? "bg-primary text-background shadow-primary/30 active:scale-[0.98]"
                                    : "bg-border text-foreground/20 cursor-not-allowed"
                            )}
                        >
                            <ShieldCheck size={20} />
                            Confirm Allocation
                        </button>
                    </div>
                </div>
            )}

            {showUpdateModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/90 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="w-full max-w-lg bg-card rounded-[2.5rem] border border-border p-10 shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">Progress Dispatch</h3>
                                <p className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em] mt-1">Operational Lifecycle Log</p>
                            </div>
                            <button onClick={() => setShowUpdateModal(false)} className="p-3 rounded-2xl hover:bg-foreground/5 text-foreground/20 hover:text-foreground">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-8 mb-10">
                            <div>
                                <label className="block text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] mb-3">
                                    Override Lifecycle Status
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <select
                                        value={newStatus}
                                        onChange={(e) => setNewStatus(e.target.value as ProjectStatus | "")}
                                        className="col-span-2 w-full px-6 py-4 bg-background border border-border rounded-2xl text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">Maintain Current Identity</option>
                                        {allStatuses.map((status) => (
                                            <option key={status} value={status}>
                                                SET PHASE: {statusConfig[status].label.toUpperCase()}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] mb-3">
                                    Operational Message Dispatch *
                                </label>
                                <textarea
                                    value={updateMessage}
                                    onChange={(e) => setUpdateMessage(e.target.value)}
                                    placeholder="ENTER OPERATIONAL LOG DATA..."
                                    rows={5}
                                    className="w-full px-6 py-5 bg-background border border-border rounded-3xl text-sm font-bold text-foreground placeholder:text-foreground/10 focus:outline-none focus:border-primary transition-all resize-none shadow-inner uppercase font-mono"
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleAddUpdate}
                            disabled={!updateMessage.trim()}
                            className={cn(
                                "w-full py-5 rounded-[1.5rem] font-black flex items-center justify-center gap-3 uppercase text-[10px] tracking-[0.3em] transition-all shadow-2xl",
                                updateMessage.trim()
                                    ? "bg-primary text-background shadow-primary/30 active:scale-[0.98]"
                                    : "bg-border text-foreground/20 cursor-not-allowed"
                            )}
                        >
                            <Send size={20} />
                            Transmit Update
                        </button>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
