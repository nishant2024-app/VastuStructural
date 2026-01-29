"use client";

import { Award, ShieldCheck, Users, Hexagon, ArrowRight, Compass, Target, Eye, Sparkles, CheckCircle2, Building2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const stats = [
    { value: "500+", label: "Projects Delivered", icon: Building2 },
    { value: "15+", label: "Years Experience", icon: Award },
    { value: "98%", label: "Client Satisfaction", icon: CheckCircle2 },
    { value: "100%", label: "Vastu Compliant", icon: ShieldCheck },
];

const values = [
    { icon: Target, title: "Precision", desc: "Every line, every angle, calculated for optimal energy flow." },
    { icon: Eye, title: "Vision", desc: "Seeing beyond blueprints to create living spaces that inspire." },
    { icon: Compass, title: "Tradition", desc: "Rooted in 5,000 years of Vedic architectural science." },
];

const team = [
    { name: "Ar. Rahul Sharma", role: "Principal Architect", bio: "Ex-L&T, 12 years of luxury residential experience. Specializes in Vastu-modern fusion designs.", initials: "RS", accent: "from-primary to-secondary" },
    { name: "Smt. Kamala Devi", role: "Vastu Consultant", bio: "30+ years studying Vedic architecture. Recognized by IIST for research contributions.", initials: "KD", accent: "from-secondary to-accent" },
    { name: "Er. Vikram Singh", role: "Structural Engineer", bio: "IIT Delhi alumnus. Ensuring your home stands strong for generations.", initials: "VS", accent: "from-accent to-primary" },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background overflow-hidden">
            {/* Background Aesthetics */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-primary/5 to-transparent" />
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/5 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                                <Sparkles size={12} />
                                Est. 2009
                            </div>

                            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-[0.95]">
                                <span className="text-foreground block">Ancient Science.</span>
                                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent block">
                                    Modern Vision.
                                </span>
                            </h1>

                            <p className="text-lg text-foreground/50 leading-relaxed max-w-lg">
                                VastuStructural was founded to bring the profound wisdom of Vastu Shastra
                                to modern Indian home-buyers. We believe a home is a living entity
                                that should vibrate with positive energy and stand on unshakeable foundations.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/contact"
                                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-background font-black rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                                >
                                    Get In Touch
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="/experience"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-card border border-border text-foreground font-bold rounded-full hover:border-primary/50 transition-colors"
                                >
                                    View Our Work
                                </Link>
                            </div>
                        </div>

                        {/* Visual Card */}
                        <div className="relative group">
                            <div className="aspect-[4/5] bg-card rounded-[3rem] p-10 relative overflow-hidden border border-border shadow-2xl">
                                {/* Background Pattern */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                                    <Hexagon size={400} strokeWidth={0.3} className="text-primary" />
                                </div>

                                {/* Floating Cards */}
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div className="p-6 bg-background/80 backdrop-blur-xl rounded-2xl border border-border shadow-xl">
                                        <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Our Philosophy</div>
                                        <p className="text-lg font-bold text-foreground leading-snug">
                                            "Architecture is the art of space, Vastu is the science of life within it."
                                        </p>
                                    </div>

                                    <div className="p-6 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-xl">
                                        <div className="text-[10px] font-black text-background/70 uppercase tracking-widest mb-2">Technical Excellence</div>
                                        <p className="text-base text-background font-medium">
                                            Building codes and structural integrity are as important as energy flow. We deliver both.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { icon: Award, title: "15+ Years", desc: "Architectural excellence" },
                                            { icon: ShieldCheck, title: "100% Vastu", desc: "Compliant guaranteed" },
                                        ].map((item, idx) => {
                                            const IconComponent = item.icon;
                                            return (
                                                <div key={idx} className="flex gap-3 p-4 bg-background/50 backdrop-blur rounded-xl border border-border/50">
                                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                        <IconComponent className="text-primary" size={18} />
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-foreground text-sm">{item.title}</div>
                                                        <div className="text-[10px] text-foreground/40">{item.desc}</div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Glow Effects */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/30 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/40 transition-colors duration-700" />
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
                        {stats.map((stat, idx) => {
                            const IconComponent = stat.icon;
                            return (
                                <div key={idx} className="group p-6 bg-card rounded-[2rem] border border-border text-center hover:border-primary/30 transition-all duration-300">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                                        <IconComponent className="text-primary" size={24} />
                                    </div>
                                    <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">{stat.value}</div>
                                    <div className="text-xs font-bold text-foreground/40 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Values Section */}
                    <div className="mb-32">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mb-6">
                                Core Values
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
                                <span className="text-foreground">What Drives </span>
                                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Our Work</span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {values.map((value, idx) => {
                                const IconComponent = value.icon;
                                return (
                                    <div key={idx} className="group relative p-8 bg-card rounded-[2.5rem] border border-border overflow-hidden hover:border-primary/30 transition-all duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="relative z-10">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                                <IconComponent className="text-primary" size={28} />
                                            </div>
                                            <h3 className="text-2xl font-black text-foreground mb-3">{value.title}</h3>
                                            <p className="text-foreground/50 leading-relaxed">{value.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Team Section */}
                    <div>
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-black uppercase tracking-widest mb-6">
                                <Users size={12} />
                                Meet the Experts
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
                                <span className="text-foreground">The Team Behind </span>
                                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Your Dream</span>
                            </h2>
                            <p className="text-foreground/50 max-w-xl mx-auto">
                                Architects, Vastu experts, and engineers working together to create spaces that inspire.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {team.map((member, idx) => (
                                <div
                                    key={idx}
                                    className="group relative p-10 bg-card rounded-[3rem] border border-border text-center overflow-hidden hover:border-primary/30 transition-all duration-500"
                                >
                                    {/* Background Glow */}
                                    <div className={cn(
                                        "absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700",
                                        `bg-gradient-to-br ${member.accent}`
                                    )} />

                                    <div className="relative z-10">
                                        <div className={cn(
                                            "w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-background text-2xl font-black group-hover:scale-110 transition-transform duration-500 shadow-xl",
                                            `bg-gradient-to-br ${member.accent}`
                                        )}>
                                            {member.initials}
                                        </div>
                                        <h4 className="text-xl font-black text-foreground mb-1">{member.name}</h4>
                                        <p className="text-primary text-xs font-black uppercase tracking-widest mb-4">{member.role}</p>
                                        <p className="text-sm text-foreground/50 leading-relaxed">{member.bio}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
