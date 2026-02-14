"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import VastuAIChat from "@/components/ai/VastuAIChat";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Routes that should NOT show the public Navbar and Footer
    const dedicatedRoutes = ["/admin", "/client-portal", "/contractor-portal"];

    // Check if the current path starts with any of the dedicated routes
    // But allow /client-portal/login and /contractor-portal/login to show navbar?
    // Actually, usually login pages also don't show the full nav if they are "dedicated".
    // Let's stick to the requirement: "when admin login no need footer and navbar which show in website"

    const isDedicated = dedicatedRoutes.some(route => pathname.startsWith(route));

    if (isDedicated) {
        return <>{children}</>;
    }

    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <VastuAIChat />
        </>
    );
}
