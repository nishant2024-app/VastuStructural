"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Bell, Check, Trash2, ExternalLink, Clock, Package, FileText, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Notification, type NotificationType } from "@/lib/types";

const mockNotifications: Notification[] = [
    {
        id: "1",
        userId: "client_1",
        type: "status_change",
        title: "Project Status Updated",
        message: "Your project #VSABC123 is now in Design in Progress.",
        link: "/client-portal/projects/VSABC123",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    },
    {
        id: "2",
        userId: "client_1",
        type: "deliverable_ready",
        title: "New Deliverable Ready",
        message: "Your Initial Floor Plan is ready for download.",
        link: "/client-portal/projects/VSABC123",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
];

const typeIcons: Record<NotificationType, any> = {
    status_change: Package,
    new_message: FileText,
    deliverable_ready: Check,
    system: AlertCircle,
};

const getTimeAgo = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const mins = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (mins > 0) return `${mins}m ago`;
    return "just now";
};

export default function NotificationCenter() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load notifications (mock)
        setNotifications(mockNotifications);

        // Click outside to close
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const markRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const deleteNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-xl hover:bg-foreground/5 transition-colors"
                aria-label="Toggle notifications"
                aria-expanded={isOpen}
            >
                <Bell size={20} className="text-foreground/70" />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-background text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-background">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-[350px] bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                >
                    <div className="p-4 border-b border-border flex items-center justify-between">
                        <h3 className="font-bold text-foreground">Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllRead}
                                className="text-xs text-primary font-bold hover:underline"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                        {notifications.length > 0 ? (
                            <div className="divide-y divide-border">
                                {notifications.map((n) => {
                                    const Icon = typeIcons[n.type];
                                    return (
                                        <div
                                            key={n.id}
                                            className={cn(
                                                "p-4 hover:bg-foreground/[0.02] transition-colors relative group",
                                                !n.read && "bg-primary/[0.02]"
                                            )}
                                        >
                                            <div className="flex gap-3">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                                                    !n.read ? "bg-primary/10 text-primary" : "bg-foreground/5 text-foreground/40"
                                                )}>
                                                    <Icon size={18} />
                                                </div>
                                                <div className="flex-1 min-w-0 pr-8">
                                                    <div className="flex items-center justify-between mb-0.5">
                                                        <span className={cn(
                                                            "font-bold text-sm truncate",
                                                            !n.read ? "text-foreground" : "text-foreground/60"
                                                        )}>
                                                            {n.title}
                                                        </span>
                                                        <span className="text-[10px] text-foreground/40 flex items-center gap-1">
                                                            <Clock size={10} />
                                                            {getTimeAgo(n.createdAt)}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-foreground/60 line-clamp-2 mb-2">
                                                        {n.message}
                                                    </p>
                                                    {n.link && (
                                                        <Link
                                                            href={n.link}
                                                            onClick={() => {
                                                                markRead(n.id);
                                                                setIsOpen(false);
                                                            }}
                                                            className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline"
                                                        >
                                                            View Details
                                                            <ExternalLink size={10} />
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="absolute right-2 top-4 hidden group-hover:flex items-center gap-1">
                                                {!n.read && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            markRead(n.id);
                                                        }}
                                                        className="p-1.5 rounded-lg bg-card border border-border text-foreground/40 hover:text-primary transition-all"
                                                        title="Mark as read"
                                                    >
                                                        <Check size={14} />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteNotification(n.id);
                                                    }}
                                                    className="p-1.5 rounded-lg bg-card border border-border text-foreground/40 hover:text-error transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="p-8 text-center">
                                <Bell size={40} className="mx-auto mb-3 text-foreground/10" />
                                <p className="text-sm font-bold text-foreground/30">No new notifications</p>
                            </div>
                        )}
                    </div>

                    <div className="p-3 border-t border-border bg-foreground/[0.01] text-center">
                        <Link
                            href="/notifications"
                            className="text-xs font-bold text-foreground/40 hover:text-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            View All Notifications
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
