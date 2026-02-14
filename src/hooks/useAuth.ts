"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { User, Role, AUTH_KEYS, PORTAL_ROUTES } from "@/lib/types";

interface AuthState {
    user: User | null;
    role: Role | null;
    isLoading: boolean;
}

export function useAuth() {
    const [state, setState] = useState<AuthState>({
        user: null,
        role: null,
        isLoading: true,
    });
    const router = useRouter();

    const checkAuth = useCallback(() => {
        // SSR Safety
        if (typeof window === "undefined") return;

        try {
            const adminStr = localStorage.getItem(AUTH_KEYS.ADMIN);
            const contractorStr = localStorage.getItem(AUTH_KEYS.CONTRACTOR);
            const clientStr = localStorage.getItem(AUTH_KEYS.CLIENT);

            let userData: User | null = null;
            let userRole: Role | null = null;

            if (adminStr) {
                userData = JSON.parse(adminStr);
                userRole = "admin";
            } else if (contractorStr) {
                userData = JSON.parse(contractorStr);
                userRole = "contractor";
            } else if (clientStr) {
                userData = JSON.parse(clientStr);
                userRole = "client";
            }

            setState({
                user: userData,
                role: userRole,
                isLoading: false,
            });
        } catch (error) {
            console.error("Auth hydration failed:", error);
            setState({ user: null, role: null, isLoading: false });
        }
    }, []);

    useEffect(() => {
        checkAuth();

        const handleStorageChange = (e: StorageEvent) => {
            const keys = Object.values(AUTH_KEYS);
            if (keys.includes(e.key as any)) {
                checkAuth();
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [checkAuth]);

    const logout = (role: Role) => {
        const key = role === "admin" ? AUTH_KEYS.ADMIN : role === "contractor" ? AUTH_KEYS.CONTRACTOR : AUTH_KEYS.CLIENT;
        localStorage.removeItem(key);

        setState({
            user: null,
            role: null,
            isLoading: false,
        });

        switch (role) {
            case "admin": router.push(PORTAL_ROUTES.ADMIN); break;
            case "contractor": router.push(PORTAL_ROUTES.CONTRACTOR_LOGIN); break;
            case "client": router.push(PORTAL_ROUTES.CLIENT_LOGIN); break;
        }
    };

    return {
        ...state,
        logout,
        refresh: checkAuth,
    };
}
