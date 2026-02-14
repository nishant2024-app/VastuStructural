"use client";

import AdminSidebar from "./AdminSidebar";
import AuthGuard from "@/components/auth/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { role, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 size={40} className="text-primary animate-spin" />
            </div>
        );
    }

    return (
        <AuthGuard allowedRoles={["admin"]}>
            <div className="min-h-screen bg-background flex">
                <AdminSidebar />
                <main className="ml-64 flex-1">
                    {children}
                </main>
            </div>
        </AuthGuard>
    );
}
