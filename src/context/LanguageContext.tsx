"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export type Language = "en" | "hi" | "mr";

interface Translations {
    [key: string]: {
        [lang in Language]: string;
    };
}

const translations: Translations = {
    hero_title: {
        en: "Professional Structural Plans in 48 Hours",
        hi: "48 घंटों में पेशेवर स्ट्रक्चरल प्लान",
        mr: "48 तासांत व्यावसायिक स्ट्रक्चरल प्लॅन्स",
    },
    hero_subtitle: {
        en: "Get Vastu-compliant 2D floor plans and structural designs from certified engineers. Fast, reliable, and affordable.",
        hi: "प्रमाणित इंजीनियरों से वास्तु-अनुरूप 2D फ्लोर प्लान और स्ट्रक्चरल डिज़ाइन प्राप्त करें। तेज़, विश्वसनीय और सस्ता।",
        mr: "प्रमाणित इंजिनीअर्सकडून वास्तू-सुसंगत 2D फ्लोअर प्लॅन आणि स्ट्रक्चरल डिझाइन मिळवा. जलद, विश्वासार्ह आणि स्वस्त.",
    },
    btn_get_started: {
        en: "Get Started",
        hi: "शुरू करें",
        mr: "सुरुवात करा",
    },
    nav_home: {
        en: "Home",
        hi: "होम",
        mr: "होम",
    },
    nav_services: {
        en: "Services",
        hi: "सेवाएं",
        mr: "सेवा",
    },
    nav_calculator: {
        en: "Calculator",
        hi: "कैलकुलेटर",
        mr: "कॅल्क्युलेटर",
    },
    nav_shop: {
        en: "Shop",
        hi: "शॉप",
        mr: "शॉप",
    },
    nav_about: {
        en: "About",
        hi: "हमारे बारे में",
        mr: "आमच्याबद्दल",
    },
    nav_client_login: {
        en: "Client Login",
        hi: "ग्राहक लॉगिन",
        mr: "ग्राहक लॉगिन",
    },
    nav_contractor: {
        en: "Contractor",
        hi: "ठेकेदार",
        mr: "कंत्राटदार",
    },
    nav_my_dashboard: {
        en: "My Dashboard",
        hi: "मेरा डैशबोर्ड",
        mr: "माझा डॅशबोर्ड",
    },
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en");
    const [hasHydrated, setHasHydrated] = useState(false);

    useEffect(() => {
        const savedLang = localStorage.getItem("language") as Language;
        if (savedLang && ["en", "hi", "mr"].includes(savedLang)) {
            setLanguageState(savedLang);
        }
        setHasHydrated(true);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("language", lang);
    };

    const t = (key: string) => {
        // Fallback to key if not hydrated to avoid mismatch, 
        // or just return the translation if you prefer the "snap" 
        // to be fast. Professionals often prefer the fallback.
        return translations[key]?.[language] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            <div className={cn("transition-opacity duration-300", hasHydrated ? "opacity-100" : "opacity-0")}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
