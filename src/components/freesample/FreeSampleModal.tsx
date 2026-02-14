"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import {
    X, ChevronRight, ChevronLeft, User, Phone, MapPin,
    Ruler, Compass, Home, Loader2, CheckCircle2, Gift,
    Download, Image as ImageIcon, FileText, RefreshCw
} from "lucide-react";

interface FreeSampleModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const directions = ["North", "South", "East", "West", "NE", "NW", "SE", "SW"];
const roomOptions = ["2 BHK", "3 BHK", "4 BHK", "5+ BHK", "Duplex", "Villa"];

interface PuterAIResponse {
    src?: string;
    url?: string;
    message?: {
        content: string;
    };
}

export default function FreeSampleModal({ isOpen, onClose }: FreeSampleModalProps) {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string>("");
    const [generatedText, setGeneratedText] = useState<string>("");
    const [error, setError] = useState("");
    const [mounted, setMounted] = useState(false);
    const [puterReady, setPuterReady] = useState(false);
    const [generationType, setGenerationType] = useState<"image" | "text">("image");

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        city: "",
        plotSize: "",
        direction: "",
        rooms: ""
    });

    // Mount check for portal
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Puter is now loaded globally via layout.tsx
    useEffect(() => {
        if (typeof window !== "undefined" && window.puter) {
            setPuterReady(true);
        }
    }, [isOpen]);

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    // Keyboard escape handler
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen && !isLoading) handleClose();
    }, [isOpen, isLoading]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setError("");
    };

    const validateStep1 = () => {
        if (!formData.name.trim()) return "Please enter your name";
        if (!formData.phone.trim() || formData.phone.length < 10) return "Enter valid 10-digit phone";
        if (!formData.city.trim()) return "Please enter your city";
        return null;
    };

    const validateStep2 = () => {
        if (!formData.plotSize.trim()) return "Please enter plot size";
        if (!formData.direction) return "Select plot direction";
        if (!formData.rooms) return "Select room configuration";
        return null;
    };

    const handleNext = async () => {
        if (step === 1) {
            const err = validateStep1();
            if (err) { setError(err); return; }
            setStep(2);
        } else if (step === 2) {
            const err = validateStep2();
            if (err) { setError(err); return; }
            await generateFloorPlan();
        }
    };

    const generateFloorPlan = async () => {
        setIsLoading(true);
        setError("");

        try {
            // Save lead first
            await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    aiStatus: "pending",
                    notes: `Generating ${generationType} via Puter.js`
                })
            }).catch(() => { });

            if (!window.puter) {
                throw new Error("AI service not ready");
            }

            if (generationType === "image") {
                await generateFloorPlanImage();
            } else {
                await generateFloorPlanText();
            }

            // Update lead status
            await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    aiStatus: "success",
                    notes: `${generationType === "image" ? "Image" : "Text"} generated successfully`
                })
            }).catch(() => { });

            setStep(3);

        } catch (err: unknown) {
            console.error("Detailed Generation error:", err);
            const error = err as Error | { error?: string; message?: string };

            // Format error message for human and lead notes
            let errorMsg = "Unknown AI Error";
            if (typeof error === 'string') {
                errorMsg = error;
            } else if (typeof error === 'object' && error !== null) {
                errorMsg = (error as any).error || error.message || JSON.stringify(error);
            }

            // Save lead for manual follow-up with detailed notes
            await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    aiStatus: "failed",
                    notes: `Generation failed: ${errorMsg}`
                })
            }).catch(() => { });

            // Show fallback
            setGeneratedText(`🙏 Thank you ${formData.name}!

Your Vastu floor plan request has been received:

📋 Plot: ${formData.plotSize} | ${formData.direction} facing
🏠 Configuration: ${formData.rooms}
📍 City: ${formData.city}

⏰ Our Vastu expert will call/WhatsApp you within 2-4 hours with your personalized floor plan.

📞 For immediate help: +91 98765 43210`);
            setStep(3);
        } finally {
            setIsLoading(false);
        }
    };

    const generateFloorPlanImage = async () => {
        // Explicitly check for values
        const roomVal = formData.rooms || "House Plan";
        const sizeVal = formData.plotSize || "Standard Plot";
        const dirVal = formData.direction || "East";

        const imagePrompt = `Professional 2D Floor Plan Blueprint: ${roomVal}, Plot ${sizeVal}, Facing ${dirVal}. Style: Clean technical CAD drawing, top-down view, white background, black lines, Vastu compliant architectural layout.`;

        console.log("Constructed Prompt:", imagePrompt);

        if (!window.puter?.ai?.txt2img) {
            throw new Error("Puter AI Image service is not available (check layout.tsx Script loading)");
        }

        try {
            // Puter.js v2 often prefers a single object or specific positional arguments
            // We'll try the object pattern as it's most robust for v2
            console.log("Attempting txt2img with prompt...");
            const image = await window.puter.ai.txt2img({
                prompt: imagePrompt,
                model: "gpt-image-1.5" // Use Puter's free/low-cost model
            }) as PuterAIResponse;

            console.log("Puter raw response:", image);

            if (image && image.src) {
                setGeneratedImage(image.src);
            } else if (typeof image === 'string') {
                setGeneratedImage(image);
            } else if (image && typeof image === 'object' && image.url) {
                setGeneratedImage(image.url);
            } else {
                console.error("Unhandlable image response:", image);
                throw new Error("Image generation failed: Response format not recognized");
            }
        } catch (error: any) {
            console.error("txt2img internal error:", error);
            // If it's the "The first argument must be of type string" error, 
            // try the positional argument style as a fallback
            if (error?.error?.includes("first argument") || error?.message?.includes("first argument")) {
                console.log("Falling back to positional arguments style...");
                const fallbackImage = await window.puter.ai.txt2img(imagePrompt, { model: "gpt-image-1.5" });
                if (fallbackImage && (fallbackImage as any).src) {
                    setGeneratedImage((fallbackImage as any).src);
                    return;
                }
            }
            throw error;
        }
    };

    const generateFloorPlanText = async () => {
        const textPrompt = `Act as VastuExpert AI, a senior Vastu Shastra architect with 20+ years of experience in traditional Indian architecture.

TASK: Create a detailed Vastu-compliant floor plan recommendation.

CLIENT REQUIREMENTS:
- Name: ${formData.name}
- Plot Size: ${formData.plotSize}
- Plot Facing: ${formData.direction} (main road on ${formData.direction} side)
- Configuration: ${formData.rooms}
- Location: ${formData.city}

VASTU PRINCIPLES TO FOLLOW:
1. Kitchen MUST be in South-East (Agneya - fire element)
2. Master Bedroom in South-West (Nairutya - stability)
3. Puja Room in North-East (Ishaan - sacred)
4. Living Room in North or East (positive energy)
5. Toilets in North-West or West (NEVER in North-East)
6. Entrance should be from ${formData.direction === "East" || formData.direction === "North" ? formData.direction + " (auspicious)" : "adjusted for Vastu compliance"}

PROVIDE:
1. 📐 ROOM LAYOUT TABLE
   - Room name, Zone, Direction, Suggested size (in feet)

2. 🧭 DETAILED PLACEMENTS
   - Specific direction for each room with reasoning

3. ✨ VASTU BENEFITS
   - Energy flow advantages of this layout

4. 💡 RECOMMENDATIONS
   - Colors, entrance tips, construction suggestions

Be specific with measurements. Use proper formatting.`;

        // Use default free model (gpt-5-nano) by passing no model option
        const response = await window.puter.ai.chat(textPrompt);

        let aiResponse = "";
        if (typeof response === "string") {
            aiResponse = response;
        } else if (response?.message?.content) {
            aiResponse = response.message.content;
        }

        if (aiResponse) {
            setGeneratedText(aiResponse);
        } else {
            throw new Error("Text generation failed");
        }
    };

    const handleClose = () => {
        if (isLoading) return;
        setStep(1);
        setFormData({ name: "", phone: "", city: "", plotSize: "", direction: "", rooms: "" });
        setGeneratedImage("");
        setGeneratedText("");
        setError("");
        onClose();
    };

    const downloadImage = () => {
        if (!generatedImage) return;
        const link = document.createElement("a");
        link.href = generatedImage;
        link.download = `vastu - floorplan - ${formData.name.replace(/\s+/g, "-")}.png`;
        link.click();
    };

    const regenerate = async () => {
        setGeneratedImage("");
        setGeneratedText("");
        await generateFloorPlan();
    };

    if (!isOpen || !mounted) return null;

    const modalContent = (
        <div
            className="fixed inset-0 flex items-center justify-center p-3 sm:p-4"
            style={{ zIndex: 99999 }}
            role="dialog"
            aria-modal="true"
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={handleClose} />

            {/* Modal */}
            <div className="relative w-full max-w-lg bg-card rounded-2xl border border-border shadow-2xl overflow-hidden animate-scale-in max-h-[92vh] flex flex-col">
                {/* Header */}
                <div className="relative px-5 py-4 bg-gradient-to-r from-primary to-secondary text-background flex-shrink-0">
                    <button
                        onClick={handleClose}
                        disabled={isLoading}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 flex items-center justify-center hover:bg-black/30 transition-colors disabled:opacity-50"
                    >
                        <X size={16} />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                            <Gift size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-black">Free Vastu Floor Plan</h2>
                            <p className="text-background/70 text-xs">
                                {puterReady ? "✓ AI Ready" : "Loading..."}
                            </p>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="flex items-center gap-1.5 mt-4">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center gap-1.5">
                                <div className={cn(
                                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-black",
                                    step >= s ? "bg-white text-primary" : "bg-white/20 text-white/60"
                                )}>
                                    {step > s ? <CheckCircle2 size={14} /> : s}
                                </div>
                                {s < 3 && <div className={cn("w-8 h-0.5 rounded-full", step > s ? "bg-white" : "bg-white/20")} />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 overflow-y-auto flex-1">
                    {step === 1 && (
                        <div className="space-y-4">
                            <div className="text-center mb-5">
                                <h3 className="text-base font-black text-foreground">Your Details</h3>
                                <p className="text-foreground/50 text-xs mt-0.5">We'll personalize your plan</p>
                            </div>

                            <div className="space-y-3">
                                <div className="relative">
                                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                                    <input
                                        type="text"
                                        placeholder="Your Full Name *"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        className="w-full pl-10 pr-3 py-3 bg-background border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors"
                                    />
                                </div>

                                <div className="relative">
                                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                                    <input
                                        type="tel"
                                        placeholder="Phone Number *"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                        className="w-full pl-10 pr-3 py-3 bg-background border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors"
                                    />
                                </div>

                                <div className="relative">
                                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                                    <input
                                        type="text"
                                        placeholder="Your City *"
                                        value={formData.city}
                                        onChange={(e) => handleInputChange("city", e.target.value)}
                                        className="w-full pl-10 pr-3 py-3 bg-background border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <div className="text-center mb-4">
                                <h3 className="text-base font-black text-foreground">Plot Details</h3>
                                <p className="text-foreground/50 text-xs mt-0.5">Help us design your perfect home</p>
                            </div>

                            <div className="space-y-4">
                                <div className="relative">
                                    <Ruler size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                                    <input
                                        type="text"
                                        placeholder="Plot Size (e.g., 30x40 ft, 1200 sqft)"
                                        value={formData.plotSize}
                                        onChange={(e) => handleInputChange("plotSize", e.target.value)}
                                        className="w-full pl-10 pr-3 py-3 bg-background border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-1.5 text-xs font-bold text-foreground/60 mb-2">
                                        <Compass size={12} className="text-primary" />
                                        Plot Facing Direction
                                    </label>
                                    <div className="grid grid-cols-4 gap-1.5">
                                        {directions.map((dir) => (
                                            <button
                                                key={dir}
                                                type="button"
                                                onClick={() => handleInputChange("direction", dir)}
                                                className={cn(
                                                    "py-2.5 rounded-lg text-xs font-bold transition-all",
                                                    formData.direction === dir
                                                        ? "bg-primary text-background"
                                                        : "bg-background border border-border hover:border-primary/50"
                                                )}
                                            >
                                                {dir}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="flex items-center gap-1.5 text-xs font-bold text-foreground/60 mb-2">
                                        <Home size={12} className="text-primary" />
                                        Room Configuration
                                    </label>
                                    <div className="grid grid-cols-3 gap-1.5">
                                        {roomOptions.map((room) => (
                                            <button
                                                key={room}
                                                type="button"
                                                onClick={() => handleInputChange("rooms", room)}
                                                className={cn(
                                                    "py-2.5 rounded-lg text-xs font-bold transition-all",
                                                    formData.rooms === room
                                                        ? "bg-primary text-background"
                                                        : "bg-background border border-border hover:border-primary/50"
                                                )}
                                            >
                                                {room}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Generation Type */}
                                <div>
                                    <label className="text-xs font-bold text-foreground/60 mb-2 block">
                                        Output Format
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setGenerationType("image")}
                                            className={cn(
                                                "p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all",
                                                generationType === "image"
                                                    ? "border-primary bg-primary/5"
                                                    : "border-border hover:border-primary/30"
                                            )}
                                        >
                                            <ImageIcon size={20} className={generationType === "image" ? "text-primary" : "text-foreground/50"} />
                                            <span className="text-xs font-bold">2D Floor Plan</span>
                                            <span className="text-[10px] text-foreground/50">AI Image</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setGenerationType("text")}
                                            className={cn(
                                                "p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all",
                                                generationType === "text"
                                                    ? "border-primary bg-primary/5"
                                                    : "border-border hover:border-primary/30"
                                            )}
                                        >
                                            <FileText size={20} className={generationType === "text" ? "text-primary" : "text-foreground/50"} />
                                            <span className="text-xs font-bold">Detailed Report</span>
                                            <span className="text-[10px] text-foreground/50">Text Guide</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <div className="text-center mb-4">
                                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
                                    <CheckCircle2 size={24} className="text-success" />
                                </div>
                                <h3 className="text-base font-black text-foreground">
                                    {generatedImage ? "Floor Plan Ready!" : "Report Ready!"}
                                </h3>
                                <p className="text-foreground/50 text-xs">For {formData.name} • {formData.plotSize}</p>
                            </div>

                            {/* Image Result */}
                            {generatedImage && (
                                <div className="space-y-3">
                                    <div className="bg-background border border-border rounded-xl overflow-hidden">
                                        <img
                                            src={generatedImage}
                                            alt="Generated Floor Plan"
                                            className="w-full h-auto"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={downloadImage}
                                            className="flex-1 py-3 bg-primary text-background rounded-lg font-bold text-sm flex items-center justify-center gap-2"
                                        >
                                            <Download size={16} />
                                            Download
                                        </button>
                                        <button
                                            onClick={regenerate}
                                            disabled={isLoading}
                                            className="px-4 py-3 bg-card border border-border rounded-lg font-bold text-sm flex items-center gap-2 hover:border-primary/50 disabled:opacity-50"
                                        >
                                            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Text Result */}
                            {generatedText && !generatedImage && (
                                <div className="bg-background border border-border rounded-xl p-4 max-h-[250px] overflow-y-auto">
                                    <div className="text-xs text-foreground/80 whitespace-pre-wrap leading-relaxed">
                                        {generatedText}
                                    </div>
                                </div>
                            )}

                            {/* CTA */}
                            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                    <Phone size={16} className="text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-foreground">Want professional CAD drawings?</p>
                                    <p className="text-[10px] text-foreground/60">Our team will call within 24 hours</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs font-medium">
                            {error}
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between px-5 py-4 border-t border-border bg-card flex-shrink-0">
                    {step > 1 && step < 3 ? (
                        <button
                            onClick={() => setStep(step - 1)}
                            disabled={isLoading}
                            className="flex items-center gap-1.5 px-4 py-2 text-foreground/60 text-sm font-bold hover:text-foreground disabled:opacity-50"
                        >
                            <ChevronLeft size={16} />
                            Back
                        </button>
                    ) : (
                        <div />
                    )}

                    {step < 3 ? (
                        <button
                            onClick={handleNext}
                            disabled={isLoading || (step === 2 && !puterReady)}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-background rounded-full text-sm font-black hover:opacity-90 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    {generationType === "image" ? "Creating Image..." : "Generating..."}
                                </>
                            ) : (
                                <>
                                    {step === 1 ? "Continue" : `Generate ${generationType === "image" ? "Floor Plan" : "Report"} `}
                                    <ChevronRight size={16} />
                                </>
                            )}
                        </button>
                    ) : (
                        <button
                            onClick={handleClose}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-background rounded-full text-sm font-black hover:opacity-90"
                        >
                            Done
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
