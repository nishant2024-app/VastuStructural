"use client";

import {
    Settings, User, Lock, Bell, Global,
    Shield, Palette, Database, Save, ArrowRight
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { cn } from "@/lib/utils";

export default function AdminSettingsPage() {
    return (
        <AdminLayout>
            <div className="p-8 max-w-4xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-foreground tracking-tighter uppercase">Settings</h1>
                    <p className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.3em] mt-1">System & Access Configuration</p>
                </div>

                <div className="space-y-6">
                    {/* Profile Section */}
                    <div className="bg-card rounded-3xl border border-border overflow-hidden">
                        <div className="p-8 border-b border-border bg-foreground/[0.01] flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                                <User size={24} />
                            </div>
                            <div>
                                <h3 className="font-black text-foreground uppercase tracking-wider">Administrative Profile</h3>
                                <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">Master Credentials</p>
                            </div>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-black text-foreground/40 uppercase tracking-widest mb-2">Display Name</label>
                                    <input type="text" defaultValue="Administrator" className="w-full px-5 py-3 bg-background border border-border rounded-xl text-sm font-bold focus:border-primary focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-foreground/40 uppercase tracking-widest mb-2">Access Level</label>
                                    <input type="text" defaultValue="Root Authority" disabled className="w-full px-5 py-3 bg-foreground/5 border border-border rounded-xl text-sm font-black uppercase text-foreground/20" />
                                </div>
                            </div>
                            <button className="px-6 py-3 bg-foreground text-background rounded-2xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 transition-all flex items-center gap-2">
                                <Save size={14} />
                                Synchronize Profile
                            </button>
                        </div>
                    </div>

                    {/* Security Section */}
                    <div className="bg-card rounded-3xl border border-border overflow-hidden">
                        <div className="p-8 border-b border-border bg-foreground/[0.01] flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-error/10 flex items-center justify-center text-error shadow-inner">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h3 className="font-black text-foreground uppercase tracking-wider">Security Protocols</h3>
                                <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">Authentication & Authorization</p>
                            </div>
                        </div>
                        <div className="p-8">
                            <button className="flex items-center justify-between w-full p-6 bg-foreground/[0.02] border border-dashed border-border rounded-2xl group hover:border-primary/50 transition-all">
                                <div className="text-left">
                                    <p className="font-black text-foreground text-xs uppercase tracking-widest">Multi-Factor Authentication</p>
                                    <p className="text-[10px] font-black text-foreground/30 uppercase mt-1">Status: DEACTIVATED</p>
                                </div>
                                <ArrowRight size={20} className="text-foreground/10 group-hover:translate-x-1 group-hover:text-primary transition-all" />
                            </button>
                        </div>
                    </div>

                    {/* Appearance Section */}
                    <div className="bg-card rounded-3xl border border-border overflow-hidden">
                        <div className="p-8 border-b border-border bg-foreground/[0.01] flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shadow-inner">
                                <Palette size={24} />
                            </div>
                            <div>
                                <h3 className="font-black text-foreground uppercase tracking-wider">Interface Matrix</h3>
                                <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">Theming & Dynamics</p>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex items-center gap-4">
                                <div className="flex-1 p-4 rounded-2xl border-2 border-primary bg-primary/5 text-primary text-center">
                                    <p className="font-black text-[10px] uppercase tracking-widest">Dark Adaptive</p>
                                </div>
                                <div className="flex-1 p-4 rounded-2xl border border-border text-foreground/20 text-center opacity-50 cursor-not-allowed">
                                    <p className="font-black text-[10px] uppercase tracking-widest">Light (Legacy)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
