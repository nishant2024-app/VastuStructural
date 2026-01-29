"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, MapPin, ExternalLink, Filter, Plus, Maximize2, X, Compass, Zap, Box, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

const categories = ["All", "Residential", "Interior", "Technical"];

const galleryItems = [
    {
        id: 1,
        title: "The Veridian Mansion",
        location: "Jaipur, RJ",
        category: "Residential",
        desc: "A sprawling 8,000 sq.ft. estate designed with sunlight-first principles and energy-flow mastery.",
        img: "/gallery/mansion.png",
        size: "large",
        stats: { area: "8k", vastu: "98%" }
    },
    {
        id: 2,
        title: "Zen Brahmasthan",
        location: "Pune, MH",
        category: "Technical",
        desc: "Optimized central court for perfect air circulation and energy balance.",
        img: "/gallery/courtyard.png",
        size: "medium",
        stats: { area: "3k", vastu: "100%" }
    },
    {
        id: 3,
        title: "Lumia Living",
        location: "Bhopal, MP",
        category: "Interior",
        desc: "Ultra-luxury interiors utilizing natural elements and Northeast light focus.",
        img: "/gallery/living.png",
        size: "small",
        stats: { area: "1.2k", vastu: "95%" }
    },
    {
        id: 4,
        title: "Eco-Vastu Retreat",
        location: "Mysore, KA",
        category: "Residential",
        desc: "Sustainable bamboo architecture integrated with ancient directional wisdom.",
        img: "/gallery/eco.png",
        size: "medium",
        stats: { area: "4k", vastu: "99%" }
    },
    {
        id: 5,
        title: "Energy Blueprint",
        location: "Technical Hub",
        category: "Technical",
        desc: "High-precision energy mapping and structural Vastu integration.",
        img: "/gallery/blueprint.png",
        size: "small",
        stats: { type: "3D", level: "Elite" }
    },
    {
        id: 6,
        title: "Prana Suite",
        location: "Surat, GJ",
        category: "Interior",
        desc: "Minimalist bedroom design for optimal recovery and peaceful sleep cycles.",
        img: "/gallery/bedroom.png",
        size: "medium",
        stats: { area: "600", vastu: "97%" }
    }
];

export default function ExperiencePage() {
    const [filter, setFilter] = useState("All");
    const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const filteredItems = filter === "All"
        ? galleryItems
        : galleryItems.filter(item => item.category === filter);

    useEffect(() => {
        if (gridRef.current) {
            gsap.fromTo(
                gridRef.current.children,
                { opacity: 0, y: 30, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                    overwrite: true
                }
            );
        }
    }, [filter]);

    return (
        <div className="min-h-screen bg-background pt-32 pb-20 px-6 overflow-hidden">
            {/* Background Aesthetics */}
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-widest mb-6">
                            <Sparkles size={12} />
                            Mastery in Design
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter leading-none mb-6">
                            Architectural<br />
                            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Experience</span>
                        </h1>
                        <p className="text-lg text-foreground/50 font-medium">
                            Step into the future of Vastu-compliant architecture. Our portfolio blends ancient energy science with modern minimalist aesthetics.
                        </p>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap items-center gap-2 p-1.5 bg-card/50 backdrop-blur-xl border border-border rounded-2xl">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={cn(
                                    "px-6 py-2.5 rounded-xl text-xs font-black transition-all",
                                    filter === cat
                                        ? "bg-primary text-background shadow-lg shadow-primary/20"
                                        : "hover:bg-foreground/5 text-foreground/40 hover:text-foreground"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bento Grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]"
                >
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className={cn(
                                "group relative rounded-[2.5rem] overflow-hidden border border-border cursor-pointer transition-all duration-500",
                                item.size === "large" && "md:col-span-2 md:row-span-2",
                                item.size === "medium" && "md:row-span-2",
                                "hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1"
                            )}
                        >
                            {/* Image Background */}
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />

                            {/* Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            {/* Corner Badge */}
                            <div className="absolute top-6 left-6 px-4 py-1.5 bg-background/20 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black text-white uppercase tracking-widest translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                {item.category}
                            </div>

                            <button className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <Maximize2 size={16} />
                            </button>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">
                                    <MapPin size={10} />
                                    {item.location}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
                                    {item.title}
                                </h3>

                                <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity delay-100 duration-500">
                                    {Object.entries(item.stats).map(([key, val]) => (
                                        <div key={key}>
                                            <div className="text-white font-black text-lg">{val}</div>
                                            <div className="text-[10px] text-white/40 uppercase font-black">{key}</div>
                                        </div>
                                    ))}
                                    <div className="ml-auto">
                                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white group/btn hover:bg-white hover:text-black transition-all">
                                            <ExternalLink size={18} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Premium Lightbox Modal */}
            {selectedItem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
                    <div
                        className="absolute inset-0 bg-black/95 backdrop-blur-xl animate-in fade-in duration-500"
                        onClick={() => setSelectedItem(null)}
                    />

                    <button
                        onClick={() => setSelectedItem(null)}
                        className="absolute top-8 right-8 z-[110] w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all"
                    >
                        <X size={24} />
                    </button>

                    <div className="relative z-[105] w-full max-w-6xl flex flex-col lg:flex-row bg-card border border-border rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500 h-full max-h-[85vh]">
                        {/* Image Plate */}
                        <div className="flex-1 relative overflow-hidden bg-black">
                            <img
                                src={selectedItem.img}
                                alt={selectedItem.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-8 left-8 p-4 bg-primary/20 backdrop-blur-xl border border-primary/30 rounded-2xl flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary text-background rounded-xl flex items-center justify-center">
                                    <Compass className="animate-spin-slow" size={24} />
                                </div>
                                <div>
                                    <div className="text-[10px] text-primary font-black uppercase tracking-widest">Efficiency</div>
                                    <div className="text-white font-black">Vastu Matrix: 100%</div>
                                </div>
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="w-full lg:w-[400px] p-10 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest mb-4">
                                    <MapPin size={12} />
                                    {selectedItem.location}
                                </div>
                                <h2 className="text-4xl font-black text-foreground mb-6 leading-tight">
                                    {selectedItem.title}
                                </h2>
                                <p className="text-foreground/50 leading-relaxed mb-8">
                                    {selectedItem.desc}
                                </p>

                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.3em]">Project Metrics</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        {Object.entries(selectedItem.stats).map(([key, val]) => (
                                            <div key={key} className="p-4 bg-background border border-border rounded-2xl">
                                                <div className="text-2xl font-black text-foreground">{val}</div>
                                                <div className="text-[10px] text-foreground/40 font-black uppercase">{key}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-5 bg-gradient-to-r from-primary to-secondary text-background rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:opacity-90 transition-opacity mt-8">
                                View Full Case Study
                                <ExternalLink size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
            `}</style>
        </div>
    );
}
