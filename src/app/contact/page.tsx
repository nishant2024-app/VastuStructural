"use client";

import { Mail, Phone, MapPin, MessageSquare, Send, ArrowRight } from "lucide-react";

export default function ContactPage() {
    const whatsappNumber = "919876543210";
    const whatsappMessage = "Hello VastuStructural, I'm interested in your architectural services.";

    return (
        <div className="pt-32 pb-20 px-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
                        <span className="text-foreground">Let's Build </span>
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Together</span>
                    </h1>
                    <p className="text-lg text-foreground/50 max-w-2xl mx-auto">
                        Have questions about a plot? Need a Vastu audit? We're here to help.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Cards */}
                    <div className="space-y-5">
                        {[
                            { icon: Phone, label: "Call Us", value: "+91 98765 43210", color: "from-primary to-yellow-500" },
                            { icon: Mail, label: "Email", value: "hello@vastustructural.com", color: "from-secondary to-pink-500" },
                            { icon: MapPin, label: "Visit", value: "123, Vastu Enclave, New Delhi", color: "from-accent to-cyan-400" },
                        ].map((item, idx) => {
                            const IconComponent = item.icon;
                            return (
                                <div key={idx} className="p-5 bg-card rounded-2xl border border-border flex items-center gap-4 hover:border-primary/30 transition-colors">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-background flex-shrink-0`}>
                                        <IconComponent size={20} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-foreground/40 uppercase tracking-wider">{item.label}</div>
                                        <div className="font-bold text-foreground">{item.value}</div>
                                    </div>
                                </div>
                            );
                        })}

                        <a
                            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white rounded-2xl font-black text-lg hover:opacity-90 transition-opacity"
                        >
                            <MessageSquare size={20} />
                            Chat on WhatsApp
                        </a>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-2 p-8 md:p-10 bg-card rounded-3xl border border-border relative overflow-hidden">
                        {/* Glow */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                        <form className="grid md:grid-cols-2 gap-5 relative z-10">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-primary ml-1">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    className="w-full px-5 py-4 rounded-xl bg-background border border-border focus:border-primary text-foreground font-medium outline-none transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-primary ml-1">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="+91 9876543210"
                                    className="w-full px-5 py-4 rounded-xl bg-background border border-border focus:border-primary text-foreground font-medium outline-none transition-colors"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold text-primary ml-1">Service Required</label>
                                <select className="w-full px-5 py-4 rounded-xl bg-background border border-border focus:border-primary text-foreground font-medium outline-none transition-colors appearance-none cursor-pointer">
                                    <option>2D Floor Plan</option>
                                    <option>3D Elevation</option>
                                    <option>Vastu Consultation</option>
                                    <option>Complete Architecture</option>
                                </select>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold text-primary ml-1">Message</label>
                                <textarea
                                    rows={4}
                                    placeholder="Tell us about your project..."
                                    className="w-full px-5 py-4 rounded-xl bg-background border border-border focus:border-primary text-foreground font-medium outline-none transition-colors resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="md:col-span-2 py-4 bg-gradient-to-r from-primary to-secondary text-background rounded-xl font-black text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
                            >
                                <Send size={18} />
                                Send Message
                                <ArrowRight size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
