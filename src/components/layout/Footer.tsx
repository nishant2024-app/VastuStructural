import Link from "next/link";
import { Hexagon, Mail, Phone, MapPin, Instagram, Twitter, Linkedin, ArrowRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-card border-t border-border pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                                <Hexagon size={24} className="text-background" />
                            </div>
                            <div>
                                <span className="text-xl font-black text-foreground">
                                    VASTU<span className="text-primary">STRUCTURAL</span>
                                </span>
                            </div>
                        </Link>
                        <p className="text-foreground/50 text-sm leading-relaxed">
                            P M and Associates: Engineering the Future with Ancient Wisdom. Trusted by 500+ families across Maharashtra.
                        </p>
                        <div className="flex gap-3">
                            {[Instagram, Twitter, Linkedin].map((Icon, idx) => (
                                <Link
                                    key={idx}
                                    href="#"
                                    className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-foreground/50 hover:text-primary hover:border-primary transition-colors"
                                >
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-foreground font-black mb-6">Services</h4>
                        <ul className="space-y-3 text-sm">
                            {["2D Floor Plans", "3D Elevations", "Vastu Analysis", "Interior Design", "Structural Plans"].map((item, idx) => (
                                <li key={idx}>
                                    <Link href="/services" className="text-foreground/50 hover:text-primary transition-colors flex items-center gap-2">
                                        <ArrowRight size={12} />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-foreground font-black mb-6">Company</h4>
                        <ul className="space-y-3 text-sm">
                            {[
                                { name: "About Us", href: "/about" },
                                { name: "Reviews", href: "/reviews" },
                                { name: "Client Login", href: "/client-portal/login" },
                                { name: "Contractor Login", href: "/contractor-portal/login" },
                                { name: "Become a Partner", href: "/partners" },
                                { name: "Privacy Policy", href: "/privacy" },
                                { name: "Terms of Service", href: "/terms" },
                            ].map((item, idx) => (


                                <li key={idx}>
                                    <Link href={item.href} className="text-foreground/50 hover:text-primary transition-colors flex items-center gap-2">
                                        <ArrowRight size={12} />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-foreground font-black mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-center gap-3 text-foreground/50">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Phone size={16} className="text-primary" />
                                </div>
                                <a href="tel:+919067969756" className="hover:text-primary transition-colors">
                                    +91 9067969756
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-foreground/50">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Mail size={16} className="text-primary" />
                                </div>
                                <a href="mailto:contact@vastustructural.com" className="hover:text-primary transition-colors">
                                    contact@vastustructural.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-foreground/50">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <MapPin size={16} className="text-primary" />
                                </div>
                                <span>Mangrulpir, Washim District, Maharashtra 444403</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-foreground/40">
                    <p>© {new Date().getFullYear()} VastuStructural. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                        <Link href="/admin/login" className="hover:text-primary transition-colors">Admin</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
