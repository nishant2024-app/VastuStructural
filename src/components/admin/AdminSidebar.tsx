"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, Package, Building2, Users,
    Settings, LogOut, Hexagon, ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const menuItems = [
    { label: "Overview", icon: LayoutDashboard, href: "/admin/dashboard" },
    { label: "Projects", icon: Package, href: "/admin/projects" },
    { label: "Partners", icon: ShieldCheck, href: "/admin/partners" },
    { label: "Clients", icon: Users, href: "/admin/clients" },
    { label: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <aside className="w-64 bg-card border-r border-border flex flex-col fixed h-screen z-50">
            {/* Logo Section */}
            <div className="p-6">
                <Link href="/admin/dashboard" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Hexagon size={20} className="text-background" />
                    </div>
                    <div>
                        <h1 className="text-lg font-black text-foreground">
                            VASTU<span className="text-primary">ADMIN</span>
                        </h1>
                        <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-wider">Management Center</p>
                    </div>
                </Link>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar pt-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all group",
                                isActive
                                    ? "bg-primary text-background shadow-[0_10px_20px_-5px_rgba(56,189,248,0.3)]"
                                    : "text-foreground/50 hover:text-foreground hover:bg-foreground/[0.03]"
                            )}
                        >
                            <item.icon size={20} className={cn("transition-transform group-hover:scale-110", isActive ? "" : "text-foreground/30 group-hover:text-primary")} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-border">
                <div className="p-4 rounded-2xl bg-foreground/[0.02] border border-border/50 mb-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                            AD
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-bold text-foreground truncate">Admin User</p>
                            <p className="text-[10px] text-foreground/40 truncate">Master Access</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => logout("admin")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-foreground/40 hover:text-error hover:bg-error/10 transition-all group"
                >
                    <LogOut size={20} className="transition-transform group-hover:-translate-x-1" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
