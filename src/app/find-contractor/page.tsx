"use client";

import { useState, useMemo } from "react";
import { Search, MapPin, Star, Phone, Mail, Building2, Award, Filter, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Sample contractor data (would come from API in production)
const contractors = [
    {
        id: 1,
        name: "Rajendra Patil",
        company: "Patil Construction",
        village: "Mangrulpir",
        taluka: "Mangrulpir",
        district: "Washim",
        experience: "10+ years",
        specialization: ["Residential Construction", "Vastu Consultancy"],
        rating: 4.8,
        reviews: 24,
        projectsCompleted: 45,
        verified: true,
    },
    {
        id: 2,
        name: "Suresh Deshmukh",
        company: "Deshmukh Builders",
        village: "Washim",
        taluka: "Washim",
        district: "Washim",
        experience: "5-10 years",
        specialization: ["Commercial Construction", "Civil Engineering"],
        rating: 4.6,
        reviews: 18,
        projectsCompleted: 32,
        verified: true,
    },
    {
        id: 3,
        name: "Amit Kulkarni",
        company: "AK Constructions",
        village: "Akola",
        taluka: "Akola",
        district: "Akola",
        experience: "3-5 years",
        specialization: ["Residential Construction", "Interior Design"],
        rating: 4.5,
        reviews: 12,
        projectsCompleted: 18,
        verified: true,
    },
    {
        id: 4,
        name: "Vikram Jadhav",
        company: "Jadhav Associates",
        village: "Yavatmal",
        taluka: "Yavatmal",
        district: "Yavatmal",
        experience: "10+ years",
        specialization: ["Civil Engineering", "Project Management"],
        rating: 4.9,
        reviews: 35,
        projectsCompleted: 67,
        verified: true,
    },
    {
        id: 5,
        name: "Prashant Wankhede",
        company: null,
        village: "Buldhana",
        taluka: "Buldhana",
        district: "Buldhana",
        experience: "5-10 years",
        specialization: ["Electrical Work", "Plumbing"],
        rating: 4.4,
        reviews: 8,
        projectsCompleted: 22,
        verified: false,
    },
    {
        id: 6,
        name: "Manoj Gawande",
        company: "Gawande Constructions",
        village: "Nagpur",
        taluka: "Nagpur",
        district: "Nagpur",
        experience: "10+ years",
        specialization: ["Commercial Construction", "Architecture"],
        rating: 4.7,
        reviews: 42,
        projectsCompleted: 89,
        verified: true,
    },
];

const districts = ["All Districts", "Akola", "Buldhana", "Nagpur", "Washim", "Yavatmal"];
const specializations = [
    "All Specializations",
    "Residential Construction",
    "Commercial Construction",
    "Civil Engineering",
    "Interior Design",
    "Electrical Work",
    "Plumbing",
    "Architecture",
    "Vastu Consultancy",
];

export default function FindContractorPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
    const [selectedSpecialization, setSelectedSpecialization] = useState("All Specializations");

    const filteredContractors = useMemo(() => {
        return contractors.filter((contractor) => {
            const matchesSearch =
                searchQuery === "" ||
                contractor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                contractor.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
                contractor.company?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesDistrict =
                selectedDistrict === "All Districts" || contractor.district === selectedDistrict;

            const matchesSpecialization =
                selectedSpecialization === "All Specializations" ||
                contractor.specialization.includes(selectedSpecialization);

            return matchesSearch && matchesDistrict && matchesSpecialization;
        });
    }, [searchQuery, selectedDistrict, selectedSpecialization]);

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6">
                        <Users size={16} />
                        Trusted Partners
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                        <span className="text-foreground">Find a</span>{" "}
                        <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                            Local Contractor
                        </span>
                    </h1>
                    <p className="text-lg text-foreground/50 max-w-2xl mx-auto">
                        Connect with verified VastuStructural partners in your area.
                        Our contractors are trained to deliver Vastu-compliant construction.
                    </p>
                </div>

                {/* Search & Filters */}
                <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6 mb-8">
                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
                            <input
                                type="text"
                                placeholder="Search by name or village..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        {/* District Filter */}
                        <div className="relative">
                            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
                            <select
                                value={selectedDistrict}
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
                            >
                                {districts.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>

                        {/* Specialization Filter */}
                        <div className="relative">
                            <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
                            <select
                                value={selectedSpecialization}
                                onChange={(e) => setSelectedSpecialization(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
                            >
                                {specializations.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-foreground/50">
                        Showing <span className="font-bold text-foreground">{filteredContractors.length}</span> contractors
                    </p>
                </div>

                {/* Contractor Grid */}
                {filteredContractors.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {filteredContractors.map((contractor) => (
                            <div
                                key={contractor.id}
                                className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6 hover:border-primary/30 transition-all group"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Avatar */}
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-background text-xl font-black shrink-0">
                                        {contractor.name.split(" ").map((n) => n[0]).join("")}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-foreground truncate">{contractor.name}</h3>
                                            {contractor.verified && (
                                                <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                                                    <Award size={12} className="text-success" />
                                                </div>
                                            )}
                                        </div>
                                        {contractor.company && (
                                            <div className="flex items-center gap-1 text-xs text-foreground/40 mb-2">
                                                <Building2 size={12} />
                                                {contractor.company}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1 text-sm text-foreground/60">
                                            <MapPin size={14} className="text-primary" />
                                            {contractor.village}, {contractor.district}
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    <div className="text-right shrink-0">
                                        <div className="flex items-center gap-1 text-warning">
                                            <Star size={16} fill="currentColor" />
                                            <span className="font-bold">{contractor.rating}</span>
                                        </div>
                                        <div className="text-xs text-foreground/40">{contractor.reviews} reviews</div>
                                    </div>
                                </div>

                                {/* Specializations */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {contractor.specialization.map((spec) => (
                                        <span
                                            key={spec}
                                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                </div>

                                {/* Stats & CTA */}
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                                    <div className="text-sm text-foreground/50">
                                        <span className="font-bold text-foreground">{contractor.experience}</span> experience •{" "}
                                        <span className="font-bold text-foreground">{contractor.projectsCompleted}</span> projects
                                    </div>
                                    <Link
                                        href={`/contact?contractor=${contractor.id}`}
                                        className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full font-bold text-sm hover:bg-primary hover:text-background transition-all"
                                    >
                                        <Phone size={14} />
                                        Contact
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center mx-auto mb-4">
                            <Search size={24} className="text-foreground/30" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">No contractors found</h3>
                        <p className="text-foreground/50 mb-6">
                            Try adjusting your search or filters to find contractors.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedDistrict("All Districts");
                                setSelectedSpecialization("All Specializations");
                            }}
                            className="px-6 py-3 bg-primary text-background rounded-full font-bold"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Become a Partner CTA */}
                <div className="p-8 bg-gradient-to-br from-primary/10 via-card to-accent/10 rounded-3xl border border-primary/20 text-center">
                    <h3 className="text-xl font-black text-foreground mb-2">Are you a Contractor?</h3>
                    <p className="text-foreground/50 mb-6">
                        Join our partner network and get listed here. Earn commissions on referrals!
                    </p>
                    <Link
                        href="/partners/apply"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background rounded-full font-bold hover:bg-primary/90 transition-all"
                    >
                        <Users size={18} />
                        Become a Partner
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
