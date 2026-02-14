"use client";

import { useLanguage, Language } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

export default function LanguageSwitcher({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
    const { language, setLanguage } = useLanguage();

    const languages = [
        { code: "en", label: "EN", full: "English" },
        { code: "hi", label: "हि", full: "Hindi" },
        { code: "mr", label: "म", full: "Marathi" },
    ];

    if (variant === "mobile") {
        return (
            <div className="flex items-center gap-1 bg-card/50 border border-border p-1 rounded-xl">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code as Language)}
                        className={cn(
                            "w-8 h-8 flex items-center justify-center text-[10px] font-black rounded-lg transition-all",
                            language === lang.code
                                ? "bg-primary text-background shadow-sm"
                                : "text-foreground/40 hover:text-foreground"
                        )}
                        aria-label={`Switch to ${lang.full}`}
                    >
                        {lang.label}
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div className="flex items-center gap-1 bg-card/50 border border-border p-1 rounded-xl">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={cn(
                        "px-2.5 py-1 text-[10px] font-black rounded-lg transition-all",
                        language === lang.code
                            ? "bg-primary text-background shadow-lg shadow-primary/20 scale-105"
                            : "text-foreground/40 hover:text-foreground hover:bg-foreground/5"
                    )}
                    aria-label={`Switch to ${lang.full}`}
                >
                    {lang.label}
                </button>
            ))}
        </div>
    );
}
