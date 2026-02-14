"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Role, PORTAL_ROUTES } from "@/lib/types";

interface AuthGuardProps {
    children: React.ReactNode;
    allowedRoles: Role[];
    redirectTo?: string;
}

export default function AuthGuard({ children, allowedRoles, redirectTo }: AuthGuardProps) {
    const { role, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!role) {
                // Not logged in
                const defaultRedirect = allowedRoles.includes("admin")
                    ? PORTAL_ROUTES.ADMIN
                    : allowedRoles.includes("contractor")
                        ? PORTAL_ROUTES.CONTRACTOR_LOGIN
                        : PORTAL_ROUTES.CLIENT_LOGIN;

                router.push(redirectTo || defaultRedirect);
            } else if (!allowedRoles.includes(role)) {
                // Logged in but wrong role
                router.push("/");
            }
        }
    }, [role, isLoading, allowedRoles, redirectTo, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!role || !allowedRoles.includes(role)) {
        return null; // Will redirect in useEffect
    }

    return <>{children}</>;
}
